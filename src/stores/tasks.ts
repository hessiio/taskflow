import { defineStore } from "pinia"
import type { Task, TaskStatus, CreateTaskInput } from "@/types"

const MOCK_TASKS: Task[] = [
  { id: "t-1", projectId: "p-1", title: "Audit current site content", description: "Catalog every page and flag outdated copy.", status: "done", priority: "medium", assigneeId: "u-3", createdAt: "2026-04-02" },
  { id: "t-2", projectId: "p-1", title: "Design new homepage hero", description: "Explore three directions for the hero section.", status: "in-progress", priority: "high", assigneeId: "u-3", createdAt: "2026-04-10" },
  { id: "t-3", projectId: "p-1", title: "Implement responsive nav", description: "Build the new nav with the updated breakpoints.", status: "todo", priority: "medium", assigneeId: "u-1", createdAt: "2026-04-15" },
  { id: "t-4", projectId: "p-1", title: "Set up analytics events", description: "Wire up funnel tracking for the new pages.", status: "todo", priority: "low", assigneeId: "u-1", createdAt: "2026-04-16" },
  { id: "t-5", projectId: "p-2", title: "Define v2 information architecture", description: "Map out the new navigation structure.", status: "in-progress", priority: "high", assigneeId: "u-2", createdAt: "2026-05-11" },
  { id: "t-6", projectId: "p-2", title: "Prototype onboarding flow", description: "Clickable prototype for the first-run experience.", status: "todo", priority: "medium", assigneeId: "u-3", createdAt: "2026-05-14" },
  { id: "t-7", projectId: "p-3", title: "Gather stakeholder requirements", description: "Interview department leads on must-have metrics.", status: "done", priority: "medium", assigneeId: "u-1", createdAt: "2026-02-21" },
  { id: "t-8", projectId: "p-3", title: "Design chart library shortlist", description: "Compare three charting libraries for the dashboard.", status: "todo", priority: "low", assigneeId: "u-2", createdAt: "2026-03-01" },
  { id: "t-9", projectId: "p-4", title: "Ship revised welcome email", description: "New copy and design for the first onboarding email.", status: "done", priority: "high", assigneeId: "u-3", createdAt: "2026-01-10" },
  { id: "t-10", projectId: "p-4", title: "Reduce onboarding form fields", description: "Cut the signup form from 9 fields to 4.", status: "done", priority: "medium", assigneeId: "u-2", createdAt: "2026-01-20" }
]

const STATUS_ORDER: TaskStatus[] = ["todo", "in-progress", "done"]

let nextTaskSequence = MOCK_TASKS.length + 1

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    isLoading: false
  }),
  getters: {
    allTasks: (state): Task[] => state.tasks,
    byProject: (state) => {
      return (projectId: string): Task[] =>
        state.tasks.filter((t) => t.projectId === projectId)
    },
    boardColumns: (state) => {
      return (projectId: string): Record<TaskStatus, Task[]> => {
        const tasksForProject = state.tasks.filter((t) => t.projectId === projectId)
        return {
          todo: tasksForProject.filter((t) => t.status === "todo"),
          "in-progress": tasksForProject.filter((t) => t.status === "in-progress"),
          done: tasksForProject.filter((t) => t.status === "done")
        }
      }
    },
    doneCount: (state): number => state.tasks.filter((t) => t.status === "done").length
  },
  actions: {
    async fetchTasks(): Promise<void> {
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 150))
      this.tasks = MOCK_TASKS
      this.isLoading = false
    },
    addTask(input: CreateTaskInput): Task {
      const task: Task = {
        id: `t-${nextTaskSequence++}`,
        projectId: input.projectId,
        title: input.title,
        description: "",
        status: "todo",
        priority: input.priority,
        assigneeId: input.assigneeId,
        createdAt: new Date().toISOString().slice(0, 10)
      }
      this.tasks.push(task)
      return task
    },
    advanceStatus(taskId: string): void {
      const task = this.tasks.find((t) => t.id === taskId)
      if (!task) return
      const currentIndex = STATUS_ORDER.indexOf(task.status)
      const nextIndex = Math.min(currentIndex + 1, STATUS_ORDER.length - 1)
      task.status = STATUS_ORDER[nextIndex]
    },
    removeTask(taskId: string): void {
      this.tasks = this.tasks.filter((t) => t.id !== taskId)
    }
  }
})