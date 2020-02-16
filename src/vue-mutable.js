import { proxyMutableProps as mutableProps } from "./proxyMutableProps";

/**
 * @type {PluginObject}
 */
const VueMutable = {
  /**
   * @param Vue {VueConstructor}
   * @param options {{}}
   */
  install(Vue, options) {
    Vue.mixin(mutableProps);
  }
};

export { VueMutable, mutableProps };
