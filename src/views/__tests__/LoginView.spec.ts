import { setActivePinia, createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import LoginView from "../LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "login", component: LoginView },
    { path: "/", name: "dashboard", component: { template: "<div />" } },
    {
      path: "/projects/:id",
      name: "project-detail",
      component: { template: "<div />" },
    },
  ],
});

describe("LoginView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a validation error when submitted empty", async () => {
    const wrapper = mount(LoginView, { global: { plugins: [router] } });

    await wrapper.find('[data-testid="login-form"]').trigger("submit.prevent");

    expect(wrapper.text()).toContain("Enter both an email and a password.");
  });

  it("logs in and redirects to the dashboard by default", async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('input[type="email"]').setValue("admin@taskflow.io");
    await wrapper.find('input[type="password"]').setValue("admin123");
    await wrapper.find('[data-testid="login-form"]').trigger("submit.prevent");
    await vi.advanceTimersByTimeAsync(300);

    expect(router.currentRoute.value.name).toBe("dashboard");
  });

  it("redirects back to the originally requested page after login", async () => {
    await router.push("/login?redirect=/projects/p-2");
    const wrapper = mount(LoginView, { global: { plugins: [router] } });

    await wrapper.find('input[type="email"]').setValue("admin@taskflow.io");
    await wrapper.find('input[type="password"]').setValue("admin123");
    await wrapper.find("form").trigger("submit.prevent");
    await vi.advanceTimersByTimeAsync(300);

    expect(router.currentRoute.value.fullPath).toBe("/projects/p-2");
  });

  it("shows the store's error message on invalid credentials", async () => {
    const wrapper = mount(LoginView, { global: { plugins: [router] } });

    await wrapper.find('input[type="email"]').setValue("admin@taskflow.io");
    await wrapper.find('input[type="password"]').setValue("wrong-password");
    await wrapper.find("form").trigger("submit.prevent");
    await vi.advanceTimersByTimeAsync(300);

    expect(wrapper.text()).toContain("Invalid email or password.");
  });
});
