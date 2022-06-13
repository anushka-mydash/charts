import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import { hexToRgb, createGradient } from "../utils/utils"

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
        const innerRadius = 50, outerRadius = 70, spacing = 30, thickness = outerRadius - innerRadius;

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
            .domain([0, d3.max(values)])
            .range([0.1, 0.9])

        myData.current = data.map((d) => ({
            ...d,
            origVal: d.value,
            value: scale(d.value)
        }))

        const arc = d3
            .arc()
            .innerRadius(function (d, idx) {
                return innerRadius + spacing * idx;
            })
            .outerRadius(function (d, idx) {
                return outerRadius + spacing * idx;
            })
            .startAngle(function (d) {
                return 0;
            })
            .endAngle(function (d) {
                return d.value * 2 * Math.PI;
            });

        g
            .selectAll("rect")
            .data(myData.current)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", (d, i) => -1 * (outerRadius + (spacing) * i))
            .attr("width", 200)
            .attr("height", thickness)
            .attr("style", "z-index:-1")
            .attr("fill", (d, i) => {
                const { linearGradientDef } = createGradient(svg, i)
                linearGradientDef
                    .selectAll("stop")
                    .style("stop-color", d.color)
                return `url(#gradient${i + 1})`;
            })

        g
            .selectAll("path")
            .data(myData.current, (d) => d.scale)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => {
                return d.color
            })
            .attr("style", "z-index:10");

        for (let i = 0; i < myData.current.length; i++) {

            const restArc = d3
                .arc()
                .innerRadius(innerRadius + spacing * i)
                .outerRadius(outerRadius + spacing * i)
                .startAngle((myData.current[i].value - 1) * 2 * Math.PI)
                .endAngle(2 * Math.PI);

            g
                .append("path")
                .attr("d", restArc)
                .attr("fill",
                    `rgba(
                        ${hexToRgb(myData.current[i].color).r},
                        ${hexToRgb(myData.current[i].color).g},
                        ${hexToRgb(myData.current[i].color).b},
                        0.25
                        )`
                )
                .attr("stroke", "#F9F9F9")
        }
        g
            .selectAll("text")
            .remove();

        g
            .selectAll("text")
            .data(myData.current)
            .enter()
            .append("text")
            .text((d, i) => {
                return myData.current[i].origVal
            })
            .attr("fill", "#000")
            .style("font-size", "14px")
            .attr("transform", (d, i) => "translate(210," + -1 * (outerRadius + (spacing * i) - 15) + ")");

        g
            .selectAll("circle")
            .data(myData.current)
            .enter()
            .append("circle")
            .attr("r", 9)
            .attr("fill", (d) => d.color)
            .attr("stroke", (d) => d.color)
            .attr("transform", (d, i) => "translate(260," + -1 * (outerRadius + (spacing * i) - 12) + ")");

        for (let i = 0; i < myData.current.length; i++) {
            g
                .append("text")
                .text(myData.current[i].label)
                .style("font-size", "14px")
                .attr("transform", "translate(280," + -1 * (outerRadius + (spacing * i) - 15) + ")");
        }

    }, [data, dimensions])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>
    );
}
