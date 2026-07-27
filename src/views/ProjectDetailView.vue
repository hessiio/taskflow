<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProjectsStore } from "@/stores/projects";
import { useTasksStore } from "@/stores/tasks";
import AppBadge from "@/components/base/AppBadge.vue";
import AppButton from "@/components/base/AppButton.vue";
import AppInput from "@/components/base/AppInput.vue";
import AppCard from "@/components/base/AppCard.vue";
import TaskColumn from "@/components/tasks/TaskColumn.vue";
import type { ProjectStatus, TaskPriority } from "@/types";

const route = useRoute();
const projectsStore = useProjectsStore();
const tasksStore = useTasksStore();

onMounted(async () => {
  if (projectsStore.allProjects.length === 0)
    await projectsStore.fetchProjects();
  if (tasksStore.allTasks.length === 0) await tasksStore.fetchTasks();
});

const projectId = computed(() => String(route.params.id));
const project = computed(() => projectsStore.getById(projectId.value));
const columns = computed(() => tasksStore.boardColumns(projectId.value));

const STATUS_TONE: Record<
  ProjectStatus,
  "neutral" | "success" | "warning" | "info"
> = {
  planning: "info",
  active: "success",
  "on-hold": "warning",
  completed: "neutral",
};

const isFormOpen = ref(false);
const title = ref("");
const priority = ref<TaskPriority>("medium");
const formError = ref<string | null>(null);

function openForm() {
  isFormOpen.value = true;
}

function closeForm() {
  isFormOpen.value = false;
  title.value = "";
  priority.value = "medium";
  formError.value = null;
}

function submitTask() {
  if (!title.value) {
    formError.value = "Give the task a title.";
    return;
  }
  tasksStore.addTask({
    projectId: projectId.value,
    title: title.value,
    priority: priority.value,
    assigneeId: project.value?.ownerId ?? "u-1",
  });
  closeForm();
}
</script>

<template>
  <div class="page" v-if="project">
    <RouterLink :to="{ name: 'projects' }">&larr; Back to projects</RouterLink>

    <div class="page-header">
      <div>
        <div class="project-detail__title-row">
          <h1 class="page-title">{{ project.name }}</h1>
          <AppBadge :tone="STATUS_TONE[project.status]">{{
            project.status
          }}</AppBadge>
        </div>
        <p class="page-subtitle">{{ project.description }}</p>
      </div>
      <AppButton v-if="!isFormOpen" @click="openForm">Add task</AppButton>
    </div>

    <AppCard v-if="isFormOpen" title="Add a task" class="task-form">
      <AppInput
        v-model="title"
        label="Task title"
        placeholder="e.g. Write API documentation"
      />
      <div class="form-group">
        <label class="form-label">Priority</label>
        <select class="task-form__select" v-model="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <p v-if="formError" class="form-error">{{ formError }}</p>
      <div class="task-form__actions">
        <AppButton variant="secondary" @click="closeForm">Cancel</AppButton>
        <AppButton @click="submitTask">Add task</AppButton>
      </div>
    </AppCard>

    <div class="board">
      <TaskColumn
        title="To do"
        :tasks="columns.todo"
        @advance="tasksStore.advanceStatus"
        @remove="tasksStore.removeTask"
      />
      <TaskColumn
        title="In progress"
        :tasks="columns['in-progress']"
        @advance="tasksStore.advanceStatus"
        @remove="tasksStore.removeTask"
      />
      <TaskColumn
        title="Done"
        :tasks="columns.done"
        @advance="tasksStore.advanceStatus"
        @remove="tasksStore.removeTask"
      />
    </div>
  </div>
  <div class="page" v-else>
    <p>Project not found.</p>
  </div>
</template>

<style scoped lang="scss">
.project-detail__title-row {
  display: flex;
  align-items: center;
  gap: $space-3;
}

.task-form {
  margin-bottom: $space-6;

  &__select {
    padding: $space-2 $space-3;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
  }

  &__actions {
    display: flex;
    gap: $space-2;
    justify-content: flex-end;
  }
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-4;
}
</style>
