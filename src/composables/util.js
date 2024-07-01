import { ElNotification, ElMessageBox } from "element-plus";
import nProgress from "nprogress";

export function toast(
    message,
    type = "success",
    dangerouslyUseHTMLString = true
) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000,
    });
}

export function showModal(content, title, type = "warning") {
    return ElMessageBox.confirm(content, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type,
    });
}

// 显示全屏loading
export function showFullLoading() {
    nProgress.start();
}

// 隐藏全屏loading
export function hideFullLoading() {
    nProgress.done();
}

export function showPrompt(tip, value = "") {
    return ElMessageBox.prompt(tip, "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputValue: value,
    });
}
