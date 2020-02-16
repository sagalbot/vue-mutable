import { proxyMutableProps } from "./proxyMutableProps";

/**
 * @type {PluginObject}
 */
const VueMutable = {
  /**
   * @param Vue {VueConstructor}
   * @param options {{}}
   */
  install(Vue, options) {
    Vue.mixin(proxyMutableProps);
  }
};

export { VueMutable };
