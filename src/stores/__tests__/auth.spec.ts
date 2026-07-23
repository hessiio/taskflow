import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";

describe("auth store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts unauthenticated", () => {
    const auth = useAuthStore();
    expect(auth.isAuthenticated).toBe(false);
    expect(auth.currentUser).toBeNull();
  });

  it("logs in with valid credentials", async () => {
    const auth = useAuthStore();
    const result = await auth.login({
      email: "admin@taskflow.io",
      password: "admin123",
    });

    expect(result).toBe(true);
    expect(auth.isAuthenticated).toBe(true);
    expect(auth.currentUser?.name).toBe("Ava Chen");
    expect(auth.error).toBeNull();
  });

  it("rejects invalid credentials and sets an error", async () => {
    const auth = useAuthStore();
    const result = await auth.login({
      email: "admin@taskflow.io",
      password: "wrong-password",
    });

    expect(result).toBe(false);
    expect(auth.isAuthenticated).toBe(false);
    expect(auth.error).toBe("Invalid email or password.");
  });

  it("computes initials from the current user's name", async () => {
    const auth = useAuthStore();
    await auth.login({ email: "manager@taskflow.io", password: "manager123" });

    expect(auth.initials).toBe("MR");
  });

  it("logs out and clears state", async () => {
    const auth = useAuthStore();
    await auth.login({ email: "admin@taskflow.io", password: "admin123" });
    auth.logout();

    expect(auth.isAuthenticated).toBe(false);
    expect(auth.currentUser).toBeNull();
  });
});
