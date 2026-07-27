import { createRouter, createWebHistory } from "vue-router";
import { flushPromises, mount } from "@vue/test-utils";
import { useAuthStore } from "@/stores/auth";
import { useProjectsStore } from "@/stores/projects.ts";
import ProjectsView from "../ProjectsView.vue";
import { createPinia, setActivePinia } from "pinia";
import ProjectCard from "@/components/projects/ProjectCard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
    },
    {
      path: "/projects/:id",
      name: "project-detail",
      component: { template: "<div />" },
    },
  ],
});

describe("ProjectsView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders all projects from the store", async () => {
    const projectsStore = useProjectsStore();
    await projectsStore.fetchProjects();

    const wrapper = mount(ProjectsView, {
      global: { plugins: [router] },
    });

    expect(wrapper.findAllComponents(ProjectCard)).toHaveLength(
      projectsStore.allProjects.length,
    );
  });

  it("shows the form when clicked on new project button", async () => {
    const wrapper = mount(ProjectsView, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-testid="new-btn"]').trigger("click");
    await flushPromises();

    expect(wrapper.find(".projects-form").exists()).toBe(true);
  });

  it("shows a validation error when required fields are missing", async () => {
    const auth = useAuthStore();
    await auth.login({ email: "admin@taskflow.io", password: "admin123" });

    const wrapper = mount(ProjectsView, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-testid="new-btn"]').trigger("click");
    await wrapper.find('[data-testid="create-btn"]').trigger("click");
    await flushPromises();

    expect(wrapper.text()).toContain("Name and due date are required.");
  });

  it("creates a new project and adds it to the list", async () => {
    const auth = useAuthStore();
    await auth.login({ email: "admin@taskflow.io", password: "admin123" });

    const wrapper = mount(ProjectsView, { global: { plugins: [router] } });
    await flushPromises();
    await wrapper.find('[data-testid="new-btn"]').trigger("click");

    await wrapper
      .find('input[placeholder="e.g. Customer Portal Revamp"]')
      .setValue("New Initiative");
    await wrapper.find('input[type="date"]').setValue("2026-12-01");
    await wrapper.find('[data-testid="create-btn"]').trigger("click");

    expect(wrapper.text()).toContain("New Initiative");
    expect(wrapper.find(".projects-form").exists()).toBe(false);
  });
});
