import React, { useEffect, useState } from 'react';
import '../style/Dashboard.css';

const Dashboard = () => {
  const [counters, setCounters] = useState({});
  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await fetch('http://localhost:3001/dashboard/counters');
        const data = await response.json();
        setCounters(data);
      } catch (error) {
        console.error('Error fetching counters:', error);
      }
    };

    fetchCounters();
  }, []);

  return (
    <div>
        <h1 style={{ marginLeft: '120px', position: 'relative' }} >  Dashboard</h1>
    
    <div className='card-container '>
      <div className='card'>
        <div className='card1'>
          <div className='1stcard'>Total Projects: {counters.totalProjects}</div>
        </div>
      </div>

      <div className='card'>
        <div className='card2'>
          <div>Total Closed Projects: {counters.closedProjects}</div>
        </div>
      </div>

      <div className='card'>
        <div className='card3'>
          <div>Total Running Projects: {counters.runningProjects}</div>
        </div>
      </div>

      <div className='card'>
        <div className='card4'>
          <div>Total Overdue Projects: {counters.overdueProjects}</div>
        </div>
      </div>

      <div className='card'>
        <div className='card5'>
          <div>Total Cancelled Projects: {counters.cancelledProjects}</div>
        </div>
      </div>

    </div>
    </div>
  );

};

export default Dashboard;
