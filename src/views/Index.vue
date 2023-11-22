<template>
    <div style="padding: 10px">
        <el-card>
            <div ref="myChart" style="height: 85vh"></div>
        </el-card>
    </div>
</template>

<script>
import request from "@/utils/request";
import {bookCount} from "@/api/book";

export default {
    name: "Index",
    data() {
        return {}
    },
    mounted () {
        this.getBookData();
    },
    methods: {
        getBookData() {
            bookCount().then(res => {
                if (res.code == 200) {
                    var datas = []
                    res.data.forEach(item => {
                        datas.push({name: item.category, value: item.count})
                    })
                    // console.log(datas)
                    this.drawEcharts(datas)
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                }
            })
        },
        drawEcharts(datas) {
            // console.log("123123")
            // console.log(this)
            // console.log(this.$root)
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(this.$refs.myChart)
            let option = {
                title: {
                    text: '图书类别比例统计图',
                    // subtext: '',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    trigger: 'item',
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                series: [
                    {
                        name: '数量',
                        type: 'pie',
                        radius: [50, 250],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: datas
                    }
                ]
            }
            // 绘制图表
            myChart.setOption(option);
        }
    }
}
</script>

<style scoped>

</style>
