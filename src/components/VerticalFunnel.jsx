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

        const margin = 120;
        const chartWidth = dimensions.width - margin;
        const chartHeight = dimensions.height - margin;

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + 60 + "," + 60 + ")");

        const lineFunction = d3.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })

        const barWidth = (chartWidth - 50) / sortedData.length;
        let diff = 0, prevD = 1;

        const drawTrapezoid = function (d, i) {
            let data;
            if (i === 0) {
                data = [
                    { x: barWidth * i + 1, y: prevD * i },
                    { x: barWidth * (i + 1) - 1, y: prevD * i },
                    { x: barWidth * (i + 1) - 1, y: chartHeight - prevD * i },
                    { x: barWidth * i + 1, y: chartHeight - prevD * i },
                ]
            }
            else if (i === sortedData.length - 1) {
                data = [
                    { x: barWidth * i + 1, y: prevD * i },
                    { x: barWidth * (i + 1) - 1 + 10, y: prevD * i },
                    { x: barWidth * (i + 1) - 1 + 10, y: chartHeight - prevD * i },
                    { x: barWidth * i + 1, y: chartHeight - prevD * i },
                ]
            }
            else {
                diff = 25;
                data = [
                    { x: barWidth * i + 1, y: prevD * i },
                    { x: barWidth * (i + 1) - 1, y: diff * (i + 1) },
                    { x: barWidth * (i + 1) - 1, y: chartHeight - diff * (i + 1) },
                    { x: barWidth * i + 1, y: chartHeight - prevD * i },
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
                if (100 - d.percentage) {
                    text += "(-" + (100 - d.percentage) + "%)"
                }
                return text;
            })
            .attr("transform", (d, i) => {
                if (100 - d.percentage)
                    return `translate(${(barWidth / 2 - 45) + (barWidth * i)},${chartHeight / 2})`

                return `translate(${(barWidth / 2 - 20) + (barWidth * i)},${chartHeight / 2})`
            })
            .attr("font-weight", 700)
            .attr("font-size", 20)

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
                    len = 47
                else if (text.length <= 15)
                    len = 30
                else
                    len = 17

                return `translate(${(len) + (barWidth * i)},${20 + chartHeight / 2})`
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
