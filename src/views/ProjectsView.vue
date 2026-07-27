<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProjectsStore } from "@/stores/projects";
import { useAuthStore } from "@/stores/auth";
import ProjectCard from "@/components/projects/ProjectCard.vue";
import AppButton from "@/components/base/AppButton.vue";
import AppInput from "@/components/base/AppInput.vue";
import AppCard from "@/components/base/AppCard.vue";

const projectsStore = useProjectsStore();
const auth = useAuthStore();

onMounted(() => {
  if (projectsStore.allProjects.length === 0) projectsStore.fetchProjects();
});

const isFormOpen = ref(false);
const name = ref("");
const description = ref("");
const dueDate = ref("");
const formError = ref<string | null>(null);

function openForm() {
  isFormOpen.value = true;
}

function closeForm() {
  isFormOpen.value = false;
  name.value = "";
  description.value = "";
  dueDate.value = "";
  formError.value = null;
}

function submitProject() {
  if (!name.value || !dueDate.value) {
    formError.value = "Name and due date are required.";
    return;
  }
  if (!auth.currentUser) return;

  projectsStore.createProject(
    {
      name: name.value,
      description: description.value,
      dueDate: dueDate.value,
    },
    auth.currentUser.id,
  );
  closeForm();
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Projects</h1>
        <p class="page-subtitle">
          Every initiative your team is currently running.
        </p>
      </div>
      <AppButton v-if="!isFormOpen" @click="openForm" data-testid="new-btn"
        >New project</AppButton
      >
    </div>

    <AppCard v-if="isFormOpen" title="Create a project" class="projects-form">
      <AppInput
        v-model="name"
        label="Project name"
        placeholder="e.g. Customer Portal Revamp"
      />
      <AppInput
        v-model="description"
        label="Description"
        placeholder="What is this project about?"
      />
      <AppInput v-model="dueDate" label="Due date" type="date" />
      <p v-if="formError" class="form-error">{{ formError }}</p>
      <div class="projects-form__actions">
        <AppButton variant="secondary" @click="closeForm">Cancel</AppButton>
        <AppButton data-testid="create-btn" @click="submitProject"
          >Create project</AppButton
        >
      </div>
    </AppCard>

    <p v-if="projectsStore.allProjects.length === 0" class="empty-state">
      No projects yet. Create your first one to get started.
    </p>
    <div v-else class="projects-grid">
      <ProjectCard
        v-for="project in projectsStore.allProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-form {
  margin-bottom: $space-6;

  &__actions {
    display: flex;
    gap: $space-2;
    justify-content: flex-end;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: $space-4;
}
</style>
