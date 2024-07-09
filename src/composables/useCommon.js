import { ref, computed, reactive } from "vue";
import { toast } from "./util";

export function useInitTable(opt = {}) {
    const tableData = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const total = ref(0);

    function getData(p = null) {
        if (typeof p == "number") {
            currentPage.value = p;
        }

        loading.value = true;
        opt.getList(currentPage.value)
            .then((res) => {
                if (
                    opt.onGetListSuccess &&
                    typeof opt.onGetListSuccess == "function"
                ) {
                    opt.onGetListSuccess(res);
                } else {
                    tableData.value = res.list;
                    total.value = res.totalCount;
                }
            })
            .finally(() => {
                loading.value = false;
            });
    }

    getData();

    return {
        tableData,
        loading,
        currentPage,
        total,
        getData,
    };
}

export function useInitForm(opt = {}) {
    const formDrawerRef = ref(null);
    const formRef = ref(null);
    const editId = ref(0);
    const drawerTitle = computed(() => (editId.value > 0 ? "修改" : "新增"));

    const form = reactive({});

    const handleSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return;
            }

            formDrawerRef.value.showLoading();

            const func =
                editId.value == 0
                    ? opt.create(form)
                    : opt.update(editId.value, form);

            func.then((res) => {
                toast(drawerTitle.value + "成功");
                opt.getData(editId.value ? null : 1);

                formDrawerRef.value.close();
            }).finally(() => {
                formDrawerRef.value.hideLoading();
            });
        });
    };

    // 重置表单
    function resetForm(row) {
        if (formRef.value) {
            formRef.value.clearValidate();
        }

        if (row) {
            for (const key in form) {
                form[key] = row[key];
            }
        }
    }

    const handleEdit = (row) => {
        editId.value = row.id;
        resetForm(row);
        formDrawerRef.value.open();
    };

    const handleCreate = () => {
        editId.value = 0;
        resetForm(opt.form);
        formDrawerRef.value.open();
    };

    return {
        formDrawerRef,
        formRef,
        editId,
        drawerTitle,
        form,
        handleSubmit,
        resetForm,
        handleEdit,
        handleCreate,
    };
}
