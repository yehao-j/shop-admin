import router from '@/router'
import { getToken } from '@/composables/auth'

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const token = getToken()
    
    // 没有登录，强制跳转回登录页
    if (!token && to.name !== 'login') {
        return next({ name: 'login' })
    }

    // 已经登录过了，就不跳转到登录页，避免重复登录
    if (token && to.name == 'login') {
        return next({ name: from.name ? from.name : 'home' })
    }

    next()
})