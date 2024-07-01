<template>
    <div>
        <el-container>
            <el-header>
                <f-header />
            </el-header>
            <el-container>
                <el-aside :width="$store.state.isCollapse ? '64px' : '164px'"
                    ><f-menu
                /></el-aside>
                <el-main>
                    <f-taglist />
                    <router-view v-slot="{ Component }">
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </router-view>
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

<style></style>
