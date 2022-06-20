import React, { useEffect, useState } from 'react'
import LayeredBarChart from './components/LayeredBarChart'
import ProgressiveDonutChart from './components/ProgressiveDonutChart'
import WorldMap from './components/WorldMap'
import BiDirectionalBarChart from './components/BiDirectionalBarChart'
import OtherPie from './components/OtherPie'
import StackedBarChart from './components/StackedBarChart'
import LineChart from './components/LineChart'
import ProgressCircle from './components/ProgressCircle'
import Stack from './components/Stack'
import HorizontalFunnel from './components/HorizontalFunnel'
import AreaChart from './components/AreaChart'
import ScatterPlot from './components/ScatterPlot'
import Legend from './components/Legends/Legends'
import classes from "./styles.module.scss"

import {
  progressiveData,
  layeredBarData, certificationRequirement, layeredBarLegends,
  worldMapData, worldLegendData,
  biData, biLegends,
  otherPieData, stackedBarData,
  lineChartData,
  progressBar,
  colorsProgressBar,
  stackData, stackCol,
  funnel,
  scatterPlot
} from "./utils/data.js"

import ProgressBars from './components/ProgressBars'
import MultiplePies from './components/MultiplePies'

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
          <MultiplePies />
          {/* <Legends data={pieChartData} /> */}

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
            <ProgressCircle data={[25, 65]} />
            <ProgressCircle data={[100, 120]} />
          </div>
          <div className={classes.flexDiv}>
            {colorsProgressBar.map((e, i) => <Legend key={i} data={[e]} />)}
          </div>
        </div>

        <div className={classes.basicDiv}>
          <Stack data={stackData} />
          <div className={classes.flexDiv}>
            {stackCol.map((e, i) => <Legend key={i} data={[e]} />)}
          </div>
        </div>

        <div className={classes.basicDiv}>
          <HorizontalFunnel data={funnel} />
        </div>

        <div className={classes.basicDiv}>
          <AreaChart />
        </div>

        <div className={classes.basicDiv}>
          <ScatterPlot data={scatterPlot} />
          <div className={classes.flexDiv}>
            <Legend data={[{ color: "#3AB0FF", label: "Data" }]} />
            <Legend data={[{ color: "#F15412", label: "Data Avg" }]} />
          </div>
        </div>

      </div>
    </div>

  )
}
