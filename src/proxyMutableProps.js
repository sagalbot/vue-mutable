/**
 * @type {VueConstructor | ComponentOptions<Vue>}
 */
const proxyMutableProps = {
  beforeCreate() {
    const shouldProxy = getProxyable(this.props);
  }
};

const getProxyable = (props = {}) =>
  Object.keys(props).filter(
    prop => props[prop].hasOwnProperty("mutable") && props[prop].mutable
  );

export { proxyMutableProps, getProxyable };
