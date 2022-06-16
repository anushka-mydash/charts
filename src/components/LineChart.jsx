import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import classes from "../styles.module.scss"

export default function LineChart({ data, color }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        console.log(data, color)
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
            .domain([0, 50]);

        g.append("g")
            .attr("transform", "translate(0," + chartHeight + ")")
            .attr("class", classes.axisGrey)
            .call(d3.axisBottom(xScale))

        g.append("g")
            .attr("class", classes.axisGrey)
            .call(d3.axisLeft(yScale)
                .tickFormat((d) => d)
                .ticks(5)
            );

        const xAxisGrid = d3
            .axisBottom(xScale)
            .tickSize(-chartWidth)
            .tickFormat('')
            .ticks(5);

        const yAxisGrid = d3
            .axisLeft(yScale)
            .tickSize(-chartWidth)
            .tickFormat('')
            .ticks(5);

        g.append('g')
            .attr('class', classes.axisGrid)
            .attr('transform', 'translate(0,' + chartWidth + ')')
            .call(xAxisGrid);
        g.append('g')
            .attr('class', classes.axisGrid)
            .call(yAxisGrid);

        const line = d3.line()
            .x(function (d) { return xScale(d.label); })
            .y(function (d) { return yScale(d.val1); })

        const line1 = d3.line()
            .x(function (d) { return xScale(d.label); })
            .y(function (d) { return yScale(d.val2); })

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("transform", "translate(" + 137 + "," + 100 + ")")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", color[0])
            .style("stroke-width", "3");

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(d.label) + 45; })
            .attr("cy", function (d) { return yScale(d.val1); })
            .attr("r", 5)
            .attr("transform", "translate(" + 93 + "," + 100 + ")")
            .style("fill", color[0])
            .style("stroke", "#eee")

        svg.append("path")
            .datum(data)
            .attr("class", "line1")
            .attr("transform", "translate(" + 137 + "," + 100 + ")")
            .attr("d", line1)
            .style("fill", "none")
            .style("stroke", color[1])
            .style("stroke-width", "3");

        svg.append('g')
            .selectAll("dot1")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(d.label) + 45; })
            .attr("cy", function (d) { return yScale(d.val2); })
            .attr("r", 5)
            .attr("transform", "translate(" + 93 + "," + 100 + ")")
            .style("fill", color[1])
            .style("stroke", "#eee")




    }, [dimensions, data, color])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
