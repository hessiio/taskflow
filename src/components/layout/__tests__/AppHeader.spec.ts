import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import AppHeader from "../AppHeader.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: {
        template: "<div />",
      },
    },
    {
      path: "/login",
      name: "login",
      component: {
        template: "<div />",
      },
    },
  ],
});

describe("AppHeader", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("shows the signed-in user's name, role and initials", async () => {
    const auth = useAuthStore();
    const wrapper = mount(AppHeader, { global: { plugins: [router] } });

    await auth.login({ email: "admin@taskflow.io", password: "admin123" });

    expect(wrapper.text()).toContain("Ava Chen");
    expect(wrapper.text()).toContain("admin");
    expect(wrapper.text()).toContain("AC");
  });

  it("logs out and redirects to login when Sign out is clicked", async () => {
    const auth = useAuthStore();
    await auth.login({ email: "admin@taskflow.io", password: "admin123" });

    const wrapper = mount(AppHeader, { global: { plugins: [router] } });
    const button = wrapper.find('[data-testid="logout-btn"]');

    await button.trigger("click");
    await flushPromises();

    expect(auth.isAuthenticated).toBe(false);
    expect(router.currentRoute.value.name).toBe("login");
  });
});
