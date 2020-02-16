# Vue Mutable

> Proxy your props into mutable local state.

## Before

If you need to modify a prop in a components local state, you need to do a few things:

1. Define the data property
2. Set the data property value to the prop value in a lifecycle hook
3. Set a watcher for the prop so that if the parent updates the value, the internal value is synced

```js
{
  props: {
    options: {
      default: [],
    }
  },
  data() {
    return {
      _options: [],
    }
  },
  created() {
    this.$data._options = this.options;
  },
  watch: {
    options(new, old) {
      this.$data._options = new;
    }
  }
}
```

## After

Vue Mutable simplifies the process for you. Flag any prop as `mutable` and it will be accessible internally as a data property.

```js
{
  props: {
    options: {
      default: [],
      mutable: true
    }
  },
}
```

This will allow you to use `this.$data._options` in your component.
