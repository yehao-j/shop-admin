<template>
    <div
        class="f-tag-list"
        :style="{ left: $store.state.isCollapse ? '64px' : '164px' }"
    >
        <el-tabs
            v-model="activeTab"
            type="card"
            class="demo-tabs"
            @tab-change="changeTab"
            @tab-remove="removeTab"
        >
            <template #add-icon>
                <el-icon><Select /></el-icon>
            </template>
            <el-tab-pane
                v-for="item in tabList"
                :key="item.path"
                :label="item.title"
                :name="item.path"
                :closable="item.path != '/'"
            >
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <!-- 占位的 -->
    <div style="height: 44px"></div>
</template>

<script setup>
import { ref } from "vue";
import { Select } from "@element-plus/icons-vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import Cookies from "js-cookie";
import { router } from "@/router";

const route = useRoute();

function initTabList() {
    let str = Cookies.get("tabList");
    if (str && str.length > 0) {
        let tabs = JSON.parse(str);
        if (tabs) {
            return tabs;
        }
    }

    return [
        {
            title: "后台首页",
            path: "/",
        },
    ];
}

const activeTab = ref(route.path);

const tabList = ref(initTabList());

function addTag(tab) {
    let notTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
    if (notTab) {
        tabList.value.push(tab);
    }

    Cookies.set("tabList", JSON.stringify(tabList.value));
}

onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path;

    addTag({
        title: to.meta.title,
        path: to.path,
    });
});

function changeTab(t) {
    activeTab.value = t;
    router.push(t);
}

function removeTab(t) {
    let tabs = tabList.value;
    let a = activeTab.value;
    if (t == a) {
        tabs.forEach((tab, index) => {
            if (tab.path == t) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    a = nextTab.path;
                }
            }
        });

        changeTab(a)
    }

    tabList.value = tabList.value.filter((tab) => tab.path != t);
    Cookies.set("tabList", JSON.stringify(tabList.value));
}

function handleClose(c) {
    if (c == "clearAll") {
        tabList.value = tabList.value.filter(tab => tab.path == '/')
        changeTab('/')
    } else {
        tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
    }

    Cookies.set("tabList", JSON.stringify(tabList.value));
}

</script>

<style>
.f-tag-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0px;
    height: 44px;
    z-index: 100;
}

.demo-tabs {
    min-width: 100px;
}

.tag-btn {
    @apply bg-white rounded flex items-center justify-center;
    height: 32px;
    width: 40px;
    margin-left: auto;
}

.el-tabs__header {
    margin-bottom: 0px;
    border: 0px !important;
    @apply flex items-center;
}

.el-tabs__nav {
    border: 0 !important;
}

.el-tabs__nav-next,
.el-tabs__nav-prev {
    line-height: 32px;
    height: 32px;
}

.el-tabs__item {
    border: 0px !important;
    @apply bg-white mx-1;
    height: 32px;
}

.is-disabled {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>
