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
      }
    );
  }
};

const getProxyable = props => {
  return Object.keys(props).filter(
    prop => props[prop].hasOwnProperty("mutable") && props[prop].mutable
  );
};

/**
 * @param propName {string}
 * @param vue {Component}
 */
const setDataProperty = (propName, vue) => {
  return (vue.$data[`_${propName}`] = vue[propName]);
};

export { proxyMutableProps, getProxyable };
