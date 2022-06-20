import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
// import classes from "../styles.module.scss"

export default function LineChart() {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {

        if (!dimensions) {
            return;
        }

        const margin = { top: 10, right: 30, bottom: 30, left: 50 };
        const width = dimensions.width - margin.left;
        const height = dimensions.height - margin.top;

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

            d => {
                return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
            }).then(

                function (data) {

                    data = data.filter((d, i) => i < 10)

                    const x = d3.scaleTime()
                        .domain(d3.extent(data, d => d.date))
                        .range([5, width - margin.right]);

                    svg.append("g")
                        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
                        .call(d3
                            .axisBottom(x)
                            .tickPadding(10)
                            .tickSize(0)
                            .ticks(5)
                        )

                    const y = d3.scaleLinear()
                        .domain(d3.extent(data, d => +d.value))
                        .range([height - margin.bottom - 10, margin.top]);

                    svg.append("g")
                        .attr("transform", `translate(${margin.left}, 10)`)
                        .call(d3.axisLeft(y).tickSizeOuter(0));

                    g.append("path")
                        .datum(data)
                        .attr("fill", "#69b3a2")
                        .attr("fill-opacity", .3)
                        .attr("stroke", "none")
                        .attr("d", d3.area()
                            .x(d => x(d.date))
                            .y0(height - margin.bottom - 10)
                            .y1(d => y(d.value))
                        )

                    g.append("path")
                        .datum(data)
                        .attr("fill", "none")
                        .attr("stroke", "#69b3a2")
                        .attr("stroke-width", 4)
                        .attr("d", d3.line()
                            .x(d => x(d.date))
                            .y(d => y(d.value))
                        )

                    g.selectAll("myCircles")
                        .data(data)
                        .join("circle")
                        .attr("fill", "red")
                        .attr("stroke", "none")
                        .attr("cx", d => x(d.date))
                        .attr("cy", d => y(d.value))
                        .attr("r", 3)

                })

    }, [dimensions])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "500px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
