<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppInput from "@/components/base/AppInput.vue";
import AppButton from "@/components/base/AppButton.vue";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const validationError = ref<string | null>(null);

async function handleSubmit() {
  validationError.value = null;

  if (!email.value || !password.value) {
    validationError.value = "Enter both an email and a password.";
    return;
  }

  const success = await auth.login({
    email: email.value,
    password: password.value,
  });
  if (!success) return;

  const redirect =
    typeof route.query.redirect === "string" ? route.query.redirect : "/";
  router.push(redirect);
}
</script>

<template>
  <div class="login">
    <div class="login__panel">
      <h1 class="login__title">TaskFlow</h1>
      <p class="login__subtitle">Sign in to manage your team's projects.</p>

      <form
        class="login__form"
        data-testid="login-form"
        @submit.prevent="handleSubmit"
      >
        <AppInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="you@taskflow.io"
        />
        <AppInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="********"
        />

        <p v-if="validationError || auth.error" class="form-error">
          {{ validationError || auth.error }}
        </p>

        <AppButton type="submit" :loading="auth.isAuthenticating">
          Sign in
        </AppButton>
      </form>

      <div class="login__demo">
        <p class="login__demo-title">Demo accounts</p>
        <ul>
          <li>admin@taskflow.io / admin123</li>
          <li>manager@taskflow.io / manager123</li>
          <li>member@taskflow.io / member123</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  min-height: 100vh;
  @include flex-center;
  background-color: $color-bg;
  padding: $space-6;

  &__panel {
    @include surface($radius-lg);
    width: 100%;
    max-width: 380px;
    padding: $space-8;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 800;
    color: $color-brand-600;
  }

  &__subtitle {
    color: $color-text-muted;
    margin-top: $space-1;
    margin-bottom: $space-6;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__demo {
    margin-top: $space-6;
    padding-top: $space-6;
    border-top: 1px solid $color-border;
    font-size: $font-size-xs;
    color: $color-text-muted;

    &-title {
      font-weight: 600;
      margin-bottom: $space-1;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }
}
</style>
