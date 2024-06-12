<template>
    <div>
        <el-container>
            <el-header>
                <f-header />
            </el-header>
            <el-container>
                <el-aside><f-menu /></el-aside>
                <el-main>
                    <f-taglist />
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FTaglist from "./components/FTaglist.vue";
import FMenu from "./components/FMenu.vue";
</script>
