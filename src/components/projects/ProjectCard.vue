<script setup lang="ts">
import type { Project, ProjectStatus } from "@/types";
import AppBadge from "../base/AppBadge.vue";

defineProps<{ project: Project }>();

const STATUS_TONE: Record<
  ProjectStatus,
  "neutral" | "success" | "warning" | "info"
> = {
  planning: "info",
  active: "success",
  "on-hold": "warning",
  completed: "neutral",
};

function statusFor(status: ProjectStatus) {
  return STATUS_TONE[status];
}
</script>

<template>
  <RouterLink
    :to="{ name: 'project-detail', params: { id: project.id } }"
    class="project-card"
  >
    <div class="project-card__header">
      <h3 class="project-card__name">{{ project.name }}</h3>
      <AppBadge :tone="statusFor(project.status)">{{
        project.status
      }}</AppBadge>
    </div>

    <p class="project-card__description">{{ project.description }}</p>
    <p class="project-card__due">Due {{ project.dueDate }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.project-card {
  @include surface;
  display: block;
  padding: $space-5;
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  &:hover {
    box-shadow: $shadow-md;
    border-color: $color-brand-500;
  }

  &__header {
    @include flex-between;
    margin-bottom: $space-2;
    gap: $space-2;
  }

  &__name {
    font-size: $font-size-lg;
    font-weight: 700;
    @include truncate;
  }

  &__description {
    color: $color-text-muted;
    font-size: $font-size-sm;
    margin-bottom: $space-4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__due {
    font-size: $font-size-xs;
    color: $color-gray-500;
  }
}
</style>
