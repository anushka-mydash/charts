import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import classes from "../styles.module.scss"

export default function MultipleScatterPlot({ data1, colors1, data2, colors2 }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    const findAvg = (data) => {

        data = data.sort((a, b) => a[0] - b[0]);
        let hashMap = new Map(), res = [];

        data.forEach((d) => {
            if (hashMap[d[0]]) {
                let count = hashMap[d[0]][1], value = hashMap[d[0]][0]
                hashMap[d[0]] = [(value + d[1]) / ++count, count]
            } else {
                hashMap[d[0]] = [d[1], 1]
            }
        })

        for (const key in hashMap) {
            if (Object.hasOwnProperty.call(hashMap, key)) {
                const element = hashMap[key];
                res.push([parseInt(key), element[0]])
            }
        }
        return res;
    }

    useEffect(() => {

        if (!dimensions) {
            return;
        }
        const avgData1 = findAvg(data1);
        const avgData2 = findAvg(data2);

        const margin = 200;
        const chartWidth = dimensions.width - margin;
        const chartHeight = dimensions.height - margin;

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + margin / 2 + "," + margin / 2 + ")");

        const x = d3.scaleLinear()
            .domain([0, 100]).range([0, chartWidth]);
        const y = d3.scaleLinear()
            .domain([0, 100]).range([chartHeight, 0]);

        g.append("g")
            .attr("transform", "translate(0, " + chartHeight + ")")
            .call(d3.axisBottom(x))

        g.append("g")
            .call(d3.axisLeft(y))

        const xAxisGrid = d3
            .axisBottom(x)
            .tickSize(-chartHeight)
            .tickFormat('')
            .ticks(10);

        const yAxisGrid = d3
            .axisLeft(y)
            .tickSize(-chartWidth)
            .tickFormat('')
            .ticks(5);

        g.append('g')
            .attr('class', classes.axisGrid)
            .attr('transform', 'translate(0,' + chartHeight + ')')
            .call(xAxisGrid);
        g.append('g')
            .attr('class', classes.axisGrid)
            .call(yAxisGrid);

        const line = d3.line()
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); })

        g.append("path")
            .datum(avgData1)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", colors1.line)
            .style("stroke-width", "3");

        g.append("path")
            .datum(avgData2)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", colors2.line)
            .style("stroke-width", "3");

        g.append("g")
            .selectAll("dot")
            .data(data1)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[0]); })
            .attr("cy", function (d) { return y(d[1]); })
            .attr("r", 7)
            .style("fill", colors1.dot)
            .style("stroke", "white")

        g.append("g")
            .selectAll("dot1")
            .data(data2)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[0]); })
            .attr("cy", function (d) { return y(d[1]); })
            .attr("r", 7)
            .style("fill", colors2.dot)
            .style("stroke", "white")

    }, [dimensions, data1, colors1, data2, colors2])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "500px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
