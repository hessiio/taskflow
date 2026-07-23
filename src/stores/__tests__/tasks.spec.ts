import { setActivePinia, createPinia } from "pinia";
import { useTasksStore } from "@/stores/tasks";
import type { Task } from "@/types";

describe("tasks store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("fetches tasks", async () => {
    const tasks = useTasksStore();
    await tasks.fetchTasks();

    expect(tasks.allTasks.length).toBeGreaterThan(0);
  });

  it("filters tasks by project", async () => {
    const tasks = useTasksStore();
    await tasks.fetchTasks();

    const projectTasks = tasks.byProject("p-1");
    expect(projectTasks.every((t: Task) => t.projectId === "p-1")).toBe(true);
    expect(projectTasks.length).toBe(4);
  });

  it("groups tasks into board columns by status", async () => {
    const tasks = useTasksStore();
    await tasks.fetchTasks();

    const columns = tasks.boardColumns("p-1");
    expect(columns.todo.every((t: Task) => t.status === "todo")).toBe(true);
    expect(
      columns["in-progress"].every((t: Task) => t.status === "in-progress"),
    ).toBe(true);
    expect(columns.done.every((t: Task) => t.status === "done")).toBe(true);

    const total =
      columns.todo.length + columns["in-progress"].length + columns.done.length;
    expect(total).toBe(tasks.byProject("p-1").length);
  });

  it("adds a new task in the todo column", async () => {
    const tasks = useTasksStore();
    await tasks.fetchTasks();

    const task = tasks.addTask({
      projectId: "p-1",
      title: "Write release notes",
      priority: "low",
      assigneeId: "u-1",
    });

    expect(task.status).toBe("todo");
    expect(tasks.byProject("p-1")).toContainEqual(task);
  });

  it("advances a task's status one step at a time", async () => {
    const tasks = useTasksStore();
    await tasks.fetchTasks();

    const task = tasks.addTask({
      projectId: "p-1",
      title: "Review PR",
      priority: "medium",
      assigneeId: "u-1",
    });

    expect(task.status).toBe("todo");
    tasks.advanceStatus(task.id);
    expect(task.status).toBe("in-progress");
    tasks.advanceStatus(task.id);
    expect(task.status).toBe("done");

    // advancing a done task stays done
    tasks.advanceStatus(task.id);
    expect(task.status).toBe("done");
  });

  it("removes a task", async () => {
    const tasks = useTasksStore();
    await tasks.fetchTasks();
    const before = tasks.allTasks.length;

    tasks.removeTask("t-1");

    expect(tasks.allTasks.length).toBe(before - 1);
    expect(tasks.allTasks.find((t: Task) => t.id === "t-1")).toBeUndefined();
  });
});
