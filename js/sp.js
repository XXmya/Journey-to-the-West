var lis = document.getElementsByTagName("li");
console.log(lis.length)
var names = new Array();
for(var i = 0; i < lis.length; i++)
{
    names[i] = lis[i].id;
}

var datavalues = [
    [20,70,40,5,30],
    [20,80,50,30,60],
    [20,60,20,60,60],
    [20,80,80,60,70],
    [20,80,60,20,60],
    [20,70,50,20,60],
    [20,65,60,25,65],
    [40,90,70,70,80],
    [50,30,30,20,50],
    [20,40,20,50,50],
    [80,60,40,30,70],
    [20,95,85,40,80],
    [30,70,40,120,80],
    [60,80,60,70,90],
    [40,70,50,75,70],
    [40.80,80,70,80],
    [40,90,70,30,85],
    [20,50,20,60,50],
    [30,70,30,10,60],
    [20,60,20,70,60],
    [20,80,40,30,70],
    [20,90,90,70,90],
    [20,80,40,40,60],
    [20,60,30,30,60],
    [20,65,45,95,70],
    [20,60,40,30,95],
    [60,95,95,30,90],
    [70,70,40,25,80],
    [25,55,35,95,95]
]


function draw(num)
{
    var myChart = echarts.init(lis[num], 'macarons');
    var option = {
        //title:{text:names[num]},
        color:['#C00000'],
        legend:{position:'bottom', bottom: 0},
        tooltip:{trigger:'axis'},
        radar:[
            {
                indicator:[
                    {text:'水战', max:100},
                    {text:'陆战', max:100},
                    {text:'空战', max:100},
                    {text:'颜值', max:100},
                    {text:'智慧', max:100},
                ],
            }
        ],
        series:[
            {
                type:'radar',
                tooltip:{
                    trigger:'item',
                },
                itemStyle:{normal:{areaStyle:{
                    color:"rgba(225,0,0,0.7)",
                    shadowColor:'rgba(0,0,0,0.94)',
                    shadowBlur: 6
                    }}},
                data:[
                    {
                        name:names[i],
                        value:datavalues[i]
                    }
                ]
            }
        ]
    }
    myChart.setOption(option);
}

for(var i = 0; i < lis.length; i++)
{
    draw(i)
}