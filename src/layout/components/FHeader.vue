<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><Message /></el-icon>
            编程
        </span>

        <el-icon class="icon-btn"><Fold /></el-icon>
        <el-tooltip effect="dark" content="刷新" placement="top-start">
            <el-icon class="icon-btn" @click="handleRefresh"
                ><Refresh
            /></el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="top-start">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar
                        class="mr-2"
                        :size="25"
                        :src="$store.state.user.avatar"
                    />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword"
                            >修改密码</el-dropdown-item
                        >
                        <el-dropdown-item command="logout"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <el-drawer
        v-model="showDrawer"
        close-on-click-modal="false"
        size="45%"
        title="修改密码"
    >
        <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item prop="oldpassword" label="旧密码" label-width="80px">
                <el-input
                    v-model="form.oldpassword"
                    type="password"
                    placeholder="请输入旧密码"
                    show-password
                />
            </el-form-item>
            <el-form-item prop="password" label="新密码" label-width="80px">
                <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                />
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码" label-width="80px">
                <el-input
                    v-model="form.repassword"
                    type="password"
                    placeholder="请输入确认密码"
                    show-password
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    :loading="loading"
                    @click="submitForm(formRef)"
                    >提交</el-button
                >
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { logout, updatePassword } from "@/api";
import { showModal, toast } from "@/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from "@vueuse/core";
import { ref, reactive } from "vue";

const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
});

const loading = ref(false);

const rules = reactive({
    oldpassword: [
        {
            required: true,
            message: "旧密码不为空",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "新密码不为空",
            trigger: "blur",
        },
    ],
    repassword: [
        {
            required: true,
            message: "确认密码不为空",
            trigger: "blur",
        },
    ],
});

const formRef = ref(null);

const submitForm = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false;
        }
        loading.value = true;

        updatePassword(form)
            .then((res) => {
                toast("修改密码成功，请重新登录");

                store.dispatch("logout");
                router.push("/login");
            })
            .finally(() => {
                loading.value = false;
            });
    });
};

const showDrawer = ref(false);

const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout();
            break;
        case "rePassword":
            showDrawer.value = true;
            break;
    }
};

const router = useRouter();
const store = useStore();

function handleLogout() {
    showModal("是否退出登录")
        .then((res) => {
            logout().finally(() => {
                store.dispatch("logout");

                router.push("/login");

                toast("退出登录成功");
            });
        })
        .catch((err) => {});
}

function handleRefresh() {
    location.reload();
}

const { isFullscreen, toggle } = useFullscreen();
</script>

<style>
.f-header {
    @apply flex bg-indigo-700 text-light-50 fixed left-0 right-0 top-0 items-center;
    height: 64px;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-mono;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>
