import ChatMessenger from "@/components/ChatMessenger";
import { mount } from "@vue/test-utils";
import { makeHandshake } from "@/services/axios";
import flushPromises from "flush-promises";

jest.mock("@/services/axios");
beforeEach(() => {
  jest.clearAllMocks();
});

describe("ChatMessenger", () => {
  it("Calls makeHandshake and updates component data token", async () => {
    const mockToken = "I-R-A-Rest-Token";
    makeHandshake.mockResolvedValueOnce(mockToken);
    const wrapper = mount(ChatMessenger);
    await flushPromises();
    expect(makeHandshake).toHaveBeenCalledTimes(1);
    const componentToken = wrapper.vm.nlpRestToken;
    expect(componentToken).toEqual(mockToken);
  });

  it("Calls makeHandshake and sets error component variable", async () => {
    const mockError = "handshake api call is unsuccessful";
    makeHandshake.mockRejectedValueOnce(mockError);
    const wrapper = mount(ChatMessenger);
    await flushPromises();
    expect(makeHandshake).toHaveBeenCalledTimes(1);
    const errorMessage = wrapper.vm.error;
    expect(errorMessage).toEqual(mockError);
  });
});
