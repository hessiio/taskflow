import { mount } from "@vue/test-utils";
import type { Task } from "@/types";
import TaskColumn from "../TaskColumn.vue";

const MOCK_TASKS: Task[] = [
  {
    id: "t-1",
    projectId: "p-1",
    title: "Task one",
    description: "",
    status: "todo",
    priority: "low",
    assigneeId: "u-1",
    createdAt: "2026-01-01",
  },
  {
    id: "t-2",
    projectId: "p-1",
    title: "Task two",
    description: "",
    status: "todo",
    priority: "high",
    assigneeId: "u-2",
    createdAt: "2026-01-02",
  },
];

describe("TaskColumn", () => {
  it("renders title and task count", () => {
    const wrapper = mount(TaskColumn, {
      props: {
        title: "To Do",
        tasks: MOCK_TASKS,
      },
    });

    expect(wrapper.text()).toContain("To Do");
    expect(wrapper.text()).toContain(2);
  });

  // FIXME
  it("renders one TaskCard per task", () => {
    const wrapper = mount(TaskColumn, {
      props: { title: "To do", tasks: MOCK_TASKS },
    });
    expect(
      wrapper
        .findAllComponents({ name: undefined })
        .filter((c) => c.classes().includes("task-card")),
    ).toHaveLength(2);
  });

  it("shows an empty message when there are no tasks", () => {
    const wrapper = mount(TaskColumn, {
      props: {
        title: "To Do",
        tasks: [],
      },
    });

    expect(wrapper.text()).toContain("No tasks here.");
  });

  it("forwards advance and remove events from a child TaskCard", async () => {});
});
