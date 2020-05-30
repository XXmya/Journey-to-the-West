var dom = document.getElementById("map");
var myChart = echarts.init(dom, 'macarons');
var app = {};
option = null;
var data = [
    {name: '长安', value:0},
    {name:'巩州城', value:0},
    {name:'河州卫', value:0},
    {name:"双叉岭", value:3},
    {name:"两界山", value:0},
    {name:"西番哈密国", value:3},
    {name:"乌斯藏", value:1},
    {name:"西牛贺洲", value:1},
    {name:"宝象国", value:4},
    {name:"乌鸡国", value:3},
    {name:"车迟国", value:5},
    {name:"女儿国", value:5},
    {name:"祭赛国", value:13},
    {name:"朱紫国", value:10},
    {name:"狮驼国", value:3},
    {name:"比丘国", value:3},
    {name:"灭法国", value:1},
    {name:"玉华府界", value:1},
    {name:"金平府界", value:3},
    {name:"天竺国界", value:1}
];
var geoCoordMap = {
    '长安':[108.94,34.38],
    '巩州城':[105.69,34.54],
    '河州卫':[103.14,35.57],
    "双叉岭":[102.87,37.49],
    "两界山":[100.524824,38.977855],
    "西番哈密国":[93.51, 42.85],
    "乌斯藏":[89.13, 42.98],
    "西牛贺洲":[87.63,43.86],
    "宝象国":[87.201282,43.953842],
    "乌鸡国":[86.56,42.07],
    "车迟国":[86.089684,42.267932],
    "女儿国":[80.311782,41.152001],
    "祭赛国":[75.2789,42.823485],
    "朱紫国":[69.31292,41.361263],
    "狮驼国":[73.067432,33.690428],
    "比丘国":[74.314039,31.572328],
    "灭法国":[81.948232,27.149303],
    "玉华府界":[81.948232,27.149303],
    "金平府界":[84.515767,26.814138],
    "天竺国界":[85.459473,25.12406]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};

myChart.on('click', function(params){
    var geoCoord = geoCoordMap[params.name];
    if(geoCoord)
    {
        window.location.href = "species.html#"+params.name;
    }
});

var linedata = function(data){
    let res2 = [];
    for(var i = 0; i < data.length-1; i++)
    {
        var from = geoCoordMap[data[i].name];
        var to = geoCoordMap[data[i+1].name];
        if(from&&to)
        {
            res2.push(
                {
                fromName: data[i].name,
                toName: data[i+1].name,
                coords: [from, to]
                }
            )
        }
    }
    console.log(res2);
    return res2;
}

