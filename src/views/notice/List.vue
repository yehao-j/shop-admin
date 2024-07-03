<template>
    <el-card shadow="never" class="!border-0">
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
            <el-tooltip effect="dark" content="刷新数据" placement="top">
                <el-button text @click="getData">
                    <el-icon :size="20"><Refresh /></el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table
            :data="tableData"
            v-loading="loading"
            stripe
            style="width: 100%"
        >
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="发布时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)" text
                        >修改</el-button
                    >
                    <el-popconfirm
                        title="是否要删除该公告？"
                        confirm-button-text="确认"
                        cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.id)"
                    >
                        <template #reference>
                            <el-button
                                type="primary"
                                size="small"
                                @click=""
                                text
                                >删除</el-button
                            >
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex items-center justify-center mt-5">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                :page-size="10"
                @current-change="getData"
            />
        </div>

        <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
            <el-form
                :model="form"
                ref="formRef"
                :rules="rules"
                label-width="80px"
                :inline="false"
            >
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import { getNoticeList, createNotice, deleteNotice, updateNotice } from "@/api/notice";
import { ref, reactive, computed } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import { toast } from "@/composables/util";

const currentPage = ref(1);
const total = ref(0);
const loading = ref(false);
const formDrawerRef = ref(null);
const formRef = ref(null);
const editId = ref(0)
const drawerTitle = computed(() => editId.value > 0 ? "修改" : "新增")

const form = reactive({
    title: "",
    content: "",
});

const rules = {
    title: [
        {
            required: true,
            message: "公告标题不能为空",
            trigger: "blur",
        },
    ],
    content: [
        {
            required: true,
            message: "公告内容不能为空",
            trigger: "blur",
        },
    ],
};

const tableData = ref([]);

function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p;
    }

    loading.value = true;
    getNoticeList(currentPage.value)
        .then((res) => {
            tableData.value = res.list;
            total.value = res.totalCount;
        })
        .finally(() => {
            loading.value = false;
        });
}

getData();

const handleDelete = (id) => {
    loading.value = true

    deleteNotice(id)
    .then(res => {
        toast('删除成功')

        getData()
    })
    .finally(() => {
        loading.value = false
    })
};

const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return;
        }

        formDrawerRef.value.showLoading()

        const func =
            editId.value == 0
                ? createNotice(form)
                : updateNotice(editId.value, form);

        func.then((res) => {
            toast(drawerTitle.value + "成功");
            getData(editId.value ? null : 1);

            formDrawerRef.value.close();
        }).finally(() => {
            formDrawerRef.value.hideLoading();
        });
    });
};

// 重置表单
function resetForm(row) {
    if (formRef.value) {
        formRef.value.clearValidate()
    }

    if (row) {
        for (const key in form) {
            form[key] = row[key]
        }
    }
}

const handleEdit = (row) => {
    editId.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
}

const handleCreate = () => {
    editId.value = 0
    resetForm({
        title: "",
        content: ""
    })
    formDrawerRef.value.open()
}
</script>
