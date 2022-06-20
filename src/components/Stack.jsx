import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import classes from "../styles.module.scss"

export default function ProgressBars({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);


    useEffect(() => {
        if (!dimensions) {
            return;
        }
        const margin = 100;
        const chartWidth = dimensions.width - margin, chartHeight = dimensions.height - margin

        const subgroups = Object.keys(data[0]).slice(1)
        const groups = d3.map(data, function (d) { return (d.group) })

        const svg = d3.select(selectedSvg.current);
        const g = svg.append("g")
            .attr("transform", "translate(100, 50)")

        const x = d3.scaleBand()
            .domain(groups)
            .range([0, chartWidth - 100])
            .padding([0.1])

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([chartHeight, 0]);

        g.append("g")
            .attr("class", classes.axisGrey)
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0))

        g.append("g")
            .attr("class", classes.axisGrey)
            .call(d3.axisLeft(y)
                .tickSizeOuter(0)
                .ticks(5)
                .tickFormat(d => d + "%")
            );

        const yAxisGrid = d3
            .axisLeft(y)
            .tickSize(-chartWidth + 100)
            .tickFormat('')
            .ticks(5);

        g.append('g')
            .attr('class', classes.axisGrid)
            .call(yAxisGrid);

        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['rgba(255, 165, 0, 0.9)', 'rgba(55, 126, 184, 0.9)', 'rgba(31, 70, 144, 0.9)'])

        data.forEach(function (d) {
            let tot = 0

            for (let i in subgroups) {
                let name = subgroups[i];
                tot += +d[name]
            }

            for (let i in subgroups) {
                let name = subgroups[i];
                d[name] = d[name] / tot * 100
            }
        })

        const stackedData = d3.stack()
            .keys(subgroups)
            (data)

        g.append("g")
            .selectAll("g")
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function (d) {
                return color(d.key);
            })
            .selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) { return x(d.data.group); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth())
            .attr("stroke", "#eee")



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
