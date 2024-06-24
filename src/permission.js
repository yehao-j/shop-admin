import { router, addRoutes } from '@/router'
import { getToken } from '@/composables/auth'
import store from './store'
import { hideFullLoading, showFullLoading } from './composables/util'

// 全局前置守卫
let hasUserInfo = false

router.beforeEach(async (to, from, next) => {
    showFullLoading()

    const token = getToken()
    
    // 没有登录，强制跳转回登录页
    if (!token && to.name !== 'login') {
        return next({ name: 'login' })
    }

    // 已经登录过了，就不跳转到登录页，避免重复登录
    if (token && to.name == 'login') {
        return next({ name: from.name ? from.name : 'home' })
    }

    // 如果用户登录，自动获取用户信息，并存储在vuex中
    if (token && !hasUserInfo) {
        // 解构出menus
        let { menus } = await store.dispatch('getinfo')
        hasUserInfo = true
        // 动态添加路由
        addRoutes(menus)
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "abc"
    document.title = title

    next()
})

router.afterEach((to, from) => hideFullLoading())