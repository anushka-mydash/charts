import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
// import classes from "../styles.module.scss"

export default function SmallPieChart({ data, selectedSvg, svgWrapper }) {


    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        if (!dimensions) {
            return;
        }
        //  eslint-disable-next-line
        data = data.filter((d) => d.label !== "Not Due");

        const margin = {
            top: 600,
            left: 200
        };
        const chartWidth = dimensions.width + margin.top;
        const chartHeight = dimensions.height - margin.left;
        const radius = 150

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + chartWidth / 2 + "," + chartHeight / 2 + ")")

        const pie = d3.pie().value((d) => d.percentage);

        const path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 80);

        const arc = g.selectAll(".arc")
            .data(pie(data))
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
                    "translate(" + x + "," + (y + 10) + ")" :
                    "translate(" + (x - 50) + "," + y + ")"
            })
            .text(function (d) { return d.data.percentage + "%"; });

    }, [dimensions, data])

    return (
        <></>)
}