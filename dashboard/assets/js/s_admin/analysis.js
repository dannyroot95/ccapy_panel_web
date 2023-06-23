var dt = firebase.database()
let cacheSt = localStorage.getItem("data_analysis")
let pCache = JSON.parse(cacheSt)

if(pCache != null){
    document.getElementById("loaderDiv").style = "display:none;"
    document.getElementById("getData").style = "display:block;"
    getAnalisysFromCache()
}else{
    getDataFromDatabase()
}

function getDataFromDatabase(){

    charts()

    dt.ref("devices").on('value', (snapshot) => {

        let num_devices = 0
        let num_registers = 0
        let num_users = 0
        let num_total_kwh = 0

        snapshot.forEach(data => {

            num_devices++
            let d = data.key

            for(i in data.val().registers){
                num_registers++
            }

            dt.ref("devices").child(d).child("current_data").get().then((shot) => {

                if(shot.exists()){
                    num_total_kwh = num_total_kwh+shot.val().energy
                    
                }

            });
            
        });

        db.collection("users").get().then(s =>{

            s.forEach(_ => {
                num_users++
            });

            let values = {
                num_devices : num_devices,
                num_registers : num_registers,
                num_users : num_users,
                num_kwh : num_total_kwh.toFixed(2)
            }

            localStorage.setItem("data_analysis",JSON.stringify(values))
            document.getElementById("users").innerHTML = num_users
            document.getElementById("numDev").innerHTML = num_devices
            document.getElementById("registers").innerHTML = num_registers
            document.getElementById("numKwh").innerHTML = num_total_kwh.toFixed(2)
            document.getElementById("loaderDiv").style = "display:none;"
            document.getElementById("getData").style = "display:block;"

        })

       
        
    
    })
}

function getAnalisysFromCache(){
            document.getElementById("users").innerHTML = pCache.num_users
            document.getElementById("numDev").innerHTML = pCache.num_devices
            document.getElementById("registers").innerHTML = pCache.num_registers
            document.getElementById("numKwh").innerHTML = pCache.num_kwh
    getDataFromDatabase()
}

