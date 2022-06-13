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
        const radius = Math.min(chartWidth, chartHeight) / 2;

        let chartData1 = data.filter((d) => d.label === "Not Due")
        chartData1 = [
            ...chartData1,
            { label: "Others", percentage: 100 - chartData1[0].percentage, color: "orange" }
        ]

        const innerRadius = 50, outerRadius = 70, spacing = 30, thickness = outerRadius - innerRadius;
        const svg = d3.select(selectedSvg.current);

        svg.attr("transform", " rotate(180deg)")

        const g = svg.append("g")
            .attr("transform", "translate(" + chartWidth / 2 + "," + chartHeight / 2 + ")")

        // const pie = d3.pie().value((d) => d.percentage);

        // const path = d3.arc()
        //     .outerRadius(radius - 10)
        //     .innerRadius(0);

        // const label = d3.arc()
        //     .outerRadius(radius)
        //     .innerRadius(radius - 80);

        // var arc = g.selectAll(".arc")
        //     .data(pie(chartData1))
        //     .enter()
        //     .append("g")
        //     .attr("class", "arc");
        // console.log(arc, pie)
        // arc.append("path")
        //     .attr("d", path)
        //     .attr("fill", (d) => d.data.color);

        // arc.append("text")
        //     .attr("style", "fill:white; font-weight:500; font-size:20px")
        //     .attr("transform", function (d) {
        //         const [x, y] = label.centroid(d)
        //         console.log(x, y)
        //         return x < 0 ?
        //             "translate(" + (x + 80) + "," + y + ") scale(-1,-1)" :
        //             "translate(" + (x - 50) + "," + y + ") scale(-1,-1)"
        //     })
        //     .text(function (d) { return d.data.percentage + "%"; });

        // const g = svg
        //     .append("g")
        //     .attr(
        //         "transform",
        //         `translate(${chartWidth / 2}, ${chartHeight / 2})`
        //     );

        const arc = d3
            .arc()
            .innerRadius(function (d) {
                return innerRadius;
            })
            .outerRadius(function (d) {
                return outerRadius;
            })
            .startAngle(function (d, i) {
                return i * 1;
            })
            .endAngle(function (d) {
                return (d.percentage / 100) * 4 * Math.PI;
            });


        const el = g
            .selectAll("path")
            .data(chartData1, (d) => d.percentage)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => {
                return d.color
            })
        console.log(el)

    }, [dimensions, data])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "300px", transform: "rotate(180deg)" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}