<template>
    <el-card shadow="never" class="mt-5 !border-0">
        <template #header>
            <div class="flex justify-between">
                <span>订单统计</span>
                <div>
                    <el-check-tag
                        class="ml-2"
                        v-for="(item, index) in options"
                        :key="index"
                        :checked="current === item.value"
                        @click="handleChoose(item.value)"
                        >{{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <div ref="el" id="chart" style="width: 100%; height: 300px"></div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getstatistics3 } from "@/api";
import { useResizeObserver } from "@vueuse/core";

const current = ref("week");

const options = [
    {
        text: "近一个月",
        value: "month",
    },
    {
        text: "近一周",
        value: "week",
    },
    {
        text: "近24小时",
        value: "hour",
    },
];

async function handleChoose(value) {
    current.value = value;

    loadChartData();
}

async function loadChartData() {
    myChart.showLoading();
    let option = await getData();
    myChart.hideLoading();
    myChart.setOption(option);
}

async function getData() {
    let option = {
        title: {
            text: "订单统计",
        },
        tooltip: {},
        xAxis: {
            data: [],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [],
            },
        ],
    };

    let res = await getstatistics3(current.value);

    option.xAxis.data = res.x;
    option.series[0].data = res.y;

    return option;
}

var myChart = null;

onMounted(async () => {
    let chartDom = document.getElementById("chart");
    if (chartDom) {
        myChart = echarts.init(chartDom);
        loadChartData();
    }
});

/// 据说打包之后，当前页面已经销毁，但是没有调用这个dispose方法，那么重新打开这个页面的时候，就会出现白屏
onBeforeUnmount(() => {
    if (myChart) {
        echarts.dispose(myChart);
    }
});

const el = ref(null);
useResizeObserver(el, (entries) => {
    if (myChart) {
        myChart.resize();
    }
});
</script>
