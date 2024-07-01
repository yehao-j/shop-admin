import store from "@/store"

export default {
    /// 当作为插件，被app.use()调用的时候，就会执行install方法
    install(app) {
        app.directive("permission", {
            mounted(el, binding) {
                hasPermission(binding.value, el)
            }
        })
    }
}

function hasPermission(value, el = false) {
    if (!Array.isArray(value)) {
        throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
    }
    const hasAuth = value.findIndex(v => store.state.ruleNames.includes(v)) != -1
    
    if (el && !hasAuth) {
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}