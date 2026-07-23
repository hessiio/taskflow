export type ProjectStatus = "planning" | "active" | "on-hold" | "completed"

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  ownerId: string
  createdAt: string
  dueDate: string
}

export interface CreateProjectInput {
  name: string
  description: string
  dueDate: string
}