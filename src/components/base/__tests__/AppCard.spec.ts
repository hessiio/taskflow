import { mount } from "@vue/test-utils";
import AppCard from "../AppCard.vue";

describe("AppCard", () => {
  it("renders the default slot", () => {
    const wrapper = mount(AppCard, {
      slots: {
        default: "Body content",
      },
    });

    expect(wrapper.text()).toContain("Body content");
  });

  it("renders a title when provided", () => {
    const wrapper = mount(AppCard, {
      props: {
        title: "Recent activity",
      },
    });

    expect(wrapper.text()).toContain("Recent activity");
  });

  it("does not render a header when no title or actions slot is given", () => {
    const wrapper = mount(AppCard);

    expect(wrapper.find('[data-testid="card-header"]').exists()).toBe(false);
  });
});
