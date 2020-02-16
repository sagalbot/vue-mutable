import { getProxyable } from "../src/proxyMutableProps";

test("it determines which props to proxy", () => {
  const proxyable = getProxyable({
    shouldProxy: { mutable: true },
    shouldNotProxy: {},
    definitelyWontProxy: { mutable: false }
  });

  expect(proxyable).toEqual(["shouldProxy"]);
});
