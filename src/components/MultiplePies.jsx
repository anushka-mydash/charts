import React, { useRef, useEffect } from "react";
import Legends from "./Legends/Legends";
import PieChart from "./PieChart";
import SmallPieChart from "./SmallPieChart";
import { pieChartData } from "../utils/data";

export default function MultiplePies({ data }) {
    const selectedSvg = useRef();
    const svgWrapper = useRef();


    return (
        <div ref={svgWrapper} style={{ minWidth: "1000px", minHeight: "400px" }}>
            <svg
                ref={selectedSvg}
                style={{ width: "100%", minHeight: "500px", flex: 0.4 }}
            >
                <PieChart
                    data={pieChartData}
                    selectedSvg={selectedSvg}
                    svgWrapper={svgWrapper}
                />
                <SmallPieChart
                    data={pieChartData}
                    selectedSvg={selectedSvg}
                    svgWrapper={svgWrapper}
                />
            </svg>

            <Legends data={pieChartData} />
        </div>)
}