<template>
    <div class="aside-list" :class="{ active: isActive }">
        <span class="truncate"><slot /></span>
        <el-button
            class="ml-auto px-0"
            text
            type="primary"
            size="small"
            @click.stop="$emit('edit')"
        >
            <el-icon :size="16"><Edit /></el-icon>
        </el-button>
        <span @click.stop="() => {}">
            <el-popconfirm
                title="是否要删除该分类？"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="$emit('delete')"
            >
                <template #reference>
                    <el-button
                        class="!ml-0 !mr-1"
                        text
                        type="primary"
                        size="small"
                    >
                        <el-icon :size="16"><Close /></el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
        </span>
    </div>
</template>

<script setup>
defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["edit", "delete"]);
</script>

<style>
.aside-list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center pb-3 pt-3 pl-3 text-sm text-gray-600;
}

.aside-list:hover,
.active {
    @apply bg-blue-50;
}
</style>
