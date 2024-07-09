<template>
    <el-card shadow="never" class="!border-0">
        <ListHeader @create="handleCreate" @refresh="getData" />

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
                    <el-button
                        type="primary"
                        size="small"
                        @click="handleEdit(scope.row)"
                        text
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

        <FormDrawer
            :title="drawerTitle"
            ref="formDrawerRef"
            @submit="handleSubmit"
        >
            <el-form
                :model="form"
                ref="formRef"
                :rules="rules"
                label-width="80px"
                :inline="false"
            >
                <el-form-item label="公告标题" prop="title">
                    <el-input
                        v-model="form.title"
                        placeholder="公告标题"
                    ></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input
                        v-model="form.content"
                        placeholder="公告内容"
                        type="textarea"
                        :rows="5"
                    ></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import {
    getNoticeList,
    createNotice,
    deleteNotice,
    updateNotice,
} from "@/api/notice";
import FormDrawer from "@/components/FormDrawer.vue";
import ListHeader from "@/components/ListHeader.vue";
import { useInitTable, useInitForm } from "@/composables/useCommon";

const { tableData, loading, currentPage, total, getData } = useInitTable({
    getList: getNoticeList,
});

const {
    formDrawerRef,
    formRef,
    drawerTitle,
    form,
    handleSubmit,
    handleEdit,
    handleCreate,
} = useInitForm({
    getData,
    update: updateNotice,
    create: createNotice,
    form: {
        title: "",
        content: "",
    },
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

const handleDelete = (id) => {
    loading.value = true;

    deleteNotice(id)
        .then((res) => {
            toast("删除成功");

            getData();
        })
        .finally(() => {
            loading.value = false;
        });
};
</script>
