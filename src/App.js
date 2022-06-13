import React from 'react'
import LayeredBarChart from './components/LayeredBarChart'
import ProgressiveDonutChart from './components/ProgressiveDonutChart'
// import PieChart from './components/PieChart'
import WorldMap from './components/WorldMap'
import BiDirectionalBarChart from './components/BiDirectionalBarChart'
import Legend from './components/Legends/Legends'
import classes from "./styles.module.scss"

import {
  progressiveData,
  layeredBarData, certificationRequirement, layeredBarLegends,
  // pieChartData,
  worldMapData, worldLegendData,
  biData, biLegends
} from "./utils/data.js"

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
            certificationRequirement={certificationRequirement}
          />
          <Legend data={biLegends} />
        </div>

      </div>
    </div>

  )
}
