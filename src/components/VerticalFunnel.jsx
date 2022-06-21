import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
// import classes from "../styles.module.scss"

export default function VerticalFunnel({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        const colors = [
            "#3AB0FF",
            "#6CC4A1",
            "#D4D925",
            "#FBCB0A",
            "#F77E21",
            "#6A67CE",
        ]

        if (!dimensions) {
            return;
        }
        let sortedData = data.sort((a, b) => b.value - a.value)

        let firstData = sortedData[0].value;

        sortedData = sortedData.map((d, i) => {
            return {
                ...d,
                percentage: i === 0 ? 100 : (d.value * 100) / firstData
            }
        })

        const margin = 100;
        const chartWidth = dimensions.width - margin;
        const chartHeight = dimensions.height - margin;

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + margin / 2 + "," + margin / 2 + ")");

        const lineFunction = d3.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })

        const barWidth = (chartHeight) / sortedData.length;
        let diff = barWidth, prevD = 1;

        const drawTrapezoid = function (d, i) {
            let data;
            if (i === 0 || i === sortedData.length - 1) {
                prevD = diff - 10
                data = [
                    { x: diff * i, y: diff * i + 1 },
                    { x: chartWidth - diff * i, y: diff * i + 1 },
                    { x: chartWidth - prevD * (i + 1), y: diff * (i + 1) - 1 },
                    { x: prevD * (i + 1), y: diff * (i + 1) - 1 },
                ]
            }
            else {
                data = [
                    { x: prevD * i, y: diff * i + 1 },
                    { x: chartWidth - prevD * i, y: diff * i + 1 },
                    { x: chartWidth - diff * (i + 1), y: diff * (i + 1) - 1 },
                    { x: diff * (i + 1), y: diff * (i + 1) - 1 },
                ]
                prevD = diff
            }
            return lineFunction(data);
        }

        g.selectAll(".funnels")
            .data(sortedData)
            .enter()
            .append("path")
            .attr("d", drawTrapezoid)
            .attr("fill", (d, i) => colors[i])

        g.selectAll(".funnelText")
            .data(sortedData)
            .enter()
            .append("text")
            .attr("class", "funnelText")
            .attr("fill", "white")
            .text(d => {
                let text = d.percentage + "%"
                return text;
            })
            .attr("transform", (d, i) => {
                return `translate(${(chartWidth / 2 - 17)},${barWidth + barWidth * i - 30})`
            })
            .attr("font-weight", 700)
            .attr("font-size", 18)

        g.selectAll(".funnelTextDesc")
            .data(sortedData)
            .enter()
            .append("text")
            .attr("class", "funnelTextDesc")
            .attr("fill", "white")
            .text(d => d.label + " : " + d.value)
            .attr("transform", (d, i) => {
                let text = d.label + " : " + d.value
                let len;

                if (text.length < 10)
                    len = 18
                else if (text.length <= 15)
                    len = 38
                else
                    len = 43

                return `translate(${(chartWidth / 2 - len)},${barWidth + barWidth * i - 12})`
            })
            .attr("font-size", 14)
    }, [dimensions, data])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "500px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
