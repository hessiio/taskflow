<script setup lang="ts">
import type { Task, TaskPriority } from "@/types";
import AppBadge from "@/components/base/AppBadge.vue";
import { capitalize } from "vue";

defineProps<{ task: Task }>();
const emit = defineEmits<{
  (e: "advance", taskId: string): void;
  (e: "remove", taskId: string): void;
}>();

const PRIORITY_TONE: Record<TaskPriority, "neutral" | "warning" | "danger"> = {
  low: "neutral",
  medium: "warning",
  high: "danger",
};

function toneFor(priority: TaskPriority) {
  return PRIORITY_TONE[priority];
}
</script>

<template>
  <article class="task-card">
    <div class="task-card__header">
      <p class="task-card__title">{{ task.title }}</p>
      <AppBadge :tone="toneFor(task.priority)">{{
        capitalize(task.priority)
      }}</AppBadge>
    </div>
    <div class="task-card__footer">
      <button
        v-if="task.status !== 'done'"
        class="task-card__advance"
        data-testid="advance-btn"
        @click="emit('advance', task.id)"
      >
        Move forward &rarr;
      </button>
      <button
        class="task-card__remove"
        data-testid="remove-btn"
        @click="emit('remove', task.id)"
      >
        Delete
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.task-card {
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  padding: $space-3;
  margin-bottom: $space-2;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: $space-2;
    margin-bottom: $space-2;
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: 600;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__advance {
    background-color: transparent;
    color: $color-brand-600;
    font-size: $font-size-xs;
    font-weight: 600;
    padding: 2px $space-1;

    &:hover {
      text-decoration: underline;
    }
  }

  &__remove {
    background-color: transparent;
    color: $color-gray-400;
    font-size: $font-size-xs;
    padding: 2px $space-1;

    &:hover {
      color: $color-danger;
    }
  }
}
</style>
