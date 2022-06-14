import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";

export default function StackedBarChart({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        if (!dimensions) {
            return;
        }

        const margin = 0;
        const chartHeight = dimensions.height - margin;

        const svg = d3.select(selectedSvg.current);

        const g = svg.append("g")
            .attr("transform", `translate(0,0)`)

        const rectHeight = chartHeight / 1.7;
        let h = 0;

        // eslint-disable-next-line
        data = data.map((d, i) => {
            d = {
                ...d,
                y: h
            }
            h += rectHeight * d.value;
            return d;
        })

        g
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return 0;
            })
            .attr("y", function (d) { return d.y + chartHeight / 6 })
            .attr("width", 150)
            .attr("height", function (d) { return rectHeight * d.value })
            .attr("fill", (d) => d.color);


    }, [dimensions, data])

    return (
        <div ref={svgWrapper} style={{
            minWidth: "1vw", minHeight: "300px",
            marginRight: "-5.5vw"
        }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}