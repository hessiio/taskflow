<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <div class="default-layout__body">
      <AppSidebar />
      <main class="default-layout__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__body {
    display: flex;
    flex: 1;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }
}
</style>
