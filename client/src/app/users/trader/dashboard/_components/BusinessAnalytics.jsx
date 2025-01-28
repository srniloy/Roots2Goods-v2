'use client'
import { Stack } from '@mui/material';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import ReactApexChart from 'react-apexcharts'


import React, { Component, useContext, useEffect } from 'react';
import UserContext from '@context/userContext';
import { GetDashboardAnalyticsData } from '@services/td-service/dashboard_service';



const BusinessAnalytics = (props) => {
  const [topExpenseSectors, setTopExpenseSectors] = React.useState({
    series: [],
    options: {
        title: {
            text: 'Profit Per Product', // Set the title text
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
            background: '#223f3d'
        },
        colors: [
          "#2a69c7",
          "#2b908f",
          "#f48024",
          "#d4526e",
          "#EFB036",
          "#13d8aa",
          "#69d2e7",
          "#90ee7e",
          "#f9a3a4",
          "#546E7A",
          "#A5978B",
        ],
        theme: {
            mode: 'dark',
        },
        labels: [],
        responsive: [{
            breakpoint: 640,

            options: {
                chart: {
                    width: "100%",
                    height: 300,
                    margin: 0,
                    toolbar: {
                      show: false, // Disable the toolbar if not needed
                    },
                },
                legend: {
                    position: 'bottom',
                    fontSize: '11px',
                    offsetY: 0,
                    width: '100%',
                    markers: {
                      size: 3,
                  },
                },
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
              size: 5,
                width: 15, // Set the width of legend markers
                height: 15, // Set the height of legend markers
            },
            fontSize: '14px',
        },
    },
  })

  const {user, setUser} = useContext(UserContext)
  const [totalValues, setTotalValues] = React.useState({totalCost: 0, totalSales: 0, totalProfit: 0})
  
  const getAnalyticsData = async(user_id)=>{
    const res = await GetDashboardAnalyticsData(user_id)
    if(res.status == 200){
      const {totalCost, totalSales, totalProfit, productWithProfit, salesOverMonth} = res.data
      setTotalValues({totalCost, totalSales, totalProfit})
      setTopExpenseSectors((prev) => ({
        ...prev,
        series: productWithProfit.map(item => item.totalProfit), // Set total profits as series
        options: {
          ...prev.options,
          labels: productWithProfit.map(item => item.product_name), // Set product names as labels
        },
      }));
      setTopSellingProduct((prev) => ({
        ...prev,
        series: [{data: salesOverMonth.map(item => item.amount)}], 
        options: {
          ...prev.options,
          xaxis: {
            categories: salesOverMonth.map(item => item.collection_date)
        }
        },
      }));

    }
  }

  useEffect(()=>{
    if(user){
      getAnalyticsData(user._id)
    }
  }, [user])










  
  
  const [topSellingProduct, setTopSellingProduct] = React.useState({
    series: [{
        data: []
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
        responsive: [{
          breakpoint: 640,

          options: {
              chart: {
                  width: "100%",
                  height: 350,
                  margin: 0,
                  toolbar: {
                    show: false, // Disable the toolbar if not needed
                  },
              },
              legend: {
                  position: 'bottom',
                  fontSize: '11px',
                  offsetY: 0,
                  width: '100%',
                  markers: {
                    size: 3,
                },
              },
          }
      }],
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: [],
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
      <div style={{height: 'max-content'}}>
          <div className="w-layout-hflex frmr-total-calculations">
            <div className="frmr-total-expences">
              <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '68px'}}/>
                <div className="frmr-total-calc-text">
                  <h5 className="frmr-total-calc-h4">Total Expenses</h5>
                  <h4 className="frmr-total-calc-h5">{totalValues?.totalCost.toLocaleString('en-US')} <span className="text-span-3"></span></h4>
                </div>
              </div>
            </div>
            <div className="frmr-total-sales">
              <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
                <div className="frmr-total-calc-text">
                  <h5 className="frmr-total-calc-h4">Total Sales</h5>
                  <h4 className="frmr-total-calc-h5">{totalValues?.totalSales.toLocaleString('en-US')} <span className="text-span-3"></span></h4>
                </div>
              </div>
            </div>
            <div className="total-revenue">
              <div className="w-layout-hflex frmr-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="frmr-total-calc-icons" style={{width: '64px'}}/>
                <div className="frmr-total-calc-text">
                  <h5 className="frmr-total-calc-h4">Total Profit</h5>
                  <h4 className="frmr-total-calc-h5">{totalValues?.totalProfit.toLocaleString('en-US')} <span className="text-span-3"></span></h4>
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

              
              <Stack gap={2} className='chart-wrapper' direction={{ xs: 'column', md: 'row' }}>
              
              <div style={{ padding: '0 20px 10px 20px', borderRadius: '10px', backgroundColor: '#223f3d', width: 'fit-content' }}>
                        <ReactApexChart options={topExpenseSectors.options} series={topExpenseSectors.series} type="pie" width={460} />
                    </div>

                    <div style={{ padding: '0 20px 20px', borderRadius: '10px', backgroundColor: '#223f3d', width: 'fit-content' }}>
                        <ReactApexChart options={topSellingProduct.options} series={topSellingProduct.series} type="bar" height={350} width={480} />

                    </div>
              </Stack>



              


              
        
        
        
      



          </div>

      </div>

    </div>
  )
}

export default BusinessAnalytics