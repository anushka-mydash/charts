import React, { useRef, useEffect } from "react";
import { useResizeObserver } from "../utils/resizeObserver";
import Legends from "./Legends/Legends";
import PieChart from "./PieChart";
import SmallPieChart from "./SmallPieChart";
import { pieChartData } from "../utils/data";

export default function MultiplePies({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();

    const dimensions = useResizeObserver(svgWrapper);

    useEffect(() => {
        if (!dimensions) {
            return;
        }
    }, [dimensions])

    return (
        <div ref={svgWrapper} style={{ minWidth: "500px", minHeight: "300px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
            </svg>
            <PieChart
                data={pieChartData}
            />
            <SmallPieChart
                data={pieChartData}
            />
            <Legends data={pieChartData} />
        </div>)
}