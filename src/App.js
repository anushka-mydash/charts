import React from 'react'
import LayeredBarChart from './components/LayeredBarChart'
import ProgressiveDonutChart from './components/ProgressiveDonutChart'
import Legend from './components/Legends/Legends'
import classes from "./styles.module.scss"
import { progressiveData, layeredBarData, certificationRequirement, layeredBarLegends } from "./utils/data.js"

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

      </div>
    </div>

  )
}
