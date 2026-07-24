import { mount } from "@vue/test-utils";
import AppBadge from "../AppBadge.vue";

describe("AppBadge", () => {
  it("renders slot content", () => {
    const wrapper = mount(AppBadge, {
      slots: {
        default: "Planning",
      },
    });

    expect(wrapper.text()).toContain("Planning");
  });

  it("defaults to the neutral", () => {
    const wrapper = mount(AppBadge);

    expect(wrapper.classes()).toContain("status-badge--neutral");
  });

  it("applies the requested tone", () => {
    const wrapper = mount(AppBadge, {
      props: {
        tone: "danger",
      },
    });

    expect(wrapper.classes()).toContain("status-badge--danger");
  });
});
