<script setup lang="ts">
const links = [
  { to: { name: "dashboard" }, label: "Dashboard", icon: "grid" },
  { to: { name: "projects" }, label: "Projects", icon: "folder" },
];
</script>

<template>
  <aside class="app-sidebar">
    <nav class="app-sidebar__nav">
      <RouterLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="app-sidebar__link"
        active-class="app-sidebar__link--active"
        data-testid="router-link"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.app-sidebar {
  width: $sidebar-width;
  border-right: 1px solid $color-border;
  background-color: $color-surface;
  padding: $space-6 $space-3;

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__link {
    padding: $space-2 $space-3;
    border-radius: $radius-sm;
    font-weight: 500;
    color: $color-gray-600;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: $color-gray-100;
      text-decoration: none;
    }

    &--active {
      background-color: $color-brand-50;
      color: $color-brand-700;
      font-weight: 700;
    }
  }
}
</style>
