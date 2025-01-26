'use client'
import { Stack } from '@mui/material';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
// import ReactApexChart from 'react-apexcharts'


import React, { Component } from 'react';



const BusinessAnalytics = (props) => {



  const [totalCalculations, setTotalCalculations] = React.useState(undefined)
  // const [projectData, setProjectData] = React.useState(undefined)
  const [pieData, setPieData] = React.useState([])
  // let pieDataInit = [];


  const fetchTotalCalculations = async ()=>{
    console.log("object");
      // const postData = {
      // method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({user_id: props.info?.user_id}),
      // };

      // const res = await fetch(
      // '/api/get/total_calculations',
      // postData
      // )
      // const response = await res.json()
      // setTotalCalculations(response.data)
      // console.log(response.data)
      // setIsLoad(false)


      
  }
  let productsList = []
  let salesList = []
  let datesList = []

  const fetchPieData = async ()=>{
    console.log("object");
    // const postData1 = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({user_id: props.info?.user_id}),
    //   };
  
    //   const res1 = await fetch(
    //   'http://localhost:3000/api/get/get_project_info_for_graph',
    //   postData1
    //   )
    //   const response1 = await res1.json()

    //   response1.data.map((data, i)=>{
    //     productsList.push(data.product)
    //     salesList.push(data.total_sales)
    //     datesList.push(data.date)
    //   })
    //   setPieData(response1.data)
      
}


  
  React.useEffect(() => {
    fetchTotalCalculations()
    fetchPieData()
  }, []);







  const [topExpenseSectors, setTopExpenseSectors] = React.useState({
    series: [44, 55, 13, 43],
    options: {
        title: {
            text: 'Revenue Generated', // Set the title text
            align: 'center', // Set the title alignment (left, center, right)
            margin: 50,
            style: {
                fontSize: '20px', // Set the title font size
                color: '#FFF', // Set the title color
                fontFamily: 'Livvic',
            },
        },
        chart: {
            width: 420,
            type: 'pie',
            background: '#223f3d',
        },
        colors: ['rgb(24, 119, 242)', 'rgb(255, 86, 48)', 'rgb(0, 184, 217)', 'rgb(255, 171, 0)', '#81ae40', '#40ae9f'],
        theme: {
            mode: 'dark',
        },
        labels: ['Tometo', 'Cabbage', 'Onion', 'Poteto'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
  
        stroke: {
            color: 'none', // Set to 'none' to remove the border of the pie chart
            width: 0, // Set the border width to 0
        },
  
        legend: {
            position: 'right', // Set the legend position
            offsetY: 80, // Set the margin from the bottom of the legend
            markers: {
                width: 15, // Set the width of legend markers
                height: 15, // Set the height of legend markers
            },
            fontSize: '14px',
        },
    },
  })
  
  
  const [topSellingProduct, setTopSellingProduct] = React.useState({
    series: [{
        data: [400, 430, 448, 470, 540]
    }],
    options: {
        title: {
            text: 'Sales Over Month', // Set the title text
            align: 'center', // Set the title alignment (left, center, right)
            margin: 30,
            style: {
                fontSize: '20px', // Set the title font size
                color: '#FFF', // Set the title color
                fontFamily: 'Livvic',
            },
        },
        chart: {
            type: 'bar',
            height: 350,
            background: '#223f3d',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
                offsetX: 0, // Adjust the offset on the x-axis
                offsetY: 30, // Adjust the offset on the y-axis
                autoSelected: 'zoom', // Auto-select zoom tool when the chart is initialized
            },
        },
        theme: {
            mode: 'dark',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '40%',
  
            }
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ['Jan 01, 2023','Feb 04, 2023','Mar 23, 2023','Jun 3, 2023','jul 8, 2023',
            ],
        },
        grid: {
            borderColor: '#366562',
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        stroke: {
            color: 'none', // Set to 'none' to remove the border of the pie chart
            width: 0, // Set the border width to 0
        },
    },
  })






  
  return (
    
    <div className="business_analytics">
      <div className="w-layout-hflex frmr-total-calculations">
        <div className="frmr-total-expences">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '68px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Expenses</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.expense} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="frmr-total-sales">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Sales</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.sales} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        <div className="total-revenue">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Profit</h5>
              <h4 className="frmr-total-calc-h5">{totalCalculations?.revenue} <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div>
        {/* <div className="frmr-total-stocked">
          <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/stock.png" loading="lazy" alt="" className="frmr-total-calc-icons"/>
            <div className="frmr-total-calc-text">
              <h5 className="frmr-total-calc-h4">Total Stocked</h5>
              <h4 className="frmr-total-calc-h5">25,000 <span className="text-span-3"></span></h4>
            </div>
          </div>
        </div> */}
      </div>

      <div className="ba-charts">

          
          {/* <Stack direction='row' gap={2}>
          <div style={{ padding: '0 20px 20px', borderRadius: '10px', backgroundColor: '#223f3d', width: 'fit-content' }}>
                    <ReactApexChart options={topExpenseSectors.options} series={topExpenseSectors.series} type="pie" width={400} />
                </div>

                <div style={{ padding: '0 20px 20px', borderRadius: '10px', backgroundColor: '#223f3d', width: 'fit-content' }}>
                    <ReactApexChart options={topSellingProduct.options} series={topSellingProduct.series} type="bar" height={350} width={400} />

                </div>
          </Stack> */}


          


          
		
		
		
	



      </div>

    </div>
  )
}

export default BusinessAnalytics