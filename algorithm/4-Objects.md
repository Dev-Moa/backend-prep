# Summary

**Object.keys, values, entries**
- For plain objects, the following methods are available:
- Object.keys(obj) – returns an array of keys.
- Object.values(obj) – returns an array of values.
- Object.entries(obj) – returns an array of [key, value] pairs.

```js
let user = {
  name: "John",
  age: 30
};
```

```sh
Object.keys(user) = ["name", "age"]
Object.values(user) = ["John", 30]
Object.entries(user) = [ ["name","John"], ["age",30] ]
```