import { setActivePinia, createPinia } from "pinia";
import type { Project } from "@/types";
import { useProjectsStore } from "@/stores/projects";

describe("projects store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts empty until fetched", () => {
    const projects = useProjectsStore();
    expect(projects.allProjects).toHaveLength(0);
  });

  it("fetches the project list", async () => {
    const projects = useProjectsStore();
    await projects.fetchProjects();

    expect(projects.allProjects.length).toBeGreaterThan(0);
    expect(projects.isLoading).toBe(false);
  });

  it("filters active projects", async () => {
    const projects = useProjectsStore();
    await projects.fetchProjects();

    expect(
      projects.activeProjects.every((p: Project) => p.status === "active"),
    ).toBe(true);
  });

  it("finds a project by id", async () => {
    const projects = useProjectsStore();
    await projects.fetchProjects();

    expect(projects.getById("p-1")?.name).toBe("Website Redesign");
    expect(projects.getById("does-not-exist")).toBeUndefined();
  });

  it("creates a new project in planning status", async () => {
    const projects = useProjectsStore();
    await projects.fetchProjects();
    const before = projects.allProjects.length;

    const created = projects.createProject(
      {
        name: "New Initiative",
        description: "A brand new effort.",
        dueDate: "2026-12-01",
      },
      "u-1",
    );

    expect(projects.allProjects.length).toBe(before + 1);
    expect(created.status).toBe("planning");
    expect(created.ownerId).toBe("u-1");
    expect(projects.getById(created.id)).toEqual(created);
  });
});
