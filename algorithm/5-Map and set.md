## Summary
- Map – is a collection of keyed values.

```js
let map = new Map();
map.set('name', 'John');
map.set('age', 30);
map.set('city', 'New York');

// Retrieving values
console.log(map.get('name')); // 'John'
console.log(map.get('age')); // 30

// Checking if a key exists
console.log(map.has('city')); // true

// Iterating through the map
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

```

## Set
- Set – is a collection of unique values.
```js
let set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(2);  // Duplicate, won't be added

console.log(set);  // Set { 1, 2, 3 }

// Checking if a value exists
console.log(set.has(2)); // true
console.log(set.has(4)); // false

// Iterating through the set
set.forEach(value => {
  console.log(value);
});


```