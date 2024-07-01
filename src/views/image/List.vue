<template>
    <el-container class="bg-white rounded mt-0" :style="{ height: h + 'px' }">
        <el-header class="image-header">
            <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
            <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
        </el-header>
        <el-container>
            <ImageAside ref="imageAsideRef" @change="handleAsideChange"/>
            <ImageMain ref="imageMainRef"/>
        </el-container>
    </el-container>
</template>

<script setup>
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue';
import { ref } from 'vue';

const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;

const imageAsideRef = ref(null)
const imageMainRef = ref(null)
const handleOpenCreate = () => imageAsideRef.value.handleCreate()

const handleAsideChange = (id) => {
    imageMainRef.value.loadData(id)
}

const handleOpenUpload = () => {
    imageMainRef.value.openUploadFile()
}

</script>

<style>
.image-header {
    border-bottom: 1px solid #eeeeee; 
    @apply flex items-center;
}

.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.image-main {
    position: relative;
}

.image-aside .top, .image-main .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

 
</style>
