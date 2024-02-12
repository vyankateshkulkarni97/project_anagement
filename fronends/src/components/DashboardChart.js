
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const DashboardChart = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/dashboard/chart');
        const data = await response.json();
        console.warn(data)
        const totalProjectsValue = data[0].TotalProjects; 
        const closedProjectsValue = data[1].ClosedProjects;
        console.warn(totalProjectsValue)
        console.warn(closedProjectsValue)
        const processedData = processData(data);

        setChartOptions(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const totalProjects = data.find(item => item.TotalProjects)?.TotalProjects || 0;
    const closedProjects = data.find(item => item.ClosedProjects)?.ClosedProjects || 0;

    const departmentData = data.find(item => item.departmentResult)?.departmentResult || [];
    const processedData = departmentData.map((department) => ({
      name: department.Department,
      data: [totalProjects, closedProjects],
    }));

    return {

      chart: {
        type: 'column',
        width: 1500,
        height: 600,

      },
      title: {
        text: 'Department-wise Success Percentage',
      },
      xAxis: {
        categories: ['Closed Projects', 'Total Projects'],
      },
      yAxis: {
        title: {
          text: 'Percentage',
        },
      },
      series: processedData,
    };
  };


  return (
    <div className="chart-container">
      <HighchartsReact className="chart-container" highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default DashboardChart;
