<template>
    <el-main class="image-main" v-loading="loading">
        <div class="top p-3">
            <el-row :gutter="10">
                <el-col
                    :span="6"
                    :offset="0"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <el-card
                        shadow="hover"
                        class="relative mb-3"
                        :body-style="{ padding: 0 }"
                    >
                        <el-image
                            class="w-full h-[150px]"
                            :src="item.url"
                            fit="cover"
                            :lazy="true"
                            :preview-src-list="[item.url]"
                            :initial-index="0"
                        />
                        <div class="image-title">{{ item.name }}</div>
                        <div class="flex items-center justify-center p-2">
                            <el-button
                                type="primary"
                                size="small"
                                @click="handleEdit(item)"
                                text
                                >重命名</el-button
                            >
                            <el-popconfirm
                                title="是否要删除该图片？"
                                confirm-button-text="确认"
                                cancel-button-text="取消"
                                @confirm="handleDelete(item.id)"
                            >
                                <template #reference>
                                    <el-button type="primary" size="small" text
                                        >删除</el-button
                                    >
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                :page-size="10"
                @current-change="getData"
            />
        </div>
    </el-main>

    <el-drawer v-model="drawer" title="上传图片">
        <UploadFile :data="{ 'image_class_id': imageClassId }" @success="handleUploadSuccess"/>
    </el-drawer>
</template>

<script setup>
import { deleteImage, getImageList, updateImage } from "@/api/image";
import { showPrompt, toast } from "@/composables/util";
import UploadFile from "@/components/UploadFile.vue";
import { ref } from "vue";

const currentPage = ref(1);
const total = ref(0);
const list = ref([]);
const loading = ref(false);
const imageClassId = ref(0);

// 上传图片
const drawer = ref(false)
const openUploadFile = () => drawer.value = true

function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p;
    }

    loading.value = true;
    getImageList(imageClassId.value, currentPage.value)
        .then((res) => {
            total.value = res.totalCount;
            list.value = res.list;
        })
        .finally(() => {
            loading.value = false;
        });
}

function handleUploadSuccess() {
     toast('图片上传成功')
     getData(1)
}

const handleEdit = (item) => {
    showPrompt("重命名", item.name).then(({ value }) => {
        loading.value = true;
        updateImage(item.id, value)
            .then((res) => {
                toast("修改成功");
                getData();
            })
            .finally(() => {
                loading.value = false;
            });
    });
};

const loadData = (id) => {
    currentPage.value = 1;
    imageClassId.value = id;
    getData();
};

const handleDelete = (id) => {
    loading.value = true;
    deleteImage([id])
        .then((res) => {
            toast("删除成功");
            getData();
        })
        .finally(() => {
            loading.value = false;
        });
};

defineExpose({
    loadData,
    openUploadFile,
});
</script>

<style>
.image-main {
    position: relative;
}

.image-main .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-main .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @apply flex justify-center items-center;
}

.image-title {
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
