<template>
    <div class="f-menu">
        <el-menu unique-opened :collapse-transition="false" :default-active="defaultActive" class="main-menu" :collapse="$store.state.isCollapse" @select="handleSelect">
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon><component :is="item.icon"></component></el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        {{ item2.name }}
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :index="item.frontpath">
                    <el-icon><component :is="item.icon"></component></el-icon>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

const router = useRouter()
const route = useRoute()
const store = useStore();

const defaultActive = computed(() => route.path)

const asideMenus = computed(() => store.state.menus)

const handleSelect = (e) => {
    router.push(e)
}

</script>

<style>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0px;
    left: 0px;
    overflow: auto;
    @apply shadow-md fixed bg-light-50;
}

/* 隐藏菜单栏滚动条 */
.f-menu::-webkit-scrollbar {
    width: 0px;
}

/* 即使设置了5，但是也不生效，但是菜单栏右侧的border却可以去掉 */
.main-menu {
    border: none !important;
}
</style>
