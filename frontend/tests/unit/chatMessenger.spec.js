import ChatMessenger from "@/components/ChatMessenger";
import { mount } from "@vue/test-utils";
import { makeHandshake } from "@/services/axios";
import flushPromises from "flush-promises";

jest.mock("@/services/axios");
beforeEach(() => {
  jest.clearAllMocks();
});

describe("ChatMessenger", () => {
  it("Makes handshake with backend and returns token id", async () => {
    const mockToken = "I-R-A-Rest-Token";
    makeHandshake.mockResolvedValueOnce(mockToken);
    const wrapper = mount(ChatMessenger);
    await flushPromises();
    expect(makeHandshake).toHaveBeenCalledTimes(1);
    const componentToken = wrapper.vm.nlpRestToken;
    expect(componentToken).toEqual(mockToken);
  });

  //   it("Displays an error when getMessage call fails", async () => {
  //     const mockError = "Oops! Something went wrong.";
  //     getMessage.mockRejectedValueOnce({ text: mockError });
  //     const wrapper = mount(MessageDisplay);
  //     await flushPromises();
  //     expect(getMessage).toHaveBeenCalledTimes(1);
  //     const error = wrapper.find('[data-testid="message-error"]').element
  //       .textContent;
  //     expect(error).toEqual(error);
  //   });
});
