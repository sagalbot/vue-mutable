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

test("it defines a watcher for the prop that updates the mutable proxy with an updated value", async () => {
  const Wrapper = shallowMount(Stub, { propsData: { myProp: "hello world" } });
  expect(Wrapper.vm.$data._myProp).toEqual("hello world");

  Wrapper.setProps({ myProp: "goodbye world" });

  await Wrapper.vm.$nextTick();

  expect(Wrapper.vm.$data._myProp).toEqual("goodbye world");
});
