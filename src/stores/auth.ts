import { defineStore } from "pinia"
import type { User, LoginCredentials } from "@/types"

/**
 * Mock user directory standing in for a real backend user table.
 * NEVER store real plaintext passwords like this outside a demo.
 */
const MOCK_ACCOUNTS: Array<{ credentials: LoginCredentials; user: User }> = [
  {
    credentials: { email: "admin@taskflow.io", password: "admin123" },
    user: {
      id: "u-1",
      name: "Ava Chen",
      email: "admin@taskflow.io",
      role: "admin",
      avatarColor: "#4f46e5"
    }
  },
  {
    credentials: { email: "manager@taskflow.io", password: "manager123" },
    user: {
      id: "u-2",
      name: "Marcus Reyes",
      email: "manager@taskflow.io",
      role: "manager",
      avatarColor: "#059669"
    }
  },
  {
    credentials: { email: "member@taskflow.io", password: "member123" },
    user: {
      id: "u-3",
      name: "Priya Nair",
      email: "member@taskflow.io",
      role: "member",
      avatarColor: "#d97706"
    }
  }
]

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null as User | null,
    isAuthenticating: false,
    error: null as string | null
  }),
  getters: {
    isAuthenticated: (state): boolean => state.currentUser !== null,
    initials: (state): string => {
      if (!state.currentUser) return ""
      return state.currentUser.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
  },
  actions: {
    async login(credentials: LoginCredentials): Promise<boolean> {
      this.isAuthenticating = true
      this.error = null

      // Simulated network latency; swap for a real API call (e.g. axios.post).
      await new Promise((resolve) => setTimeout(resolve, 300))

      const match = MOCK_ACCOUNTS.find(
        (account) =>
          account.credentials.email.toLowerCase() === credentials.email.toLowerCase() &&
          account.credentials.password === credentials.password
      )

      this.isAuthenticating = false

      if (!match) {
        this.error = "Invalid email or password."
        return false
      }

      this.currentUser = match.user
      return true
    },
    logout(): void {
      this.currentUser = null
      this.error = null
    }
  }
})