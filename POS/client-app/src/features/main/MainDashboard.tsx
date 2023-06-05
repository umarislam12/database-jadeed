import { Grid } from "semantic-ui-react";
import React,{LegacyRef, useRef, useEffect} from 'react';
import { Chart , ChartData, ChartOptions, ChartTypeRegistry, ChartConfiguration } from "chart.js";

interface LineChartProps {
  data: ChartData<'line', number[], string>;
  options?: ChartOptions<'line'>;
}
const data={
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1
    }
  ]
}
const options={
  responsive: true,
  maintainAspectRatio: false
}
function MainDashboard({ data, options }: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement >(null);
  const chartInstanceRef = useRef<Chart<keyof ChartTypeRegistry, number[], string>| any>(null);
   
  useEffect(()=>{
    const chartElement=chartRef.current;
    if (!chartElement) {
      return;
    }
    const chartConfig: ChartConfiguration = {
      type:'line', 
      data:data,
      options:options 
    };
    const chart=new Chart(chartElement,chartConfig)
    
    chartInstanceRef.current = chart;

    return () => {
      chart.destroy();
    };
  }, [data, options]
  );
    return (  <Grid>
        <Grid.Column width='10'>
            
        <canvas ref={chartRef} />
            </Grid.Column></Grid> );
}

export default MainDashboard;