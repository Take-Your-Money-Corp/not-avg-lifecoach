import { mount } from "@vue/test-utils";
import User from "@/components/User.vue";

describe("User.vue", () => {
  it("Renders the user's message when passed", () => {
    const userMessage = "I am some text that a user would say";
    const wrapper = mount(User, {
      propsData: {
        conversation: [
          {
            chatStyle: "user",
            text: userMessage
          }
        ],
        index: 0
      }
    });

    expect(
      wrapper.find('[data-testid="userMessage"]').element.textContent
    ).toMatch(userMessage);
  });
});
