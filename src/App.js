import React from 'react'
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
          <Legend data={[...otherPieData, ...stackedBarData]} />
        </div>

      </div>
    </div>

  )
}
