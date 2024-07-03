<template>
    <el-aside class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList
                :isActive="activeId == item.id"
                v-for="(item, index) in list"
                :key="index"
                @edit="handleEdit(item)"
                @click="handleChangeActiveId(item.id)"
                @delete="handleDelete(item)"
                >{{ item.name }}</AsideList
            >
        </div>
        <div class="bottom">
            <el-pagination
                background
                layout="prev, next"
                :total="total"
                :current-page="currentPage"
                :page-size="10"
                @current-change="getData"
            />
        </div>
    </el-aside>

    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
        <el-form
            :model="form"
            ref="formRef"
            :rules="rules"
            label-width="80px"
            :inline="false"
        >
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import {
    createImageClass,
    deleteImageClass,
    getImageClassList,
    updateImageClass,
} from "@/api/image";
import AsideList from "@/components/AsideList.vue";
import { computed, reactive, ref } from "vue";
import FormDrawer from "./FormDrawer.vue";
import { toast } from "@/composables/util";

// 加载动画
const loading = ref(false);
const activeId = ref(0);
const list = ref([]);

const currentPage = ref(1);
const total = ref(0);
const editId = ref(0);
const drawerTitle = computed(() => (editId.value == 0 ? "新增" : "修改"));

const form = reactive({
    name: "",
    order: 50,
});

const rules = {
    name: [
        {
            required: true,
            message: "图库分类名称不能为空",
            trigger: "blur",
        },
    ],
};

const formRef = ref(null);

function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p;
    }

    loading.value = true;
    getImageClassList(currentPage.value)
        .then((res) => {
            total.value = res.totalCount;
            list.value = res.list
            if (res.list.length > 0) {
                handleChangeActiveId(res.list[0].id);
            }
        })
        .finally(() => {
            loading.value = false;
        });
}

getData();

const formDrawerRef = ref(null);
const handleCreate = () => {
    editId.value = 0;
    form.name = "";
    form.order = 50;
    formDrawerRef.value.open();
};
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return;
        }

        formDrawerRef.value.showLoading();

        const func =
            editId.value == 0
                ? createImageClass(form)
                : updateImageClass(editId.value, form);

        func.then((res) => {
            toast(drawerTitle.value + "成功");
            getData(editId.value ? currentPage.value : 1);

            formDrawerRef.value.close();
        }).finally(() => {
            formDrawerRef.value.hideLoading();
        });
    });
};

const handleEdit = (item) => {
    form.name = item.name;
    form.order = item.order;
    editId.value = item.id;

    formDrawerRef.value.open();
};

const handleDelete = (item) => {
    loading.value = true;

    deleteImageClass(item.id)
        .then((res) => {
            toast("删除成功");

            getData();
        })
        .finally(() => {
            loading.value = false;
        });
};

const emit = defineEmits(["change"])

function handleChangeActiveId(id) {
    activeId.value = id;
    emit('change', id)
}

defineExpose({
    handleCreate,
});
</script>

<style>
.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
    width: 200px;
}

.image-aside .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @apply flex justify-center items-center;
}
</style>
