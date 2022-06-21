import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import classes from "../styles.module.scss"

export default function ScatterPlot({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    const findCoords = () => {
        let res = [];

        data = data.sort((a, b) => a[0] - b[0])
        let x1 = data[0][0], x2 = data[data.length - 1][0], y1 = 0, y2 = 0;

        if (x1 !== 0)
            res.push([0, 0])

        let dataFirst = data.filter(d => d[0] === x1)
        let dataLast = data.filter(d => d[0] === x2)

        dataFirst.forEach(d => {
            y1 += d[1];
        })
        y1 /= dataFirst.length;

        dataLast.forEach(d => {
            y2 += d[1];
        })
        y2 /= dataLast.length;

        res.push([x1, y1])
        res.push([x2, y2])

        if (x2 !== 100) {
            res.push([100, y2])
        }

        return res

    }

    useEffect(() => {

        if (!dimensions) {
            return;
        }
        const coordinates = findCoords();

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
            .datum(coordinates)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "#F15412")
            .style("stroke-width", "3");

        g.append("g")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[0]); })
            .attr("cy", function (d) { return y(d[1]); })
            .attr("r", 7)
            .style("fill", "#3AB0FF")
            .style("stroke", "white")


        // eslint-disable-next-line
    }, [dimensions, data])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "500px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
