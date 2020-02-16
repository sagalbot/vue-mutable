import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import { getProxyable, proxyMutableProps } from "../src/proxyMutableProps";

/**
 *
 * @type {VueConstructor}
 */
const Stub = Vue.component("stub", {
  render: createElement => createElement("div"),
  mixins: [proxyMutableProps],
  props: {
    myProp: {
      mutable: true
    }
  }
});

test("it determines which props to proxy", () => {
  const proxyable = getProxyable({
    shouldProxy: { mutable: true },
    shouldNotProxy: {},
    definitelyWontProxy: { mutable: false }
  });

  expect(proxyable).toEqual(["shouldProxy"]);
});

test("it defines internal data properties for proxyable props", () => {
  const Wrapper = shallowMount(Stub, { propsData: { myProp: "hello world" } });
  expect(Wrapper.vm.$data).toHaveProperty("_myProp");
});

test("it sets internal data properties for proxyable props", () => {
  const Wrapper = shallowMount(Stub, { propsData: { myProp: "hello world" } });
  expect(Wrapper.vm.$data._myProp).toEqual("hello world");
});
