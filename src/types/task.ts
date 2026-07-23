export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  createdAt: string
}

export interface CreateTaskInput {
  projectId: string
  title: string
  priority: TaskPriority
  assigneeId: string
}