$(function () {
    getDiagramData();
    getPieAndHistogramData();

    $('#headTitle button').click(function() {
        let current = $(this).attr('data-id')-1;
        $('#headTitle button span').removeClass('active-line');
        $('#headTitle button span:eq('+current+')').addClass('active-line');
    })
});

function getDiagramData() {
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : "https://edu.telking.com/api/",
        data : {
            type:"month"
        },
        success : (res) => {
            if(res.code === 200){
                drawDiagram(res.data.xAxis,res.data.series)
            }else {
                alert("异常")
            }
        },
        error : (e) => {
            alert("异常")
        }
    })
}

function getPieAndHistogramData() {
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : "https://edu.telking.com/api/",
        data : {
            type:"week"
        },
        success : (res) => {
            if(res.code === 200){
                let temp = [];
                res.data.xAxis.map(v => {
                    temp.push({name:v})
                });
                res.data.series.map((k,i) => {
                    temp[i].value = k
                });
                drawPie(temp);
                drawHistogram(res.data.xAxis,res.data.series);
            }else {
                alert("异常")
            }
        },
        error : (e) => {
            alert("异常")
        }
    })
}

function drawDiagram(xAxis,series){
    let myChart = echarts.init(document.getElementById('diagram'));
    let option = {
        title: {
            text: '曲线图数据展示',
            left:"center"
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: xAxis || [],
            axisLine: {
                show:false,
            },
            axisTick:{
                show:false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show:false,
            },
            axisTick:{
                show:false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#cccccc'],
                    type: 'dashed'
                }
            },
        },
        series: [
            {
                name: "越界数",
                data: series || [],
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: "#FBC42B"
                },
                itemStyle: {
                    normal: {
                        color: "#FBC42B",
                        lineStyle: {
                            color: '#4587f0'
                        }
                    }
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                        offset: 0,
                        color: '#f3f6fe'
                    }, {
                        offset: 1,
                        color: '#f3f6fe'
                    }])
                }
            }
        ]
    };
    myChart.setOption(option);
}

function drawPie(array) {
    let pieChart = echarts.init(document.getElementById('pieChart'));
    let pieOption = {
        title: {
            text: '饼状图数据展示',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '日期占比',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: array || [],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    pieChart.setOption(pieOption);
}

function drawHistogram(xAxis,series){
    let histogram = echarts.init(document.getElementById('histogram'));
    let histogramOption = {
        title: {
            text: '柱状图数据展示',
            left: 'center'
        },
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis || [],
                axisTick: {
                    show:false,
                    alignWithLabel: true
                },
                axisLine: {
                    show:false,
                },
            }
        ],
        yAxis: [
            {
                name:"商品数",
                nameTextStyle:{
                    color:"#000000",
                    fontWeight:"bold"
                },
                type: 'value',
                axisLine: {
                    show:false,
                },
                axisTick:{
                    show:false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#cccccc'],
                        type: 'dashed'
                    }
                },
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '40%',
                data: series || []
            }
        ]
    };
    histogram.setOption(histogramOption);
}

