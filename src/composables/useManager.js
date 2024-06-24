import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { logout, updatePassword } from "@/api/manager";
import { showModal, toast } from "@/composables/util";

export function useRePassword() {
    const router = useRouter();
    const store = useStore();

    const formDrawerRef = ref(null);
    const formRef = ref(null);

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

    const openRePasswordForm = () => formDrawerRef.value.open();

    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: "",
    });

    const submitForm = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            formDrawerRef.value.showLoading();

            updatePassword(form)
                .then((res) => {
                    toast("修改密码成功，请重新登录");

                    store.dispatch("logout");
                    router.push("/login");
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading();
                });
        });
    };

    return {
        formDrawerRef,
        formRef,
        rules,
        form,
        submitForm,
        openRePasswordForm,
    };
}

export function useLogout() {
    const router = useRouter();
    const store = useStore();
    function handleLogout() {
        showModal("是否退出登录").then((res) => {
            logout().finally(() => {
                store.dispatch("logout");

                router.push("/login");

                toast("退出登录成功");
            });
        });
    }

    return {
        handleLogout,
    };
}
