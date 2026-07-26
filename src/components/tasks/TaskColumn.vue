<script setup lang="ts">
import type { Task } from "@/types";
import TaskCard from "./TaskCard.vue";

defineProps<{ title: string; tasks: Task[] }>();
defineEmits<{
  (e: "advance", taskId: string): void;
  (e: "remove", taskId: string): void;
}>();
</script>

<template>
  <div class="task-column">
    <div class="task-column__header">
      <p class="task-column__title">{{ title }}</p>
      <span class="task-column__count">{{ tasks.length }}</span>
    </div>
    <p v-if="tasks.length === 0" class="task-column__empty">No tasks here.</p>
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @advance="(id: string) => $emit('advance', id)"
      @remove="(id: string) => $emit('remove', id)"
    />
  </div>
</template>

<style scoped lang="scss">
.task-column {
  background-color: $color-gray-50;
  border-radius: $radius-md;
  padding: $space-3;
  min-height: 120px;

  &__header {
    display: flex;
    align-items: center;
    gap: $space-2;
    margin-bottom: $space-3;
  }

  &__title {
    font-weight: 700;
    font-size: $font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: $color-gray-600;
  }

  &__count {
    background-color: $color-gray-200;
    color: $color-gray-700;
    border-radius: $radius-full;
    padding: 0 $space-2;
    font-size: $font-size-xs;
    font-weight: 700;
  }

  &__empty {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }
}
</style>
