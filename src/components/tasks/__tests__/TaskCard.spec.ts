import { mount } from "@vue/test-utils";
import TaskCard from "../TaskCard.vue";
import type { Task } from "@/types/task.ts";

const MOCK_TASK: Task = {
  id: "t-2",
  projectId: "p-1",
  title: "Design new homepage hero",
  description: "Explore three directions for the hero section.",
  status: "in-progress",
  priority: "high",
  assigneeId: "u-3",
  createdAt: "2026-04-10",
};
describe("TaskCard", () => {
  it("renders title", () => {
    const wrapper = mount(TaskCard, {
      props: { task: MOCK_TASK },
    });

    expect(wrapper.text()).toContain("Design new homepage hero");
  });

  it("renders priority badge with danger tone when priority is high", () => {
    const wrapper = mount(TaskCard, {
      props: { task: MOCK_TASK },
    });

    expect(wrapper.text()).toContain("High");
    expect(wrapper.find(".status-badge--danger").exists()).toBe(true);
  });

  it("emits advance event with taskId as value when advance button clicked", async () => {
    const wrapper = mount(TaskCard, {
      props: { task: MOCK_TASK },
    });

    await wrapper.find('[data-testid="advance-btn"]').trigger("click");

    expect(wrapper.emitted("advance")?.[0]).toEqual(["t-2"]);
  });

  it("emits remove event with taskId as value when remove button clicked", async () => {
    const wrapper = mount(TaskCard, {
      props: { task: MOCK_TASK },
    });

    await wrapper.find('[data-testid="remove-btn"]').trigger("click");

    expect(wrapper.emitted("remove")?.[0]).toEqual(["t-2"]);
  });
});
