<template>
    <div>
        <el-container>
            <el-header>
                <f-header />
            </el-header>
            <el-container>
                <el-aside :width="$store.state.isCollapse ? '64px' : '164px'"><f-menu /></el-aside>
                <el-main>
                    <f-taglist />
                    <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <keep-alive :max="10">
                                <component :is="Component"></component>
                            </keep-alive>
                        </transition>
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

<style>
.el-aside {
    transition: all 0.15s;
}

.fade_enter_from {
    opacity: 0;
}

.fade_enter_to {
    opacity: 1;
}

.fade_leave_from {
    opacity: 1;
}

.fade_leave_to {
    opacity: 0;
}

.fade_enter_active, .fade_leave_active {
    transition: all 1s;
}

</style>