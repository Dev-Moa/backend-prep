## A cheat sheet of array methods:

### **1. Adding/Removing Elements:**

**push(...items)**
Adds items to the end:
```javascript
let arr = [1, 2];
arr.push(3, 4);
console.log(arr); // [1, 2, 3, 4]
```

**pop()**
Removes the last element:
```javascript
let arr = [1, 2, 3];
let last = arr.pop();
console.log(last); // 3, arr becomes [1, 2]
```

**shift()**
Removes the first element:
```javascript
let arr = [1, 2, 3];
let first = arr.shift();
console.log(first); // 1, arr becomes [2, 3]
```

**unshift(...items)**
Adds items to the beginning:
```javascript
let arr = [3, 4];
arr.unshift(1, 2);
console.log(arr); // [1, 2, 3, 4]
```

**splice(pos, deleteCount, ...items)**
Modifies array by deleting/inserting elements:
```javascript
let arr = [1, 2, 5, 6];
arr.splice(2, 0, 3, 4); // Insert at index 2
console.log(arr); // [1, 2, 3, 4, 5, 6]

arr.splice(0, 2); // Remove first two elements
console.log(arr); // [3, 4, 5, 6]
```

**slice(start, end)**
Creates a subarray:
```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 3)); // [2, 3]
console.log(arr.slice(-2)); // [4, 5] (last two elements)
```

**concat(...items)**
Merges arrays:
```javascript
let arr1 = [1, 2];
let arr2 = [3, [4]];
console.log(arr1.concat(arr2)); // [1, 2, 3, [4]]
```

---

### **2. Searching Elements:**

**indexOf(item, pos)**
Finds first occurrence:
```javascript
let arr = [1, 2, 3, 2];
console.log(arr.indexOf(2)); // 1
console.log(arr.indexOf(2, 2)); // 3
```

**lastIndexOf(item, pos)**
Finds last occurrence:
```javascript
console.log(arr.lastIndexOf(2)); // 3
```

**includes(value)**
Checks existence:
```javascript
console.log(arr.includes(3)); // true
```

**find(func)**
Finds first matching element:
```javascript
let users = [{id: 1}, {id: 2}];
console.log(users.find(u => u.id === 2)); // {id: 2}
```

**filter(func)**
Finds all matching elements:
```javascript
let nums = [1, 2, 3, 4];
console.log(nums.filter(n => n % 2 === 0)); // [2, 4]
```

**findIndex(func)**
Returns index of first match:
```javascript
console.log(nums.findIndex(n => n > 3)); // 3 (index of 4)
```

---

### **3. Iterating and Transforming: :**

**forEach(func)**
Executes a function for each element:
```javascript
[1, 2, 3].forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
```

**map(func)**
Creates a transformed array:
```javascript
console.log([1, 2, 3].map(n => n * 2)); // [2, 4, 6]
```

**sort(func)**
Sorts in place (lexicographical by default):
```javascript
let arr = [10, 2, 5];
arr.sort((a, b) => a - b); // Numeric sort
console.log(arr); // [2, 5, 10]
```

**reverse()**
Reverses array in place:
```javascript
arr.reverse();
console.log(arr); // [10, 5, 2]
```

**reduce(func, initial)**
Accumulates a value:
```javascript
console.log([1, 2, 3].reduce((sum, n) => sum + n, 0)); // 6
```

# NOTE
- Please note that methods sort, reverse and splice modify the array itself.
- These methods are the most used ones, they cover 99% of use cases

