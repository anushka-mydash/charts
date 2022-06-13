import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";

export default function WorldMap({ mapData }) {

    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        if (!dimensions) {
            return;
        }

        const chartWidth = dimensions.width - 50;
        const chartHeight = dimensions.height;

        const svg = d3.select(selectedSvg.current);

        const projection = d3.geoNaturalEarth1()
            .scale(chartWidth / 1.5 / Math.PI)
            .translate([chartWidth / 2, chartHeight / 2])

        d3.json("world.json").then(function (data) {

            svg.append("g")
                .selectAll("path")
                .data(data.features)
                .join("path")
                .attr("fill", (d) => {
                    const res = mapData.filter(el => d.id === el.id)
                    return res.length > 0 ? res[0].color : "#eeeeee"
                }
                )
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .attr("class", (d) => d.id)
                .style("stroke", "#dddddd")
        })

    }, [mapData, dimensions])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>
    );
}
