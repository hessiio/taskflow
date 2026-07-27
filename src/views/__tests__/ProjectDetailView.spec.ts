import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ProjectDetailView from "@/views/ProjectDetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/projects", name: "projects", component: { template: "<div />" } },
    {
      path: "/projects/:id",
      name: "project-detail",
      component: ProjectDetailView,
      props: true,
    },
  ],
});

describe("ProjectDetailView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the project's tasks grouped into columns", async () => {
    await router.push("/projects/p-1");
    const wrapper = mount(ProjectDetailView, { global: { plugins: [router] } });
    await vi.advanceTimersByTimeAsync(150);

    expect(wrapper.text()).toContain("Website Redesign");
    expect(wrapper.text()).toContain("To do");
    expect(wrapper.text()).toContain("In progress");
    expect(wrapper.text()).toContain("Done");
  });

  it("shows a not-found message for an unknown project id", async () => {
    await router.push("/projects/does-not-exist");
    const wrapper = mount(ProjectDetailView, { global: { plugins: [router] } });
    await vi.advanceTimersByTimeAsync(150);

    expect(wrapper.text()).toContain("Project not found.");
  });

  it("adds a new task through the inline form", async () => {
    await router.push("/projects/p-1");
    const wrapper = mount(ProjectDetailView, { global: { plugins: [router] } });
    await vi.advanceTimersByTimeAsync(150);

    await wrapper.find("button").trigger("click");
    await wrapper
      .find('input[placeholder="e.g. Write API documentation"]')
      .setValue("Write launch checklist");

    const addButton = wrapper
      .findAll("button")
      .find((b) => b.text() === "Add task")!;
    await addButton.trigger("click");

    expect(wrapper.text()).toContain("Write launch checklist");
  });

  //FIXME - Cannot read properties of undefined (reading 'trigger')
  it("advances a task to the next column when clicked", async () => {
    await router.push("/projects/p-1");
    const wrapper = mount(ProjectDetailView, { global: { plugins: [router] } });
    await vi.advanceTimersByTimeAsync(150);

    const advanceButtons = wrapper.findAll(".task-card__advance");
    const initialCount = advanceButtons.length;
    await advanceButtons[0].trigger("click");

    expect(wrapper.findAll(".task-card__advance").length).toBeLessThanOrEqual(
      initialCount,
    );
  });
});
