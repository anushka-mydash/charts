import React, { useEffect, useState } from 'react'
import LayeredBarChart from './components/LayeredBarChart'
import ProgressiveDonutChart from './components/ProgressiveDonutChart'
import PieChart from './components/PieChart'
import WorldMap from './components/WorldMap'
import BiDirectionalBarChart from './components/BiDirectionalBarChart'
import OtherPie from './components/OtherPie'
import StackedBarChart from './components/StackedBarChart'
import Legend from './components/Legends/Legends'
import classes from "./styles.module.scss"

import {
  progressiveData,
  layeredBarData, certificationRequirement, layeredBarLegends,
  pieChartData,
  worldMapData, worldLegendData,
  biData, biLegends,
  otherPieData, stackedBarData
} from "./utils/data.js"
import SmallPieChart from './components/SmallPieChart'

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

      </div>
    </div>

  )
}
