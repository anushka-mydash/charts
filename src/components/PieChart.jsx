import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
// import classes from "../styles.module.scss"

export default function PieChart({ data }) {
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

        let chartData1 = data.filter((d) => d.label === "Not Due")
        chartData1 = [
            ...chartData1,
            { label: "Others", percentage: 100 - chartData1[0].percentage, color: "orange" }
        ]

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + (chartWidth - radius) + "," + chartHeight / 2 + ")")

        g
            .append("line")
            .attr("x1", -60)
            .attr("y1", (chartHeight - radius) / 1.7)
            .attr("x2", -350)
            .attr("y2", chartHeight / 4)
            .attr("fill", "none")
            .attr("stroke", "#000")
        g
            .append("line")
            .attr("x1", -60)
            .attr("y1", -(chartHeight - radius) / 1.7)
            .attr("x2", -350)
            .attr("y2", -chartHeight / 4)
            .attr("fill", "none")
            .attr("stroke", "#000")

        const pie = d3.pie().value((d) => d.percentage);

        const path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 80);

        const arc = g.selectAll(".arc")
            .data(pie(chartData1))
            .enter()
            .append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", (d) => d.data.color);

        arc.append("text")
            .attr("style", "fill:white; font-weight:500; font-size:20px")
            .attr("transform", function (d) {
                const [x, y] = label.centroid(d)
                return x < 0 ?
                    "translate(" + (x + 80) + "," + y + ") scale(-1,-1)" :
                    "translate(" + (x - 50) + "," + y + ") scale(-1,-1)"
            })
            .text(function (d) { return d.data.percentage + "%"; });


    }, [dimensions, data])

    return (
        <div ref={svgWrapper} style={{ minWidth: "45vw", minHeight: "300px", transform: "rotate(180deg)" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}