import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import { degToRad } from "../utils/utils";

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

        const margin = 100;
        const innerRadius = 50, outerRadius = 70;

        const svg = d3.select(selectedSvg.current);
        const g = svg
            .append("g")
            .attr("transform", "translate(" + 0 + ",0)")

        const arc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2 * Math.PI)

        const arcProgress = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle((d) => degToRad(360 * (d / 100)))
            .cornerRadius(10)

        const highArc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle((d) => {
                if (d > 100) {
                    return degToRad(360 - (d - 100))
                }
                return 0
            })
            .endAngle((d) => {
                if (d > 100) {
                    return degToRad(360)
                }
                return 0
            })

        g
            .selectAll(".circleBg")
            .data(data)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", "#F1EEE9")
            .attr("transform", (d, i) => `translate(${outerRadius + margin + i * (outerRadius + margin - 20)},${outerRadius + margin + 50 * i})`)

        g
            .selectAll(".circleProgress")
            .data(data)
            .enter()
            .append("path")
            .attr("d", arcProgress)
            .attr("fill", (d) => {
                if (d > 0 && d <= 25) return colors[0].value
                else if (d > 26 && d <= 80) return colors[1].value
                if (d > 80 && d <= 100) return colors[2].value
                else return colors[3].value
            })
            .attr("transform", (d, i) => `translate(${outerRadius + margin + i * (outerRadius + margin - 20)},${outerRadius + margin + 50 * i})`)

        g
            .selectAll(".highProgress")
            .data(data)
            .enter()
            .append("path")
            .attr("d", highArc)
            .attr("fill", (d) => {
                if (d > 0 && d <= 25) return colors[0].value
                else if (d > 26 && d <= 80) return colors[1].value
                if (d > 80 && d <= 100) return colors[2].value
                else return colors[3].value
            })
            .attr("transform", (d, i) => `translate(${outerRadius + margin + i * (outerRadius + margin - 20)},${outerRadius + margin + 50 * i})`)
            .attr("stroke", d => d > 100 ? "#F1EEE9" : "none")

        g
            .selectAll(".progressText")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", (d) => {
                if (d > 0 && d <= 25) return colors[0].value
                else if (d > 26 && d <= 80) return colors[1].value
                if (d > 80 && d <= 100) return colors[2].value
                else return colors[3].value
            })
            .attr("transform", (d, i) =>
                `translate(${margin + outerRadius - innerRadius / 2.5 + i * (outerRadius + margin - 20)},${outerRadius + margin + 10 + 50 * i})`
            )
            .text(d => d + "%")
            .attr("style", "font-weight:500; font-size:20px")


    }, [dimensions, data, colors, highData])

    return (
        <div ref={svgWrapper} style={{ minWidth: "500px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "350px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
