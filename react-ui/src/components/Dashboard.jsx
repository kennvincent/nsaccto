import React from 'react'
import DashboardStatsGrid from './DashboardStatsGrid'
import MonthlyBudgetUtilizationChart from './MonthlyBudgetUtilizationChart'
import OfficeBudgetChart from './OfficeBudgetChart'
import CurrentBudgetAllotment from './CurrentBudgetAllotment'
export default function Dashboard() {
  return (
    <div className='flex flex-col gap-2'>
      <DashboardStatsGrid/>
      {/* <div className='flex flex-row gap-2 w-full'>
        <MonthlyBudgetUtilizationChart />
        <OfficeBudgetChart/>
      </div> */}
      <div className='flex flex-row gap-2 w-full'>
        <CurrentBudgetAllotment/>
      </div>

      <div>
        
      </div>
    </div>
  )
}

