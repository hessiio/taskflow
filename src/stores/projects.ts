import { defineStore } from "pinia"
import type { Project, CreateProjectInput } from "@/types"

const MOCK_PROJECTS: Project[] = [
  {
    id: "p-1",
    name: "Website Redesign",
    description: "Refresh the public marketing site with the new brand system.",
    status: "active",
    ownerId: "u-1",
    createdAt: "2026-04-01",
    dueDate: "2026-08-15"
  },
  {
    id: "p-2",
    name: "Mobile App v2",
    description: "Rebuild the customer mobile app on the new design tokens.",
    status: "planning",
    ownerId: "u-2",
    createdAt: "2026-05-10",
    dueDate: "2026-10-01"
  },
  {
    id: "p-3",
    name: "Internal Analytics Dashboard",
    description: "Give department leads self-serve reporting on key metrics.",
    status: "on-hold",
    ownerId: "u-1",
    createdAt: "2026-02-20",
    dueDate: "2026-07-01"
  },
  {
    id: "p-4",
    name: "Q1 Customer Onboarding Revamp",
    description: "Reduce time-to-first-value for new customers.",
    status: "completed",
    ownerId: "u-2",
    createdAt: "2026-01-05",
    dueDate: "2026-03-31"
  }
]

let nextProjectSequence = MOCK_PROJECTS.length + 1

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [] as Project[],
    isLoading: false
  }),
  getters: {
    allProjects: (state): Project[] => state.projects,
    activeProjects: (state): Project[] =>
      state.projects.filter((p) => p.status === "active"),
    getById: (state) => {
      return (id: string): Project | undefined =>
        state.projects.find((p) => p.id === id)
    }
  },
  actions: {
    async fetchProjects(): Promise<void> {
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 150))
      this.projects = MOCK_PROJECTS
      this.isLoading = false
    },
    createProject(input: CreateProjectInput, ownerId: string): Project {
      const project: Project = {
        id: `p-${nextProjectSequence++}`,
        name: input.name,
        description: input.description,
        status: "planning",
        ownerId,
        createdAt: new Date().toISOString().slice(0, 10),
        dueDate: input.dueDate
      }
      this.projects.push(project)
      return project
    }
  }
})