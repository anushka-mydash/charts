import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";

export default function ProgressiveDonutChart({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();
    const myData = useRef();
    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        if (!dimensions) {
            return;
        }

        const chartWidth = dimensions.width;
        const chartHeight = dimensions.height;

        const svg = d3.select(selectedSvg.current);

        const g = svg
            .append("g")
            .attr(
                "transform",
                `translate(${chartWidth / 2}, ${chartHeight / 2})`
            );

        let values = data.map(d => d.value)
        const scale = d3
            .scaleLinear()
            .domain([d3.min(values), d3.max(values)])
            .range([0.1, 0.8])

        myData.current = data.map((d) => ({
            ...d,
            origVal: d.value,
            value: scale(d.value)
        }))

        const arc = d3
            .arc()
            .innerRadius(function (d, idx) {
                return 50 + 20 * idx;
            })
            .outerRadius(function (d, idx) {
                return 70 + 20 * idx;
            })
            .startAngle(function (d) {
                return 0;
            })
            .endAngle(function (d) {
                return d.value * 2 * Math.PI;
            })
            .padAngle(0.02)
            .padRadius(100)
            .cornerRadius(4);

        g.selectAll("path")
            .data(myData.current, (d) => d.scale)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => {
                return d.color
            })
            .attr("stroke", "#F9F9F9")

        g
            .selectAll("text")
            .remove();

        g
            .selectAll("text")
            .data(myData.current)
            .enter()
            .append("text")
            .text((d, i) => {
                return myData.current[myData.current.length - 1 - i].label
            })
            // .attr("text-anchor", "end")
            .attr("direction", "rtl")
            .attr("fill", "#000")
            .style("font-size", "13px")
            .attr("transform", (d, i) => "translate(-10," + (-115 + 20 * i) + ")");

        for (let i = 0; i < myData.current.length; i++) {
            const arcForText = d3
                .arc()
                .innerRadius(55 + 20 * i)
                .outerRadius(55 + 20 * i)
                .startAngle(0)
                .endAngle(myData.current[i].value * 2 * Math.PI)

            g
                .append("path")
                .attr("id", "pathText" + i)
                .attr("d", arcForText)
                .attr("transform", "translate(0,0)")
                .attr("fill-opacity", "0")

            g
                .append("text")
                .attr("x", "4%")
                .append("textPath")
                .text(myData.current[i].origVal)
                .style("font-size", "13px")
                .attr("xlink:href", () => "#pathText" + i)
                .attr("fill", "#000")

        }
    }, [data, dimensions])

    return (
        <div ref={svgWrapper} style={{ minWidth: "300px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "300px", flex: 0.4 }}
            >
            </svg>
        </div>
    );
}
