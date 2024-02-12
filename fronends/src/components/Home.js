import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import DashboardChart from './DashboardChart'

function Home() {
    return (
        <div>
            <div> <Navbar /> </div>
            <div> <Dashboard/></div>
            <div><DashboardChart/></div>
        </div>
    )
}

export default Home