import { createRouter, createWebHashHistory } from "vue-router";

// 默认路由，所有用户共享
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "admin",
            component: () => import("@/layout/admin.vue"),
            children: [
                {
                    path: "/goods/list",
                    name: "/goods/list",
                    component: () => import("@/views/goods/List.vue"),
                    meta: {
                        title: "商品管理",
                    },
                },
                {
                    path: "/",
                    name: "/",
                    component: () => import("@/views/Home.vue"),
                    meta: {
                        title: "后台首页",
                    },
                },
                {
                    path: "/category/list",
                    name: "/category/list",
                    component: () => import("@/views/category/List.vue"),
                    meta: {
                        title: "分类列表",
                    },
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            meta: {
                title: "登录页",
            },
            component: () => import("@/views/Login.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("@/views/404.vue"),
        },
    ],
});

// 动态路由，用于匹配菜单动态添加路由
const dynamicRoutes = [
    {
        path: "/",
        name: "/",
        component: () => import("@/views/Home.vue"),
        meta: {
            title: "后台首页",
        },
    },
    {
        path: "/category/list",
        name: "/category/list",
        component: () => import("@/views/category/List.vue"),
        meta: {
            title: "分类列表",
        },
    },
];

export function addRoutes(menus) {
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach((element) => {
            let item = dynamicRoutes.find((o) => o.path == element.frontpath);
            if (item && !router.hasRoute(item.name)) {
                // 动态路由主要通过两个函数实现。router.addRoute() 和 router.removeRoute()。它们只注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 router.push() 或 router.replace() 来手动导航，才能显示该新路由，所以直接刷新这些addRoute添加的路由，先被404捕获
                router.addRoute("admin", item);
            }

            if (element.child && element.child.length > 0) {
                findAndAddRoutesByMenus(element.child);
            }
        });
    };

    // findAndAddRoutesByMenus(menus);
}
