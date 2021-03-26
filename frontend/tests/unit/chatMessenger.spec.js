import ChatMessenger from "@/views/ChatMessenger";
import { mount } from "@vue/test-utils";
import { makeHandshake, postMessage } from "@/services/axios";
import flushPromises from "flush-promises";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("ChatMessenger", () => {
  const mockToken = "I-R-A-Rest-Token";

  it.only("performs handshake when component mounted", async () => {
    mock
      .onGet("http://localhost:3000/rest/token")
      .reply(200, { id: mockToken });
    const wrapper = mount(ChatMessenger);
    await flushPromises();
    expect(wrapper.vm.$data.nlpRestToken).toEqual(mockToken);
  });

  it.only("sets error var on api request failure when component mounts", async () => {
    const mockError = "handshake api call is unsuccessful";
    mock.onGet("http://localhost:3000/rest/token").reply(404, mockError);
    const wrapper = mount(ChatMessenger);
    await flushPromises();
    expect(wrapper.vm.$data.error).toEqual(mockError);
  });
});
