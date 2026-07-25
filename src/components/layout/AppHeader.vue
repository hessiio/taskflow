<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

function handleLogout() {
  auth.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__brand">TaskFlow</RouterLink>
    <div class="app-header__user" v-if="auth.currentUser">
      <span
        class="app-header__avatar"
        :style="{ backgroundColor: auth.currentUser.avatarColor }"
      >
        {{ auth.initials }}
      </span>
      <div class="app-header__user-info">
        <p class="app-header__user-name">{{ auth.currentUser.name }}</p>
        <p class="app-header__user-role">{{ auth.currentUser.role }}</p>
      </div>
      <button
        data-testid="logout-btn"
        class="app-header__logout"
        @click="handleLogout"
      >
        Sign out
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  @include flex-between;
  height: $header-height;
  padding: 0 $space-6;
  background-color: $color-surface;
  border-bottom: 1px solid $color-border;
  position: sticky;
  top: 0;
  z-index: $z-header;

  &__brand {
    font-size: $font-size-lg;
    font-weight: 800;
    color: $color-brand-600;
    text-decoration: none;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__avatar {
    @include flex-center;
    width: 36px;
    height: 36px;
    border-radius: $radius-full;
    color: #fff;
    font-weight: 700;
    font-size: $font-size-sm;
  }

  &__user-info {
    line-height: 1.2;
  }

  &__user-name {
    font-weight: 600;
    font-size: $font-size-sm;
  }

  &__user-role {
    font-size: $font-size-xs;
    color: $color-text-muted;
    text-transform: capitalize;
  }

  &__logout {
    background-color: transparent;
    color: $color-gray-600;
    font-weight: 500;
    padding: $space-1 $space-3;

    &:hover {
      background-color: $color-gray-100;
    }
  }
}
</style>
