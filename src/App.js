import React, { useEffect, useState } from 'react'
import LayeredBarChart from './components/LayeredBarChart'
import ProgressiveDonutChart from './components/ProgressiveDonutChart'
import PieChart from './components/PieChart'
import WorldMap from './components/WorldMap'
import BiDirectionalBarChart from './components/BiDirectionalBarChart'
import OtherPie from './components/OtherPie'
import StackedBarChart from './components/StackedBarChart'
import LineChart from './components/LineChart'
import Legend from './components/Legends/Legends'
import classes from "./styles.module.scss"

import {
  progressiveData,
  layeredBarData, certificationRequirement, layeredBarLegends,
  pieChartData,
  worldMapData, worldLegendData,
  biData, biLegends,
  otherPieData, stackedBarData,
  lineChartData,
  progressBar,
  colorsProgressBar
} from "./utils/data.js"

import SmallPieChart from './components/SmallPieChart'
import ProgressBars from './components/ProgressBars'

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = otherPieData.filter((d) => d.label !== "Other")
    setData(d);
  }, [])
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Charts</h1>
      <div className={classes.main}>

        <div className={classes.flexDiv}>
          <ProgressiveDonutChart data={progressiveData} />
        </div>

        <div className={classes.flexDiv}>
          <LayeredBarChart
            data={layeredBarData}
            certificationRequirement={certificationRequirement}
          />
          <Legend data={layeredBarLegends} />
        </div>

        <div className={classes.flexDiv}>
          <WorldMap mapData={worldMapData} />
          <Legend data={worldLegendData} />
        </div>

        <div className={classes.flexDiv}>
          <BiDirectionalBarChart
            data={biData}
          />
          <Legend data={biLegends} />
        </div>

        <div className={classes.flexDiv}>
          <PieChart
            data={pieChartData}
          />
          <SmallPieChart
            data={pieChartData}
          />
          <Legend data={pieChartData} />
        </div>

        <div className={classes.flexDiv}>
          <OtherPie
            data={otherPieData}
          />
          <StackedBarChart
            data={stackedBarData}
          />
          <Legend data={[...data, ...stackedBarData]} />
        </div>

        <div className={classes.basicDiv}>
          <LineChart
            data={lineChartData.data}
            color={lineChartData.color}
          />
          <div className={classes.flexDiv}>
            <Legend data={[{ label: "Data 1", color: "#F9D923" }]} />
            <Legend data={[{ label: "Data 2", color: "#1363DF" }]} />
          </div>
        </div>

        <div className={classes.basicDiv}>
          <ProgressBars data={progressBar} />
          <div className={classes.flexDiv}>
            {colorsProgressBar.map((e, i) => <Legend key={i} data={[e]} />)}
          </div>
        </div>

        <div className={classes.basicDiv}>
          <div className={classes.flexDiv}>
            {colorsProgressBar.map((e, i) => <Legend key={i} data={[e]} />)}
          </div>
        </div>

      </div>
    </div>

  )
}
