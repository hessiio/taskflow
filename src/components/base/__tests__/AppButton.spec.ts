import AppButton from "../AppButton.vue";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

describe("AppButton", () => {
  it("renders slot content", () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: "Save changes",
      },
    });

    expect(wrapper.text()).toBe("Save changes");
  });

  it("defaults to the primary variant and md size", () => {
    const wrapper = mount(AppButton);

    expect(wrapper.classes()).toContain("app-button--primary");
    expect(wrapper.classes()).toContain("app-button--md");
  });

  it("applies the requested variant and size", () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: "secondary",
        size: "sm",
      },
    });

    expect(wrapper.classes()).toContain("app-button--secondary");
    expect(wrapper.classes()).toContain("app-button--sm");
  });

  it("emits click when enabled", async () => {
    const wrapper = mount(AppButton);

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("is disabled and shows the spinner while loading", () => {
    const wrapper = mount(AppButton, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.find('[data-testid="spinner"]').exists()).toBeTruthy();
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: "Test Content",
      },
      props: {
        loading: true,
      },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });
});
