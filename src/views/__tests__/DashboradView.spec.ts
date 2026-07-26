import { mount } from "@vue/test-utils";
import DashboardView from "../DashboardView.vue";
import { setActivePinia, createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ProjectCard from "@/components/projects/ProjectCard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "dashboard", component: DashboardView },
    { path: "/projects", name: "projects", component: { template: "<div />" } },
    {
      path: "/projects/:id",
      name: "project-detail",
      component: { template: "<div />" },
    },
  ],
});

describe("DashboardView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders total stats", async () => {
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });

    await vi.advanceTimersByTimeAsync(150);

    expect(wrapper.text()).toContain("Total projects");
    expect(wrapper.text()).toContain("Active projects");
    expect(wrapper.text()).toContain("Total tasks");
    expect(wrapper.text()).toContain("Tasks completed");
  });

  it("shows at must three recent projects", async () => {
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });

    await vi.advanceTimersByTimeAsync(150);

    expect(wrapper.findAllComponents(ProjectCard).length).toBeLessThanOrEqual(
      3,
    );
  });
});
