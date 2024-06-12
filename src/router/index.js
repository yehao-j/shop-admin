import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/layout/admin.vue"),
            children: [
                {
                    path: '/',
                    component: () => import("@/views/Home.vue"),
                    meta: {
                        title: '后台首页'
                    },
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            meta: {
                title: '登录页'
            },
            component: () => import("@/views/Login.vue"),
        },
    ],
});

export default router;
