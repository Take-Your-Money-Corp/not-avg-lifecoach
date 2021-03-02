import ChatMessenger from "@/components/ChatMessenger";
import { mount } from "@vue/test-utils";
import { makeHandshake, postMessage } from "@/services/axios";
import flushPromises from "flush-promises";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("ChatMessenger", () => {
  const mockToken = "I-R-A-Rest-Token";

  beforeEach(() => {
    mock
      .onGet("http://localhost:3000/rest/token")
      .reply(200, { id: mockToken });
  });

  it.only("performs handshake when component mounted", async () => {
    const wrapper = mount(ChatMessenger);
    await flushPromises();
    expect(wrapper.vm.$data.nlpRestToken).toEqual(mockToken);
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

  it("Calls postMessage and confirms that component data is updated", async () => {
    const mockToken = "I-R-A-Rest-Token";
    const userMessage = "I am a user message";
    makeHandshake.mockResolvedValueOnce(mockToken);
    const wrapper = mount(ChatMessenger);

    await flushPromises();
    expect(makeHandshake).toHaveBeenCalledTimes(1);
    postMessage.mockResolvedValueOnce(userMessage);

    await flushPromises();
    expect(postMessage).toHaveBeenCalledTimes(1);
    const componentMessage = wrapper.vm.ourMessage;
    expect(componentMessage).toEqual(userMessage);
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
