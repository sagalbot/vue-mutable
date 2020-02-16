/**
 * @type {VueConstructor | ComponentOptions<Vue>}
 */
const proxyMutableProps = {
  data() {
    const data = {};

    getProxyable(this.__proto__.constructor.sealedOptions.props).forEach(
      prop => (data[`_${prop}`] = undefined)
    );

    return data;
  },
  mounted() {
    getProxyable(this.__proto__.constructor.sealedOptions.props).forEach(
      prop => {
        this.$data[`_${prop}`] = this[prop];
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
 *
 * @param propName {string}
 * @param vue {Component}
 */
const setDataProperty = (propName, vue) => {
  vue.$set(vue, `_${propName}`, vue[propName]);
};

export { proxyMutableProps, getProxyable };