linedatas = linedata(data);
option = {
    title: {
        text: '',
        left: 'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: function (params) {
            var color = params.color;//图例颜色
            var htmlStr ='<div>';
            htmlStr += params.name + "<hr>"+"主要妖怪数量: "+ params.data.value[2]+'<br/>';//x轴的名称
            //为了保证和原来的效果一样，这里自己实现了一个点的效果
            htmlStr += '<span ></span>';
            
            //添加一个汉字，这里你可以格式你的数字或者自定义文本内容
            htmlStr += params.seriesName;
            
            htmlStr += '</div>';
            
            return htmlStr;}
    },
    bmap: {
        center: [90.964129, 36.550339],
        zoom: 5,
        roam: true,
         mapStyle: {
             styleJson: [{
                 'featureType': 'water',
                 'elementType': 'all',
                 'stylers': {
                     'color': '#780000'
                 }

             },
             {
                 'featureType': 'land',
                 'elementType': 'all',
                 'stylers': {
                     'color': '#F3F0E6'
                 }
             }, 
              {
                 'featureType': 'railway',
                 'elementType': 'all',
                 'stylers': {
                     'visibility': 'off'
                 }
             }, {
                 'featureType': 'highway',
                 'elementType': 'all',
                 'stylers': {
                     'visibility': 'off'
                 }
             }, {
                 'featureType': 'highway',
                 'elementType': 'labels',
                 'stylers': {
                     'visibility': 'off'
                 }
             }, {
                 'featureType': 'arterial',
                 'elementType': 'geometry',
             }, {
                 'featureType': 'arterial',
                 'elementType': 'geometry.fill',
             }, {
                 'featureType': 'poi',
                 'elementType': 'all',
                 'stylers': {
                     'visibility': 'off'
                 }
             }, {
                 'featureType': 'green',
                 'elementType': 'all',
                 'stylers': {
                     'visibility': 'off'
                 }
             }, {
                 'featureType': 'subway',
                 'elementType': 'all',
                 'stylers': {
                     'visibility': 'off'
                 }
             }, {
                 'featureType': 'manmade',
                 'elementType': 'all',
             }, {
                 'featureType': 'local',
                 'elementType': 'all',

             }, {
                 'featureType': 'arterial',
                 'elementType': 'labels',
             }, {
                 'featureType': 'boundary',
                 'elementType': 'all',
             }, {
                 'featureType': 'building',
                 'elementType': 'all',
             }, 
                {
                 'featureType': 'label',
                 'elementType': 'labels.text.fill',
                 'stylers': {
                     'color': '#1E0000',
                 }
             }]
         }
    },
    series : [
        {
            type: 'lines',
            coordinateSystem: 'bmap',
            data: linedatas,
            symbolSize: 0,
            lineStyle: {
                normal: {
                color: "#FFF065",
                    opacity: 1,
                    width: 2
                }

            },
            zlevel: 1
        },{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: linedatas,
            lineStyle: {
                    normal: {
                    color: "#003399",
                    width: 0
                }
            },
            effect: {
                constantSpeed: 20,
                show: true,
                trailLength: 0.1,
                symbolSize: 4
            },
            zlevel: 1
        },
        {
            name: '妖怪稀疏区',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] * 5+5;
            },
            color:"rgba(254,121,0,0.6)",
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {

                    show: true,
                    position:'top'
                }
            },
        },
        {
            name: '妖怪密集区',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function (val) {
                return val[2]*5+8;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            color:"rgba(60,0,0,0.6)",
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false,
                }
            },
            zlevel: 1
        },

    ]
};
    myChart.setOption(option);

    //有关物种的部分
    var specieschart = echarts.init(document.getElementById('species'), 'macarons');

    var colors = ['#c00000', '#000000', '#fbb612', '#126e82', '#207f4c'];
    var bgColor = '#e4dfd7';
    
    var itemStyle = {
        star5: {
            color: colors[0]
        },
        star4: {
            color: colors[1]
        },
        star3: {
            color: colors[2]
        },
        star2: {
            color: colors[3]
        }
    };
    
    var data1 = [{
        name: '雌性',
        itemStyle: {
            color: colors[0]
        },
        children: [{
            name: '植物',
            children: [{
                name: '杏',
                children:[
                {
                    name:''
                }
            ]
        }, {
                name: '梅',
                children:[{
                    name:''
                }]
            }, {
                    name: '桂',
                    children:[{
                        name:''
                    }]
            }]
        }, {
            name: '动物',
            children: [
                {
                    name: '哺乳类',
                    children: [{
                        name: '狐'
                        }, {
                        name: '兔',
                    }, {
                        name: '鼠',
                    }]
                }, {
                    name: '昆虫',
                    children: [{
                        name: '蝎',
                    }, {
                        name: '兔',
                    }, {
                        name: '蛛',
                    }]
                }]
            },{
            name: '其他',
            children: [{
                name: '骨',
                children:[{name:''}]
            }, {
                name: '仙',
                children:[{name:''}]
            }]
        }]
    }, {
        name: '雄性',
        itemStyle: {
            color: colors[1]
        },
        children: [{
            name: '植物',
            children: [{
                name: '松',
                children:[{
                    name:''
                }]
            }, {
                name: '柏',
                children:[{
                    name:''
                }]
            }, {
                name: '桧',
                children:[{
                    name:''
                }]
            }, {
                name: '竹',
                children:[{
                    name:''
                }]
            },{
                name: '枫',
                children:[{
                    name:''
                }]
            }]
            
        }, {
            name: '动物',
            children: [{
                name: '哺乳类',
                children: [{
                    name: '虎'
                }, {
                    name: '熊',
                }, {
                    name: '牛',
                },{
                    name: '狼',
                },{
                    name: '鼠',
                },{
                    name: '狐',
                }, {
                   name: '狮', 
                }, {
                    name: '鹿',
                }, {
                    name: '羊',
                }, {
                    name: '犀',
                },{
                    name: '猴',
                },{
                    name: '象',
                },{
                    name: '豹'
                }]
            }, {
                    name: '鸟类',
                    children: [{
                        name: '鸡'
                        }, {
                        name: '鸟',
                    }]
                }, {
                    name: '爬行类',
                    children: [{
                        name: '蛇'
                    }]
                },{
                    name: '鱼类',
                    children: [{
                        name: '鱼'
                        }, {
                        name: '仙',
                    }]
                },
                {
                    name: '昆虫',
                    children: [{
                        name: '蜈',
                    }]
                }]
            }, {
                name: '其他',
                children: [{
                    name: '犼',
                    children:[{name:''}]
                }, {
                    name: '鸟',
                    children:[{name:''}]
                }]
            }]
        }];
    


    for (var j = 0; j < data1.length; ++j) {
        var level1 = data1[j].children;
        for (var i = 0; i < level1.length; ++i) {
            var block = level1[i].children;
            var bookScore = [];
            var bookScoreId;
           for (var star = 0; star < block.length; ++star) {
                block[star].label = {
                    color: colors[star],
                    downplay: {
                        opacity: 0.5
                    }
                };
    
                if (block[star].children) {
                    style = {
                        opacity: 1,
                        color: colors[star]
                    };
                    block[star].children.forEach(function (book) {
                        book.value = 1;
                        book.itemStyle = style;
    
                        book.label = {
                            color: colors[star]
                        };
    
                        var value = 1;
                        if (bookScoreId === 0 || bookScoreId === 3) {
                            value = 5;
                        }
    
                        if (bookScore[bookScoreId]) {
                            bookScore[bookScoreId].value += value;
                        }
                        else {
                            bookScore[bookScoreId] = {
                                color: colors[bookScoreId],
                                value: value
                            };
                        }
                    });
                }
            }
    
            level1[i].itemStyle = {
                color: data1[j].itemStyle.color
            };
        }
    }

    var option1 = {
        backgroundColor: bgColor,
        color: colors,
        series: [{
            type: 'sunburst',
            center: ['50%', '48%'],
            data: data1,
            sort: function (a, b) {
                if (a.depth === 1) {
                    return b.getValue() - a.getValue();
                }
                else {
                    return a.dataIndex - b.dataIndex;
                }
            },
            label: {
                rotate: 'radial',
                color: bgColor
            },
            itemStyle: {
                borderColor: bgColor,
                borderWidth: 2
            },
            levels: [{}, {
                r0: 0,
                r: 64,
                label: {
                    rotate: 0
                }
            }, {
                r0: 64,
                r: 168
            }, {
                r0: 184,
                r: 224,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: colors[2],
                    color: 'transparent'
                },
                label: {
                    rotate: 'tangential',
                    fontSize: 10,
                    color: colors[0]
                }
            }, {
                r0: 224,
                r: 232,
                itemStyle: {
                    shadowBlur: 80,
                    shadowColor: colors[0]
                },
                label: {
                    position: 'outside',
                    textShadowBlur: 5,
                    textShadowColor: '#333',
                },
                downplay: {
                    label: {
                        opacity: 0.5
                    }
                }
            }]
        }]
    };

    specieschart.setOption(option1);
    //有关性别的部分
    var sexchart = echarts.init(document.getElementById('sex'), 'macarons');
    var option3 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
      title:{
        text:'',
        left:'center'
      },
      series:[
        {
          name:"性别分布",
          type:'pie',
          radius:'55%',
          data:[
            {value:45, name:"雄性"},
            {value:19, name:"雌性"}
          ]
        }
      ]
    };
    sexchart.setOption(option3);
       //有关大类的部分
     var sybchart = echarts.init(document.getElementById('specy'), 'macarons');
    var option4 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
      title:{
        text:'',
        left:'center'
      },
      series:[
        {
          name:"物种分布",
          type:'pie',
          radius:'55%',
          data:[
            {value:37, name:"动物"},
            {value:10, name:"植物"},
            {value:9, name:"昆虫"},
            {value:8, name:"其他"}
          ]
        }
      ]
    };
    sybchart.setOption(option4);