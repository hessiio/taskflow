import { mount } from "@vue/test-utils";
import AppInput from "../AppInput.vue";

describe("AppInput", () => {
  it("renders the label and current value", () => {
    const wrapper = mount(AppInput, {
      props: {
        label: "Name",
        modelValue: "hello",
      },
    });
    const input = wrapper.find('[data-testid="form-input"]');

    expect((input.element as HTMLInputElement).value).toBe("hello");
    expect(wrapper.text()).toContain("Name");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(AppInput, {
      props: {
        label: "Name",
        modelValue: "",
      },
    });

    const input = wrapper.find('[data-testid="form-input"]');
    await input.setValue("Ada");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["Ada"]);
  });

  it("shows an error message when provided", () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: "",
        label: "Email",
        error: "Email is required.",
      },
    });
    const input = wrapper.find('[data-testid="form-input"]');

    expect(wrapper.text()).toContain("Email is required.");
    expect(input.classes()).toContain("app-input--error");
  });

  it("does not render an error message when non is provided", () => {
    const wrapper = mount(AppInput, {
      props: {
        label: "Email",
        modelValue: "",
      },
    });
    const input = wrapper.find('[data-testid="form-input"]');
    const errorElement = wrapper.find('[data-testid="form-error"]');

    expect(errorElement.exists()).toBe(false);
    expect(input.classes()).not.toContain("app-input--error");
  });
});
