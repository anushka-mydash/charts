import React from 'react'
import ProgressiveDonutChart from './components/ProgressiveDonutChart'
import Legends from "./components/Legends/Legends";
import classes from "./styles.module.scss"
import { progressiveData } from "./utils/data.js"

export default function App() {

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Charts</h1>
      <div className={classes.main}>

        <div className={classes.flexDiv}>
          <ProgressiveDonutChart data={progressiveData} />
          {/* <Legends data={progressiveData} /> */}
        </div>

      </div>
    </div>

  )
}
