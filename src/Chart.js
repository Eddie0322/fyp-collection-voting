import Chart from "react-apexcharts"

const StackedBar = ({stackedBarLabel, stackedBarValue, stackedBarColors}) => {

    //console.log(stackedBarValue)
    const seriesData = [
        {
          name: stackedBarLabel[0],
          data: [stackedBarValue[0]]
        },
        {
            name: stackedBarLabel[1],
            data: [stackedBarValue[1]]
        },
        {
            name: stackedBarLabel[2],
            data: [stackedBarValue[2]]
        },
        {
            name: "Others",
            data: [stackedBarValue[3]]
        }
      ]


    return (
        <Chart
        
          type = "bar"
          width = {520}
          height = {130}
          horizontalalign = "left"
          
          series = {seriesData}

       

          options = {{
                title: 
                    {
                        text: ""
                    },

                colors: [stackedBarColors[0], stackedBarColors[1], stackedBarColors[2], '#4f5557'],    

                chart: {
                        stacked: true,
                        stackType: "100%",
                        foreColor: '#d3d3d3',
                        offsetX: -28,
                        offsetY: -40,
                        redrawOnParentResize: true,
                        toolbar:
                            {
                                show: false
                            },
                            
                            animations: {
                                enabled: true,
                                easing: 'easeinout',
                                speed: 800,
                                animateGradually: {
                                    enabled: true,
                                    delay: 150
                                },

                            }                       
                    },
                    
                plotOptions: 
                    {
                        bar: 
                            {
                                horizontal: true,
                                columnWidth: "100%"
                            }
                    },

                xaxis: 
                    {
                        categories: [""],
                        labels: 
                            {
                                show: false
                            },
                        axisBorder: 
                            {
                                show: false
                            },
                        axisTicks: 
                            {
                                show: false
                            }
                    },

                legend: 
                    {
                        showForZeroSeries: false,
                        position: "bottom",
                        horizontalAlign: "right",
                        offsetY: -44,
                        height: 28,
                        markers: {
                            
                        }
                    },

                 grid: 
                    {
                        show: false
                    },
                
                dataLabels:
                    {
                        enabled: true
                    },

                tooltip:
                    {
                        followCursor: true,
                        intersect: true,
                        theme: "dark",
                    }
            }}

        />

      );
}

export default StackedBar