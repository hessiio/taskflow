import { flushPromises, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import ProjectCard from "../ProjectCard.vue";
import type { Project } from "@/types/project.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/projects/:id",
      name: "project-detail",
      component: { template: "<div />" },
    },
  ],
});

const MOCK_PROJECT: Project = {
  id: "p-1",
  name: "Website Redesign",
  description: "Refresh the public marketing site with the new brand system.",
  status: "active",
  ownerId: "u-1",
  createdAt: "2026-04-01",
  dueDate: "2026-08-15",
};

describe("ProjectCard", () => {
  it("renders project's name, status and due date", () => {
    const wrapper = mount(ProjectCard, {
      global: { plugins: [router] },
      props: {
        project: MOCK_PROJECT,
      },
    });

    expect(wrapper.text()).toContain("Website Redesign");
    expect(wrapper.text()).toContain("active");
    expect(wrapper.text()).toContain("2026-08-15");
  });

  it("links to the project's detail page", () => {
    const wrapper = mount(ProjectCard, {
      global: { plugins: [router] },
      props: { project: MOCK_PROJECT },
    });

    expect(wrapper.attributes("href")).toBe("/projects/p-1");
  });

  it("uses a success tone badge for active projects", () => {
    const wrapper = mount(ProjectCard, {
      global: { plugins: [router] },
      props: { project: MOCK_PROJECT },
    });

    expect(wrapper.find(".status-badge--success").exists()).toBe(true);
  });

  it("uses a warning tone badge for on-hold projects", () => {
    const wrapper = mount(ProjectCard, {
      global: { plugins: [router] },
      props: {
        project: {
          ...MOCK_PROJECT,
          status: "on-hold",
        },
      },
    });
    expect(wrapper.find(".status-badge--warning").exists()).toBe(true);
  });
});
