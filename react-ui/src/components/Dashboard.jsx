import React, { useEffect, useState,useReducer } from 'react'
import DashboardStatsGrid from './DashboardStatsGrid'
import MonthlyBudgetUtilizationChart from './MonthlyBudgetUtilizationChart'
import OfficeBudgetChart from './OfficeBudgetChart'
import CurrentBudgetAllotment from './CurrentBudgetAllotment'
import axios from 'axios'
import AcctObrView from './accounting/AcctObrView'
import ShowObrBudget from './obligationrequest/ShowObrBudget'
import ObrListBudget from './ObrListBudget'
export default function Dashboard() {

  const [reducer,setReducer] = useReducer(x => x + 1,0);
  const [defaultDisplay,setDefaultDisplay] =useState();
  

   
  return (

    <div className='flex flex-col gap-2'>
      {/* <DashboardStatsGrid/> */}
      {/* <div className='flex flex-row gap-2 w-full'>
        <MonthlyBudgetUtilizationChart />
        <OfficeBudgetChart/>
      </div> */}
      <div className='flex flex-row gap-2 w-full'>
        {defaultDisplay}
        {/* <CurrentBudgetAllotment/> */}
      </div>

      <div>
        
      </div>
    </div>
  )
}

