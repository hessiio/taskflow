<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProjectsStore } from "@/stores/projects";
import { useTasksStore } from "@/stores/tasks";
import AppCard from "@/components/base/AppCard.vue";
import ProjectCard from "@/components/projects/ProjectCard.vue";

const projectsStore = useProjectsStore();
const tasksStore = useTasksStore();

onMounted(async () => {
  if (projectsStore.allProjects.length === 0)
    await projectsStore.fetchProjects();
  if (tasksStore.allTasks.length === 0) await tasksStore.fetchTasks();
});

const stats = computed(() => [
  { label: "Total projects", value: projectsStore.allProjects.length },
  { label: "Active projects", value: projectsStore.activeProjects.length },
  { label: "Total tasks", value: tasksStore.allTasks.length },
  { label: "Tasks completed", value: tasksStore.doneCount },
]);

const recentProjects = computed(() => projectsStore.allProjects.slice(0, 3));
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">
          A snapshot of everything your team is working on.
        </p>
      </div>
    </div>

    <div class="dashboard-stats">
      <AppCard v-for="stat in stats" :key="stat.label">
        <p class="dashboard-stats__value" data-testid="stats-value">
          {{ stat.value }}
        </p>
        <p class="dashboard-stats__label" data-testid="stats-label">
          {{ stat.label }}
        </p>
      </AppCard>
    </div>

    <div class="page-header">
      <h2 class="page-title dashboard-section-title">Recent projects</h2>
      <RouterLink :to="{ name: 'projects' }">View all projects</RouterLink>
    </div>

    <p v-if="recentProjects.length === 0" class="empty-state">
      No projects yet.
    </p>
    <div v-else class="dashboard-projects">
      <ProjectCard
        v-for="project in recentProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: $space-4;
  margin-bottom: $space-8;

  &__value {
    font-size: $font-size-2xl;
    font-weight: 800;
    color: $color-brand-600;
  }

  &__label {
    color: $color-text-muted;
    font-size: $font-size-sm;
    margin-top: $space-1;
  }
}

.dashboard-section-title {
  font-size: $font-size-xl;
}

.dashboard-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: $space-4;
}
</style>