function charts(){

    let chartConfig = {
        globals: {
          color: '#666',
        },
        backgroundColor: '#fff',
        graphset: [
          {
            type: 'gauge',
            width: '31.5%',
            height: '50%',
            x: '0px',
            y: '0px',
            title: {
              text: 'Corriente',
              mediaRules: [
                {
                  maxWidth: '650px',
                  visible: false,
                },
              ],
            },
            plot: {
              csize: '3%',
              size: '100%',
            },
            plotarea: {
              marginTop: '35%',
            },
            scale: {
              sizeFactor: 1.2,
              mediaRules: [
                {
                  maxWidth: '650px',
                  sizeFactor: 1.6,
                },
              ],
            },
            scaleR: {
              values: '0:60:10',
              aperture: 130,
              center: {
                borderColor: '#23211E',
                borderWidth: '2px',
                mediaRules: [
                  {
                    maxWidth: '650px',
                    size: '10px',
                  },
                ],
                size: '20px',
              },
              guide: {
                alpha: 1,
                backgroundColor: '#E3DEDA',
              },
              item: {
                offsetR: 0,
              },
              markers: [
                {
                  type: 'area',
                  alpha: 0.95,
                  backgroundColor: '#00AE4D',
                  range: 35,
                },
              ],
              ring: {
                backgroundColor: '#E3DEDA',
                mediaRules: [
                  {
                    maxWidth: '650px',
                    visible: false,
                  },
                ],
              },
              tick: {
                visible: false,
              },
            },
            tooltip: {
              visible: false,
            },
            mediaRules: [
              {
                maxWidth: '650px',
                width: '100%',
                height: '20%',
                x: '0px',
                y: '2%',
              },
              {
                minWidth: '651px',
                width: '31.5%',
                height: '50%',
                x: '0px',
                y: '0px',
              },
            ],
            series: [
              {
                values: [35],
                valueBox: {
                  text: '%v',
                  fontColor: '#00AE4D',
                  fontSize: '14px',
                  mediaRules: [
                    {
                      fontSize: '10px',
                      maxWidth: '650px',
                    },
                  ],
                  placement: 'center',
                },
                backgroundColor: '#23211E',
              },
            ],
          },
          {
            type: 'gauge',
            width: '31.5%',
            height: '50%',
            x: '34.5%',
            y: '0px',
            title: {
              text: 'Potencia',
              mediaRules: [
                {
                  maxWidth: '650px',
                  visible: false,
                },
              ],
            },
            plot: {
              csize: '3%',
              size: '100%',
            },
            plotarea: {
              marginTop: '35%',
            },
            scale: {
              sizeFactor: 1.2,
              mediaRules: [
                {
                  maxWidth: '650px',
                  sizeFactor: 1.6,
                },
              ],
            },
            scaleR: {
              values: '0:500:100',
              aperture: 130,
              center: {
                borderColor: '#23211E',
                borderWidth: '2px',
                mediaRules: [
                  {
                    maxWidth: '650px',
                    size: '10px',
                  },
                ],
                size: '20px',
              },
              guide: {
                alpha: 1,
                backgroundColor: '#E3DEDA',
              },
              item: {
                offsetR: 0,
              },
              markers: [
                {
                  type: 'area',
                  alpha: 0.95,
                  backgroundColor: '#E2D51A',
                  range: 12,
                },
              ],
              ring: {
                backgroundColor: '#E3DEDA',
                mediaRules: [
                  {
                    maxWidth: '650px',
                    visible: false,
                  },
                ],
              },
              tick: {
                visible: false,
              },
            },
            tooltip: {
              visible: false,
            },
            mediaRules: [
              {
                maxWidth: '650px',
                width: '100%',
                height: '20%',
                x: '0px',
                y: '20%',
              },
              {
                minWidth: '651px',
                width: '31.5%',
                height: '50%',
                x: '34.5%',
                y: '0px',
              },
            ],
            series: [
              {
                values: [11],
                valueBox: {
                  text: '%v',
                  fontColor: '#E2D51A',
                  fontSize: '14px',
                  mediaRules: [
                    {
                      fontSize: '10px',
                      maxWidth: '650px',
                    },
                  ],
                  placement: 'center',
                },
                backgroundColor: '#23211E',
              },
            ],
          },
          {
            type: 'gauge',
            width: '31.5%',
            height: '50%',
            x: '69%',
            y: '0px',
            title: {
              text: 'Voltaje',
              mediaRules: [
                {
                  maxWidth: '650px',
                  visible: false,
                },
              ],
            },
            plot: {
              csize: '3%',
              size: '100%',
            },
            plotarea: {
              marginTop: '35%',
            },
            scale: {
              sizeFactor: 1.2,
              mediaRules: [
                {
                  maxWidth: '650px',
                  sizeFactor: 1.6,
                },
              ],
            },
            scaleR: {
              values: '0:10000:200',
              aperture: 130,
              center: {
                borderColor: '#23211E',
                borderWidth: '2px',
                mediaRules: [
                  {
                    maxWidth: '650px',
                    size: '10px',
                  },
                ],
                size: '20px',
              },
              guide: {
                alpha: 1,
                backgroundColor: '#E3DEDA',
              },
              item: {
                offsetR: 0,
              },
              markers: [
                {
                  type: 'area',
                  alpha: 0.95,
                  backgroundColor: '#FB301E',
                  range: 25,
                },
              ],
              ring: {
                backgroundColor: '#E3DEDA',
                mediaRules: [
                  {
                    maxWidth: '650px',
                    visible: false,
                  },
                ],
              },
              tick: {
                visible: false,
              },
            },
            tooltip: {
              visible: false,
            },
            mediaRules: [
              {
                maxWidth: '650px',
                width: '100%',
                height: '20%',
                x: '0px',
                y: '40%',
              },
              {
                minWidth: '651px',
                width: '31.5%',
                height: '50%',
                x: '69%',
                y: '0px',
              },
            ],
            series: [
              {
                values: [28],
                valueBox: {
                  text: '%v',
                  fontColor: '#FB301E',
                  fontSize: '14px',
                  mediaRules: [
                    {
                      fontSize: '10px',
                      maxWidth: '650px',
                    },
                  ],
                  placement: 'center',
                },
                backgroundColor: '#23211E',
              },
            ],
          },
          {
            type: 'line',
            width: '100%',
            height: '55%',
            x: '0px',
            y: '45%',
            title: {
              text: 'Historial de consumo en tiempo real',
              adjustLayout: true,
              mediaRules: [
                {
                  fontSize: '14px',
                  maxWidth: '650px',
                },
              ],
            },
            plot: {
              tooltip: {
                visible: false,
              },
            },
            plotarea: {
              margin: 'dynamic',
              marginRight: '4%',
            },
            scaleX: {
              minValue: Date.now(),
              step: 3000,
              transform: {
                type: 'date',
                all: '%D<br>%H:%i:%s',
              },
            },
            scaleY: {
              values: '0:10000:200',
              item: {
                bold: true,
                fontColor: '#FB301E',
              },
              lineColor: '#FB301E',
              placement: 'default',
              tick: {
                lineColor: '#FB301E',
              },
            },
            scaleY2: {
              values: '0:500:100',
              item: {
                bold: true,
                fontColor: '#E2D51A',
              },
              lineColor: '#E2D51A',
              placement: 'default',
              tick: {
                lineColor: '#E2D51A',
              },
            },
            scaleY3: {
              values: '0:60:10',
              item: {
                bold: true,
                fontColor: '#00AE4D',
              },
              lineColor: '#00AE4D',
              placement: 'default',
              tick: {
                lineColor: '#00AE4D',
              },
            },
            crosshairX: {
              lineColor: '#23211E',
              plotLabel: {
                backgroundColor: '#f0ece8',
                borderColor: '#000',
                borderWidth: '1px',
                fontColor: '#414042',
              },
              scaleLabel: {
                backgroundColor: '#E3DEDA',
                fontColor: '#414042',
              },
            },
            mediaRules: [
              {
                maxWidth: '650px',
                width: '100%',
                height: '40%%',
                x: '0px',
                y: '60%',
              },
            ],
            series: [
              {
                text: 'Corriente',
                values: [0],
                lineColor: '#00AE4D',
                marker: {
                  type: 'circle',
                  backgroundColor: '#fff',
                  borderColor: '#00AE4D',
                  borderWidth: '2px',
                },
                scales: 'scale-x, scale-y-3',
              },
              {
                text: 'Potencia',
                values: [0],
                lineColor: '#E2D51A',
                marker: {
                  type: 'triangle',
                  backgroundColor: '#fff',
                  borderColor: '#E2D51A',
                  borderWidth: '2px',
                  size: '5px',
                },
                scales: 'scale-x, scale-y-2',
              },
              {
                text: 'Voltaje',
                values: [0],
                lineColor: '#FB301E',
                marker: {
                  type: 'square',
                  backgroundColor: '#fff',
                  borderColor: '#FB301E',
                  borderWidth: '2px',
                },
                scales: 'scale-x, scale-y',
              },
            ],
          },
        ],
      };
      
      zingchart.render({
        id: 'myChart',
        data: chartConfig,
        height: '100%',
        width: '100%',
      });
      
      /*
       * SetInterval is used to simulate live input. We also have
       * a feed attribute that takes in http requests, websockets,
       * and return value from a JS function.
       */

      dt.ref("devices").on('value', (snapshot) => {

        let power = 0
        let current = 0
        let voltage = 0
        let ctx = 0
        let children = snapshot.numChildren()

        snapshot.forEach(element => {

            let d = element.key

            if(d != "Location"){
              
              let d1 = 0
        
            dt.ref("devices").child(d).get().then((shot) => {

                current = current+shot.val().current_data.ampere
                power = power+shot.val().current_data.watts
                voltage = voltage+shot.val().current_data.voltage
                ctx++

                if(children == ctx){

                    let colors = ['#00AE4D', '#E2D51A', '#FB301E'];
                    let Marker = (bgColor, ceiling) => {
                      return {
                        type: 'area',
                        range: [0, ceiling],
                        backgroundColor: bgColor,
                        alpha: 0.95,
                      };
                    };
                   
                    let output0 = current
                    let output1 = power
                    let output2 = voltage
            
                    // 1) update gauge values
                    zingchart.exec('myChart', 'appendseriesdata', {
                        graphid: 0,
                        plotindex: 0,
                        update: false,
                        data: {
                          values: [output0],
                        },
                      });
                      zingchart.exec('myChart', 'appendseriesdata', {
                        graphid: 1,
                        plotindex: 0,
                        update: false,
                        data: {
                          values: [output1],
                        },
                      });
                      zingchart.exec('myChart', 'appendseriesdata', {
                        graphid: 2,
                        plotindex: 0,
                        update: false,
                        data: {
                          values: [output2],
                        },
                      });
                    
                      // 2) update guage markers
                      zingchart.exec('myChart', 'modify', {
                        graphid: 0,
                        update: false,
                        data: {
                          scaleR: {
                            markers: [Marker(colors[0], output0)],
                          },
                        },
                      });
                      zingchart.exec('myChart', 'modify', {
                        graphid: 1,
                        update: false,
                        data: {
                          scaleR: {
                            markers: [Marker(colors[1], output1)],
                          },
                        },
                      });
                      zingchart.exec('myChart', 'modify', {
                        graphid: 2,
                        update: false,
                        data: {
                          scaleR: {
                            markers: [Marker(colors[2], output2)],
                          },
                        },
                      });
                    
                      // 3) update line graph
                      zingchart.exec('myChart', 'appendseriesvalues', {
                        graphid: 3,
                        update: false,
                        values: [[output0], [output1], [output2]],
                      });
                    
                      // batch update all chart modifications
                      zingchart.exec('myChart', 'update');
                      
                }
             
             });

            }

        });
      })

     
}

