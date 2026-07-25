import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import AppSidebar from "@/components/layout/AppSidebar.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "dashboard", component: { template: "<div />" } },
    { path: "/projects", name: "projects", component: { template: "<div />" } },
  ],
});

describe("AppSidebar", () => {
  it("renders a link for every navigation item", () => {
    const wrapper = mount(AppSidebar, { global: { plugins: [router] } });
    const links = wrapper.findAll('[data-testid="router-link"]');

    expect(links).toHaveLength(2);
    expect(wrapper.text()).toContain("Dashboard");
    expect(wrapper.text()).toContain("Projects");
  });

  it("marks the current route's link as active", async () => {
    await router.push({ name: "projects" });
    const wrapper = mount(AppSidebar, { global: { plugins: [router] } });

    const activeLink = wrapper.find(".app-sidebar__link--active");
    expect(activeLink.text()).toBe("Projects");
  });
});
