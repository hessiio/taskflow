<script setup lang="ts">
import type { HTMLInputElement } from "happy-dom";

defineProps<{
  label: string;
  type?: "text" | "email" | "password" | "date";
  modelValue: string;
  placeholder?: string;
  error?: string | null;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="form-group">
    <label class="form-label">{{ label }}</label>
    <input
      data-testid="form-input"
      class="app-input"
      :class="{ 'app-input--error': !!error }"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as unknown as HTMLInputElement).value,
        )
      "
    />
    <p v-if="error" class="form-error" data-testid="form-error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
.app-input {
  padding: $space-2 $space-3;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-base;
  background-color: $color-surface;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: $color-brand-500;
  }

  &--error {
    border-color: $color-danger;
  }
}
</style>
