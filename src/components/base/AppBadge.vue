<script setup lang="ts">
withDefaults(
  defineProps<{
    tone: "neutral" | "success" | "warning" | "danger" | "info";
  }>(),
  {
    tone: "neutral",
  },
);
</script>

<template>
  <span :class="['status-badge', `status-badge--${tone}`]">
    <slot />
  </span>
</template>

<style scoped lang="scss">
.status-badge {
  &--neutral {
    @include badge-variant($color-gray-700, $color-gray-100);
  }

  &--success {
    @include badge-variant($color-success, $color-success-bg);
  }

  &--warning {
    @include badge-variant($color-warning, $color-warning-bg);
  }

  &--danger {
    @include badge-variant($color-danger, $color-danger-bg);
  }

  &--info {
    @include badge-variant($color-info, $color-info-bg);
  }
}
</style>
