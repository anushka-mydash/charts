import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";

export default function OtherPie({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        if (!dimensions) {
            return;
        }

        const margin = 0;
        const chartWidth = dimensions.width - margin;
        const chartHeight = dimensions.height - margin;
        const radius = 200

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + (chartWidth / 4 + 100) + "," + chartHeight / 2 + ")")

        g
            .append("line")
            .attr("x1", 60)
            .attr("y1", -(chartHeight - radius) / 1.7)
            .attr("x2", 450)
            .attr("y2", -chartHeight / 3.05)
            .attr("fill", "none")
            .attr("stroke", "#000")
        g
            .append("line")
            .attr("x1", 60)
            .attr("y1", (chartHeight - radius) / 1.7)
            .attr("x2", 450)
            .attr("y2", chartHeight / 3.25)
            .attr("fill", "none")
            .attr("stroke", "#000")

        const pie = d3.pie().value((d) => d.value)

        const path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const arc = g.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", (d) => d.data.color);

    }, [dimensions, data])

    return (
        <div ref={svgWrapper} style={{ minWidth: "45vw", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}