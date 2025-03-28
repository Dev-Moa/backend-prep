### **1. Most Critical Methods (80% of Use Cases):**

#### **Basic Operations**
- `str.length`: Get the length of a string.
- `str[index]` or `str.charAt(index)`: Access a character at a specific index.
```js
let str = "Hello";
console.log(str[1]); // "e"
console.log(str.at(-1)); // "o"
let text = "HELLO WORLD";
let letter = text.charAt(0); // "H"
console.log(letter);
```
#### **Searching**
- `str.indexOf(substr)`: Find the index of the first occurrence of a substring.
- `str.includes(substr)`: Check if a substring exists within a string.
- `str.startsWith(substr)`: Check if the string starts with a specific substring.
- `str.endsWith(substr)`: Check if the string ends with a specific substring.

```js
let str = "Hello, World!";
console.log(str.indexOf("World")); // 7
console.log(str.includes("Hello")); // true
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!")); // true

```

#### **Modification**
- `str.toLowerCase()`: Convert the string to lowercase.
- `str.toUpperCase()`: Convert the string to uppercase.
- `str.trim()`: Remove leading and trailing whitespace.
- `str.replace(searchValue, replaceValue)`: Replace occurrences of a substring.
- `repeat(n)`**: Repeat the string `n` times.

#### **Splitting/Joining**
- `str.split(separator)`: Split the string into an array based on a separator.
- `array.join(separator)`: Join an array of strings into a single string with a separator.

#### **Extracting**
- `slice(start, end)`: Extracts a portion of the string.

```js
let str = "Hello, World!";
```
---

### **2. Regular Expressions (Important for Validation)**

#### **Search and Replace with Regular Expressions**
- `match()`: Find all occurrences of a pattern in a string.
- `replace()`: Replace parts of a string that match a pattern.
- `search()`: Find the index of the first match or `-1` if not found.
- `split()`: Split a string into an array based on a pattern.
```javascript
// match
let str = "The rain in SPAIN stays mainly in the plain";
let result = str.match(/ain/g); // Find all occurrences of "ain"
console.log(result); // ["ain", "ain", "ain"]

// replace
let str = "Hello, World!";
console.log(str.replace(/World/, "JavaScript")); // "Hello, JavaScript!"


// search : It returns the index of the first match or -1 if no match is found.
let str = "Hello, World!";
let index = str.search(/World/);
console.log(index); // 7 (index where "World" starts)

let noMatch = str.search(/JavaScript/);
console.log(noMatch); // -1 (no match found)

// split

let str = "Hello, World! How are you?";
let words = str.split(/\s+/); // Split by whitespace
console.log(words); // ["Hello,", "World!", "How", "are", "you?"]

let chars = str.split(""); // Split into individual characters
console.log(chars); // ["H", "e", "l", "l", "o", ",", " ", "W", "o", "r", "l", "d", "!", " ", "H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", "?"]
```
---

### **3. Quotes and String Literals**
- Single quotes (`'`)
- double quotes (`"`)
- backticks (`` ` ``)
- Backticks allow:
  - Multi-line strings.
  - Embedding expressions using `${...}` (template literals).

```js
let name = "John";
let message = `Hello, ${name}!
This is a multi-line string.`;
```

----
### **4. Special Characters**
- Common special characters include:
- `\n` (newline),
- `\t` (tab),
- `\\` (backslash).
```js
let str = "Hello\nWorld!";
console.log(str); // Prints "Hello" and "World!" on separate lines
```
---

