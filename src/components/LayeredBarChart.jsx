import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../utils/resizeObserver";
import classes from "../styles.module.scss"

export default function LayeredBarChart({ data, certificationRequirement }) {
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
            .domain(data.map((d) => d.xLabel));
        yScale
            .domain([0, 10]);

        g.append("g")
            .attr("transform", "translate(0," + chartHeight + ")")
            .attr("class", classes.axisGrey)
            .call(d3.axisBottom(xScale));

        g.append("g")
            .attr("class", classes.axisGrey)
            .call(d3.axisLeft(yScale)
                .tickFormat((d) => d)
                .ticks(5)
            );

        g.selectAll(".bar1")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar1")
            .attr("x", function (d) { return xScale(d.xLabel); })
            .attr("y", function (d) { return yScale(d.groupAverage); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return chartHeight - yScale(d.groupAverage); })
            .attr("fill", "#FED452");

        g.selectAll(".bar2")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) { return xScale(d.xLabel) + 15; })
            .attr("y", function (d) { return yScale(d.candidateScore); })
            .attr("width", xScale.bandwidth() - 30)
            .attr("height", function (d) { return chartHeight - yScale(d.candidateScore); })
            .attr("fill", "#AB57FC");

        g
            .selectAll(".candidateScoreX")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", (d, i) => xScale.bandwidth() * i)
            .attr("x2", (d, i) => (i + 1) * xScale.bandwidth())
            .attr("y1", (d, i) => yScale(d.industryAvg))
            .attr("y2", (d, i) => yScale(d.industryAvg))
            .attr("fill", "none")
            .attr("stroke", "#242F9B")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .style("stroke-dasharray", ("5, 5"))
            .attr("stroke-width", 2.5)

        g
            .selectAll(".candidateScoreY")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", (d, i) => (i !== data.length - 1) ? (i + 1) * xScale.bandwidth() : 0)
            .attr("x2", (d, i) => (i !== data.length - 1) ? (i + 1) * xScale.bandwidth() : 0)
            .attr("y1", (d, i) => (i !== data.length - 1) ? yScale(d.industryAvg) : 0)
            .attr("y2", (d, i) => (i !== data.length - 1) ? yScale(data[i + 1].industryAvg) : 0)
            .attr("fill", "none")
            .attr("stroke", "#242F9B")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .style("stroke-dasharray", ("5, 5"))
            .attr("stroke-width", 2.5)

        g
            .append("line")
            .attr("x1", 0)
            .attr("x2", xScale.bandwidth() * data.length)
            .attr("y1", yScale(certificationRequirement))
            .attr("y2", yScale(certificationRequirement))
            .attr("fill", "none")
            .attr("stroke", "#FF5D5D")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2.5)


        // const xAxisGrid = d3
        //     .axisBottom(xScale)
        //     .tickSize(-chartWidth)
        //     .tickFormat('')
        //     .ticks(5);

        // const yAxisGrid = d3
        //     .axisLeft(yScale)
        //     .tickSize(-chartWidth)
        //     .tickFormat('')
        //     .ticks(5);

        // g.append('g')
        //     .attr('class', classes.axisGrid)
        //     .attr('transform', 'translate(0,' + chartWidth + ')')
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-linecap", "round")
        //     .style("stroke-dasharray", ("5, 5"))
        //     .call(xAxisGrid);
        // g.append('g')
        //     .attr('class', classes.axisGrid)
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-linecap", "round")
        //     .style("stroke-dasharray", ("5, 5"))
        //     .call(yAxisGrid);


    }, [dimensions, data, certificationRequirement])

    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
        </div>)
}
