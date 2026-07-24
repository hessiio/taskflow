<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="app-card">
    <div
      v-if="title || $slots.actions"
      class="app-card__header"
      data-testid="card-header"
    >
      <h3 v-if="title" class="app-card__title">{{ title }}</h3>
      <div v-if="$slots.actions" class="app-card__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="app-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-card {
  @include surface;
  padding: $space-5;

  &__header {
    @include flex-between;
    margin-bottom: $space-4;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: 700;
  }
}
</style>
