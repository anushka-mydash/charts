import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import { degToRad } from "../utils/utils";
// import classes from "../styles.module.scss"

export default function PieChart({ data, selectedSvg, svgWrapper }) {

    const dimensions = useResizeObserver(svgWrapper);
    useEffect(() => {
        if (!dimensions) {
            return;
        }
        const margin = {
            top: 20,
            left: 200
        };
        const chartWidth = dimensions.width - margin.top;
        const chartHeight = dimensions.height - margin.left;
        const radius = 200

        let chartData1 = data.filter((d) => d.label === "Not Due")
        chartData1 = [
            ...chartData1,
            { label: "Others", percentage: 100 - chartData1[0].percentage, color: "orange" }
        ]

        // chartData1[0] should be smaller always
        if (chartData1[0].label === "Not Due") {
            let temp = chartData1[0]
            chartData1[0] = chartData1[1]
            chartData1[1] = temp
        }
        console.log(chartData1)

        let angle = chartData1.map((d) => (d.percentage * 360) / 100)
        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + (chartWidth / 4) + "," + chartHeight / 2 + ")")



        const arc0 = d3
            .arc()
            .innerRadius(0)
            .outerRadius(radius)
            .startAngle(function (d) {
                return degToRad(90 - angle[0] / 2);
            })
            .endAngle(function (d) {
                return degToRad(90 - angle[0] / 2 + angle[0]);
            })

        const arc1 = d3
            .arc()
            .innerRadius(0)
            .outerRadius(radius)
            .startAngle(function (d) {
                return degToRad(90 - angle[0] / 2 + angle[0]);
            })
            .endAngle(function (d) {
                return degToRad(360 + 90 - angle[0] / 2)
            })

        const p0 = g
            .selectAll("path0")
            .data([chartData1[0]])
            .enter()

        p0.append("path")
            .attr("id", (d, i) => "pathSmall0")
            .attr("d", arc0)
            .attr("transform", "translate(0,0)")
            .attr("fill", (d) => d.color)


        let arr = []
        arr.push(d3.select("#pathSmall0")?.attr("d"))

        const p1 = g
            .selectAll("path1")
            .data([chartData1[1]])
            .enter()

        p1.append("path")
            .attr("id", (d, i) => "pathSmall1")
            .attr("d", arc1)
            .attr("transform", "translate(0,0)")
            .attr("fill", (d) => d.color)

        arr.push(d3.select("#pathSmall1")?.attr("d"))

        arr = arr.map((d) => {
            return d.split("A")[0]
        })

        p0
            .append("text")
            .attr("x", radius / 2)
            .attr("y", 0)
            .attr("style", "fill:white; font-weight:500; font-size:20px")
            .text(function (d) {
                return d.percentage + "%";
            });

        p1
            .append("text")
            .attr("x", -radius / 2)
            .attr("y", 0)
            .attr("style", "fill:white; font-weight:500; font-size:20px")
            .text(function (d) {
                return d.percentage + "%";
            });

        g
            .append("path")
            .attr("d", arr[0] + "l550, 60")
            .attr("fill", "none")
            .attr("stroke", "#000")
        g
            .append("path")
            .attr("d", arr[1] + " l550, -60")
            .attr("fill", "none")
            .attr("stroke", "#000")

    }, [dimensions, data, selectedSvg])

    return (
        <></>)
}