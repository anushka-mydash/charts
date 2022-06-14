import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import classes from "../styles.module.scss"

export default function BiDirectionalBarChart({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        if (!dimensions) {
            return;
        }

        const margin = 120;
        const chartWidth = dimensions.width - margin;
        const chartHeight = dimensions.height - margin;

        const svg = d3.select(selectedSvg.current);

        var xScale = d3
            .scaleBand()
            .range([0, chartWidth]),

            yScale = d3
                .scaleLinear()
                .range([chartHeight, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

        xScale
            .domain(data.map((d) => d.label));
        yScale
            .domain([-1, 5]);

        g.append("g")
            .attr("transform", "translate(0," + chartHeight + ")")
            .attr("class", classes.axisGrey)
            .call(d3.axisBottom(xScale))

        g.append("g")
            .attr("class", classes.axisGrey)
            .call(d3.axisLeft(yScale)
                .tickFormat((d) => "$" + d + "M")
                .ticks(5)
            );

        g.selectAll(".debitBar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "debitBar")
            .attr("x", function (d) { return xScale(d.label) + 5; })
            .attr("y", function (d) { return yScale(d.debit); })
            .attr("width", xScale.bandwidth() - 10)
            .attr("height", function (d) { return chartHeight - yScale(d.debit) - yScale(4); })
            .attr("fill", "#A0D995");


        g.selectAll(".creditBar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "creditBar")
            .attr("x", function (d) { return xScale(d.label) + 5; })
            .attr("y", chartHeight - yScale(4))
            .attr("width", xScale.bandwidth() - 10)
            .attr("height", function (d) {
                return chartHeight - yScale(Math.abs(d.credit)) - yScale(4)
            })
            .attr("fill", "#EF9F9F");
        g
            .append("line")
            .attr("x1", 0)
            .attr("x2", xScale.bandwidth() * data.length)
            .attr("y1", chartHeight - yScale(4))
            .attr("y2", chartHeight - yScale(4))
            .attr("fill", "none")
            .attr("stroke", "#000")

        var line = d3.line()
            .x(function (d) { return xScale(d.label); })
            .y(function (d) { return yScale(d.balance); })

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("transform", "translate(" + 145 + "," + 100 + ")")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "#34B3F1")
            .style("stroke-width", "3");

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(d.label) + 45; })
            .attr("cy", function (d) { return yScale(d.balance); })
            .attr("r", 5)
            .attr("transform", "translate(" + 100 + "," + 100 + ")")
            .style("fill", "#34B3F1")
            .style("stroke", "#eee")


    }, [dimensions, data])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
