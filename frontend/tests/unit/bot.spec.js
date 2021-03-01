import { mount } from "@vue/test-utils";
import Bot from "@/components/Bot.vue";

describe("Bot.vue", () => {
  it("Renders the bot's message when passed", () => {
    const botMessage =
      "Hello, I am your Motivational Lifecoach, ask me anything!";
    const wrapper = mount(Bot, {
      propsData: {
        conversation: [
          {
            chatStyle: "bot",
            message: botMessage
          }
        ],
        index: 0
      }
    });

    expect(
      wrapper.find('[data-testid="botMessage"]').element.textContent
    ).toMatch(botMessage);
  });
});
