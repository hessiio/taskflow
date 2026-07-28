import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: import("@/views/LoginView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      component: import("@/layouts/DefaultLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "dashboard",
          component: import("@/views/DashboardView.vue"),
        },
        {
          path: "/projects",
          name: "projects",
          component: import("@/views/ProjectsView.vue"),
        },
        {
          path: "/projects/:id",
          name: "projects",
          props: true,
          component: import("@/views/ProjectDetailView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: { template: "<div />" },
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login", params: { redirect: to.fullPath } };
  }
  if (to.name === "login" && auth.isAuthenticated) {
    return { name: "dashboard" };
  }

  return true;
});

export default router;
