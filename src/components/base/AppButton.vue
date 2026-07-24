<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md";
    type?: "button" | "submit";
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    variant: "primary",
    size: "md",
    type: "button",
    disabled: false,
    loading: false,
  },
);

defineEmits<{ (e: "click", event: MouseEvent): void }>();
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="(event) => $emit('click', event)"
    :class="['app-button', `app-button--${size}`, `app-button--${variant}`]"
  >
    <span
      v-if="loading"
      data-testid="spinner"
      class="app-button__spinner"
      aria-hidden="true"
    ></span>
    <slot />
  </button>
</template>

<style scoped lang="scss">
.app-button {
  @include flex-center;
  gap: $space-2;
  border: none;
  border-radius: $radius-sm;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease-in-out,
    opacity 0.15s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--sm {
    padding: $space-1 $space-3;
    font-size: $font-size-sm;
  }

  &--md {
    padding: $space-2 $space-4;
    font-size: $font-size-base;
  }

  &--primary {
    background-color: $color-brand-500;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: $color-brand-600;
    }
  }

  &--secondary {
    background-color: $color-gray-100;
    color: $color-gray-800;

    &:hover:not(:disabled) {
      background-color: $color-gray-200;
    }
  }

  &--danger {
    background-color: $color-danger-bg;
    color: $color-danger;

    &:hover:not(:disabled) {
      background-color: darken($color-danger-bg, 5%);
    }
  }

  &--ghost {
    background-color: transparent;
    color: $color-gray-600;

    &:hover:not(:disabled) {
      background-color: $color-gray-100;
    }
  }

  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: $radius-full;
    animation: app-button-spin 0.6s linear infinite;
  }
}

@keyframes app-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
