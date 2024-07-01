<template>
    <el-drawer
        v-model="showDrawer"
        :close-on-click-modal="false"
        :size="size"
        :title="title"
        :destroy-on-close="destroyOnClose"
    >
        <div class="formDrawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="actions">
                <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from "vue";

const showDrawer = ref(false);

const open = () => (showDrawer.value = true);
const close = () => (showDrawer.value = false);
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

const submit = () => emit('submit')

const loading = ref(false)

// 向父组件暴露以下方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
});

const emit = defineEmits(["submit"])

const props = defineProps({
    title: String,
    size: {
        type: String,
        default: '45%'
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type: String,
        default: '提交'
    },
})

</script>

<style>
.formDrawer {
    width: 100%;
    height: 100%;
    @apply flex flex-col;
}

.body {
    flex: auto;
    overflow-y: auto;
}

.formDrawer .actions {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>
