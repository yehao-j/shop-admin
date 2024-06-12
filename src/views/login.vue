<template>
    <el-row class="login_container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <div>
                    此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址
                </div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>

            <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                class="w-[250px]"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名"
                    >
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    >
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        round
                        color="#626aef"
                        class="w-[250px]"
                        type="primary"
                        :loading="loading"
                        @click="submitForm(formRef)"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue"
import { toast } from "@/composables/util"
import { useRouter } from 'vue-router'
import { setToken } from "@/composables/auth"
import { useStore } from "vuex"

const router = useRouter()
const store = useStore()

const form = reactive({
    username: "",
    password: "",
});

const loading = ref(false)

const rules = reactive({
    username: [
        {
            required: true,
            message: "用户名不为空",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "用户名不为空",
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
        loading.value = true

        store.dispatch('login', form)
        .then(res => {
            toast('登录成功')
            router.push('/')
        })
        .finally(() => {
            loading.value = false
        })
    })
}

function onKeyUp(e) {
    if (e.key == 'Enter') {
        submitForm()
    }
}

onMounted(() => {
    document.addEventListener('keyup', onKeyUp)
})

onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})

</script>

<style>
.login_container {
    @apply min-h-screen bg-indigo-500;
}

.login_container .left,
.login_container .right {
    @apply !flex flex-col justify-center items-center;
}

.login_container .right {
    @apply bg-light-50;
}

.left > div > div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left > div > div:last-child {
    @apply text-gray-200 text-sm;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right > div {
    @apply flex space-x-2 items-center justify-center my-5 text-gray-300;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>
