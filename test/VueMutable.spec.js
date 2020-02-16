import { VueMutable } from "../src/vue-mutable";
import { createLocalVue } from "@vue/test-utils";

test("it is installable", () => {
  expect(typeof VueMutable.install).toBe("function");
});

test("it registers a global mixin", () => {
  const localVue = createLocalVue();
  localVue.use(VueMutable);
  expect(localVue._installedPlugins.length).toEqual(1);
});
