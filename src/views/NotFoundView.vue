<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <p class="not-found__code">404</p>
    <h1 class="not-found__title">Page not found</h1>
    <p class="not-found__subtitle">
      The page you're looking for doesn't exist.
    </p>
    <RouterLink to="/">Back to dashboard</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  min-height: 100vh;
  @include flex-center;
  flex-direction: column;
  gap: $space-2;
  text-align: center;

  &__code {
    font-size: 3rem;
    font-weight: 800;
    color: $color-brand-500;
  }

  &__title {
    font-size: $font-size-xl;
  }

  &__subtitle {
    color: $color-text-muted;
    margin-bottom: $space-4;
  }
}
</style>
