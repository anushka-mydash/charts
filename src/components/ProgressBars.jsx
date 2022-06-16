import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";

export default function ProgressBars({ data, colors }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);
    colors = [
        { value: "#FC4F4F", label: "Low" },
        { value: "#FFC54D", label: "Middle" },
        { value: "#6BCB77", label: "Good" },
        { value: "#4D96FF", label: "High" },
    ]
    const highData = data.filter((d) => d > 100)

    useEffect(() => {
        if (!dimensions) {
            return;
        }

        const margin = 120;
        const chartWidth = dimensions.width - margin;
        const barWidth = chartWidth - margin;

        const svg = d3.select(selectedSvg.current);
        const g = svg
            .append("g")
            .attr("transform", "translate(" + 0 + ",0)")

        g
            .selectAll(".progressBg")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "progressBg")
            .attr("x", margin)
            .attr("y", (d, i) => i * 60 + margin)
            .attr("width", barWidth)
            .attr("height", 25)
            .attr("rx", "10")
            .attr("fill", "#F1EEE9")

        g
            .selectAll(".progressBar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "progressBar")
            .attr("x", margin)
            .attr("y", (d, i) => i * 60 + margin)
            .attr("width", (d) => d > 100 ? barWidth : barWidth * (d / 100))
            .attr("height", 25)
            .attr("rx", "13")
            .attr("fill", (d) => {
                if (d > 0 && d <= 25) return colors[0].value
                else if (d > 26 && d <= 80) return colors[1].value
                if (d > 80 && d <= 100) return colors[2].value
                else return colors[3].value
            })

        g
            .selectAll(".progressText")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "progressText")
            .attr("x", (d) => {
                const length = d > 100 ? margin - 20 + (barWidth) / 2 : margin - 20 + (barWidth * (d / 100)) / 2;
                return length > 135 && d > 10 ? length : d > 9 ? 132 : 165;
            }
            )
            .attr("y", (d, i) => i * 60 + margin + 18)
            .attr("fill", (d) => d < 10 ? "red" : "white")
            .attr("style", "font-weight:500")
            .text((d) => Math.floor(d) + "%")

        g
            .selectAll(".highValue")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "highValue")
            .attr("x1", (d) => {
                return d > 100 ? (margin + barWidth) - ((barWidth * ((d - 100) / 100))) : 0
            })
            .attr("y1", (d, i) => {
                if (d > 100)
                    return d > 100 ? i * 60 + margin + 25 : 0
            })
            .attr("x2", (d) => {
                return d > 100 ? (margin + barWidth) - ((barWidth * ((d - 100) / 100))) : 0
            })
            .attr("y2", (d, i) => {
                return d > 100 ? i * 60 + margin : 0
            })
            .attr("stroke", "#F1EEE9")



    }, [dimensions, data, colors, highData])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "350px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
