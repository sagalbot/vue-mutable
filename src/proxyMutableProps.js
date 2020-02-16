/**
 * @type {VueConstructor | ComponentOptions<Vue>}
 */
const proxyMutableProps = {
  /**
   * Add mutable props to the data object.
   */
  data() {
    const data = {};

    getProxyable(this.__proto__.constructor.sealedOptions.props).forEach(
      prop => (data[`_${prop}`] = undefined)
    );

    return data;
  },
  /**
   * Set data properties, add watchers
   */
  mounted() {
    getProxyable(this.__proto__.constructor.sealedOptions.props).forEach(
      prop => {
        setDataProperty(prop, this);
        setPropWatcher(prop, this);
      }
    );
  }
};

/**
 * Find the props that should be proxied.
 * @param props {object}
 * @return {string[]}
 */
const getProxyable = props =>
  Object.keys(props).filter(
    prop => props[prop].hasOwnProperty("mutable") && props[prop].mutable
  );

/**
 * @param propName {string}
 * @param vue {Component}
 */
function setPropWatcher(propName, vue) {
  vue.$watch(propName, updated => (vue.$data[`_${propName}`] = updated));
}

/**
 * @param propName {string}
 * @param vue {Component}
 */
function setDataProperty(propName, vue) {
  vue.$data[`_${propName}`] = vue[propName];
}

export { proxyMutableProps, getProxyable };
