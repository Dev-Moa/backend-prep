# Node.js Course
- How web works
- What Is Node.js
- Course Setup
- REPL
- Module Wrapper
- Modules In Depth
- ES6 Modules
- Path Module
- FS Module
- OS Module
- URL Module
- HTTP Module
- Routing In Node.js
- Serving Files In Node.js
- NPM Complete Course
- Node.js Behind The Scenes
- Node.js Events
- Streams In Node.js



# How The Web Works

## Request-Response Cycle
1. Browser (Client) enters URL: `https://google.com/maps`
   - Protocol (https://)
   - Domain name (google.com)
   - Resource (/maps)

2. DNS Lookup
   - Domain name converted to real IP address
   - Handled by Internet Service Provider (ISP)
   - Example: `google.com` → `142.251.16.100:443`

3. TCP/IP Connection
   - TCP (Transmission Control Protocol)
     - Breaks requests/responses into small packets
     - Reassembles packets at destination
   - IP (Internet Protocol)
     - Routes packets through internet
     - Ensures delivery using IP addresses

4. HTTP Request
   - Start Line
     - HTTP method (GET, POST, PUT, PATCH)
     - Request target (/maps)
     - HTTP version
   - Headers (browser info, time, language)
   - Body (for POST/PUT requests)

5. HTTP Response
   - Start Line
     - Status code (200 OK, 404 Not Found)
     - HTTP version
   - Headers (response info)
   - Body (HTML, JSON, etc.)

## Website Loading Process
1. Initial HTML file received
2. Browser scans HTML for assets
   - JavaScript files
   - CSS files
   - Images
   - Other resources
3. Separate HTTP request for each asset
4. Multiple concurrent requests (limited)
5. Browser renders website using received files

## HTTPS vs HTTP
- HTTPS: Encrypted using TLS/SSL
- Same request-response logic
- More secure for data transmission

# What is Node.js

- Node.js is a free open source cross platform js run time environment that lets developers write command line tools and serverside scripts outside of a browser

- why to use :
- built on top of js
- scalable
- performant
- large eco system
- cross platform

# Setup

- install node js
- install vs code and code runner

# REPL
- repl is an area where you can run your node js code

# Module Wrapper
The Module Wrapper Function in Node.js automatically wraps each module to provide a private scope, preventing variables from leaking globally and allowing each module to operate independently.

## How It Works
- Every module in Node.js is wrapped in an IIFE (Immediately Invoked Function Expression)
- Provides 5 important arguments:
  1. `exports`: Object to export module content
  2. `require`: Function to import modules
  3. `module`: Reference to current module
  4. `__filename`: Absolute path of current file
  5. `__dirname`: Absolute path of current directory

## Practical Example
```javascript
// math.js
const privateVariable = 42; // Only accessible within this module
const privateFunction = () => {
    return privateVariable * 2;
};

function add(a, b) {
    return a + b + privateFunction();
}

module.exports = add;
```

## How Node.js Wraps It
```javascript
(function(exports, require, module, __filename, __dirname) {
    const privateVariable = 42;
    const privateFunction = () => {
        return privateVariable * 2;
    };

    function add(a, b) {
        return a + b + privateFunction();
    }

    module.exports = add;
});
```

# Modules In Depth
- Modules are a way to pass our code from one file to another.
- it allows us to reuse our code , so we dont have to rewrite our code again and again .

## CommonJS Way (Traditional)

```js
// greet.js
const greet = ()=>{
    console.log("hello you");
    
}

module.exports = greet
```

```js
// index.js
const greet = require('./greet.js')
greet()

```
## ES6 Modules Way (Modern)

```js
// greet.js
export const greet = () => {
    console.log("hello you");
}

// You can also use default export
export default greet;
```

```js
// index.js
import { greet } from './greet.js'  // Named import
// OR
import greet from './greet.js'      // Default import
greet()
```


- initialize package.json

```sh
npm init -y
```

```json
{
  "name": "node-js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // add this line
  "scripts": {
    "dev": "node index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Dev-Moa/node-js.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Dev-Moa/node-js/issues"
  },
  "homepage": "https://github.com/Dev-Moa/node-js#readme"
}

```
- or another solution is to use .mjs extension for files

## Module Resolution Order
1. Core modules (like http, fs) checked first
2. Developer modules (starting with ./ or ../) checked in filesystem
3. NPM modules checked in node_modules folder

## Module Caching
- Modules are cached after first load
- Subsequent requires return cached result
- Ensures module code runs only once
- Improves performance

## Module Caching Example
```js
// test-module.js
console.log('Module code executed');  // Runs only once
module.exports = function() {
    console.log('Function called');
};

// main.js
require('./test-module')();  // Logs: Module code executed, Function called
require('./test-module')();  // Logs: Function called
require('./test-module')();  // Logs: Function called
```

## Export Patterns Comparison
1. Single Export (use module.exports):
```js
// When exporting one thing
module.exports = function add(a, b) {
    return a + b;
};
```

2. Multiple Exports (use exports):
```js
// When exporting multiple items
exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;
```

## Export Patterns - Practical Examples
1. Class Export:
```js
// Single class export
module.exports = class Calculator {
    add(a, b) { return a + b; }
    multiply(a, b) { return a * b; }
};
```

2. Multiple Functions with Destructuring:
```js
// Export multiple functions
exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;

// Import with destructuring
const { add, multiply } = require('./math');
```

# Path Module

- The **Path Module** in Node.js provides utilities for working with file and directory paths.

```js
import path from "path"

// basename() returns filename from a path
console.log(path.basename('/folder/file.txt')); // "file.txt"
// dirname() return directory name from a path
console.log(path.dirname('/folder/file.txt')); // "/folder"
//extname() returns the file extension of the path.
console.log(path.extname('file.txt')); // ".txt"
// joins multiple path segments into a single normalized path.
console.log(path.join('/folder', 'subfolder', 'file.txt'));
// normalizes broken path
console.log(path.normalize('/folder//file.txt//'));
// parse returns an object from a path string
console.log(path.parse('/folder//file.txt//'));

```

# FS Module

- The FS (File System) Module in Node.js provides functionalities to interact with the file system. It allows you to read, write, delete, and manipulate files and directories, essential for building applications that manage data pesrsistently.

- promise api

```js
import * as fs from "fs/promises"

//  folder
try {
    // creates new dir
    await fs.mkdir("c:\\nodejs")
    // if you want create multiple folder inside each other
    await fs.mkdir("c:\\nodejs",{recursive:true})
    // read content of a folder / dir
    const files = await fs.readdir("c:\\nodejs")
    for (const file of files){
        console.log(file);
    }
    // remove dir
    await fs.rmdir("c:\\courses\\backend\\nodejs")

} catch (error) {
    console.log(error);
}
// files
try {
    // create and write files
    await fs.writeFile("README.md","Hello Devmoha")
    // read file utf-8 otherwise it will be buffer
    const data = await fs.readFile("README.md","utf-8")
    console.log(data);
    // append new data to existing file
    await fs.appendFile("README.md","\n yes lets go ")
    // copy file data from one file to another file
    await fs.copyFile("README.md","info.txt")
     // get file info
    const info = await fs.stat("info.txt")
    console.log(info);
    console.log(info.isDirectory());
    console.log(info.isFile());
} catch (error) {
    console.log(error);
}

```

# OS Module 
- operating system module give more info about your operating system

```js
import os from "os"
// returns platform name like win linux etc
console.log(os.platform());
// returns the operating system CPU architecture like 'arm'
console.log(os.arch());
// returns an array of objects containing information about each logical CPU core.
console.log(os.cpus());
// returns the host name of the operating system as a string.
console.log(os.hostname());
// returns the string path of the current user's home directory.
console.log(os.homedir());
// returns an object containing network interfaces that have been assigned a network address.
console.log(os.networkInterfaces());
// returns the amount of free system memory in bytes as an integer.
console.log(os.freemem());
// returns the total amount of system memory in bytes as an integer.
console.log(os.totalmem());
```

# Url module

```js
import { URL } from "url"

const url = new URL("https://maankabe.com:8000/courses/q?name=golang#foo")

// Gets and sets the fragment portion of the URL.
console.log(url.hash); // #foo
// Gets and sets the host portion of the URL
console.log(url.host); // maankabe.com:8000
// Gets and sets the host name portion of the URL.
console.log(url.hostname); // maankabe.com
// Gets and sets the port portion of the URL.
console.log(url.port); // 8000
// Gets and sets the serialized URL.
console.log(url.href); // full url
// Gets and sets the protocol portion of the URL.
console.log(url.protocol); // https
// Gets and sets the serialized query portion of the URL.
console.log(url.search); // ?name=golang
// Gets the URLSearchParams object representing the query parameters of the URL.
console.log(url.searchParams); // URLSearchParams { 'name' => 'golang' }

```

# Http Module

```js
import http from "http"

const server = http.createServer((req,res)=>{
    res.setHeader("Content-Type","text/json")
    res.statusCode=404
    res.statusMessage="BAD"
    res.writeHead(200,"ok")
    res.write("<h1>hello world</h1>")
})

server.listen(8000,()=>{
    console.log("server running on",8000);
})

```

# Routing

```js
import http from "http"

const server = http.createServer((req,res)=>{
   if(req.url==="/"){
    res.end("<h1>Home</h1>")
   }else if(req.url==="/about"){
    res.end("<h1>about</h1>")
   } else {
    res.end("<h1>404 Not found</h1>")
   }
})

server.listen(8000,()=>{
    console.log("server running on",8000);
})

```

# Serving static files

```js
import http from "http"
import * as fs from "fs/promises"

const server = http.createServer(async (req,res)=>{
   if(req.url==="/"){
    try {
        // read html file and send its data as response
        const data = await fs.readFile("home.html","utf-8")
        res.end(data)
    } catch (error) {
        res.end(error)
    }
   }
   else {
    res.end("<h1>404 Not found</h1>")
   }
})

server.listen(8000,()=>{
    console.log("server running on",8000);
})

```

# Npm
- NPM is both:
  1. Command line interface (CLI) tool that comes with Node.js
  2. World's largest software registry for JavaScript packages

## Key Features
- Automatically included with Node.js installation
- Manages open-source packages in projects
- Used across entire JavaScript ecosystem (both backend and frontend)
- Hosts over 800,000 packages at npmjs.com

## Project Initialization
```js
// Create new project with package.json
npm init        // Interactive mode
npm init -y     // Accept all defaults
```

## package.json
- Configuration file for Node.js projects
- Created by `npm init`
- Contains:
  - Project metadata (name, version, description)
  - Dependencies
  - Scripts
  - Entry point
  - Author info
  - License

Example package.json:
```json
{
  "name": "node-project",
  "version": "1.0.0",
  "description": "Learning Node.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Your Name",
  "license": "ISC"
}
```

## Common NPM Commands
```bash
npm install package-name        # Install package
npm install -g package-name    # Install globally
npm install --save-dev         # Install as dev dependency
npm uninstall package-name     # Remove package
npm update                     # Update packages
npm list                       # List installed packages

```

## Package Versioning
- Packages follow semantic versioning (X.Y.Z):
  - X: Major version (breaking changes)
  - Y: Minor version (new features, backward compatible)
  - Z: Patch version (bug fixes)

## Version Symbols in package.json
- `^`: Accepts minor and patch updates (default)
- `~`: Accepts only patch updates
- `*`: Accepts all updates (not recommended)

## Package Management Commands
```bash
npm outdated           # Check for outdated packages
npm install pkg@1.0.0  # Install specific version
npm update pkg         # Update package
```

# Node.js Behind The Scenes

## Core Architecture
1. V8 Engine (C++ & JavaScript)
   - Converts JavaScript → Machine code
   - Core of JavaScript execution

2. libuv (C++)
   - Handles async I/O operations
   - Provides:
     - Event Loop: Manages callbacks & network I/O
     - Thread Pool: Handles CPU-intensive tasks
     - System access (OS, filesystem, networking)

## Process Flow
1. Node.js starts:
   ```
   [Program Launch]
         ↓
   [Execute top-level code]
         ↓
   [Register callbacks]
         ↓
   [Start Event Loop]
   ```

2. Thread Management:
   - Main Thread: Handles all user connections
   - Thread Pool: 4 additional threads (max 128)
     - Handles: File ops, Crypto, Compression, DNS

## Event Loop Architecture
```
┌────────────────────────────────────┐
│           Event Loop               │
│                                    │
│ ┌──────────┐  ┌──────────┐        │
│ │  Timers  │  │   I/O    │        │
│ └──────────┘  └──────────┘        │
│                                    │
│ ┌──────────┐  ┌──────────┐        │
│ │setImmed. │  │  Close   │        │
│ └──────────┘  └──────────┘        │
└────────────────────────────────────┘
```
```js
import fs from 'fs';
import crypto from 'crypto';

// Record start time
const start = Date.now();

// Process.nextTick example
process.nextTick(() => {
    console.log('Process.nextTick executed');
});

// Timer examples
setTimeout(() => {
    console.log('Timer 1 finished - 0s', Date.now() - start);
}, 0);

setTimeout(() => {
    console.log('Timer 2 finished - 0s', Date.now() - start);
}, 0);

setTimeout(() => {
    console.log('Timer 3 finished - 3s', Date.now() - start);
}, 3000);

// Immediate example
setImmediate(() => {
    console.log('Immediate 1 finished', Date.now() - start);
});

// I/O example
fs.readFile('test-file.txt', () => {
    console.log('I/O finished', Date.now() - start);
});

// Thread pool example - password encryption
// Set thread pool size
process.env.UV_THREADPOOL_SIZE = '4';

// Multiple parallel crypto operations
for(let i = 1; i <= 4; i++) {
    crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
        console.log(`Password ${i} encrypted:`, Date.now() - start);
    });
}

// Top-level code
console.log('Hello from top-level code');

```
### Phases (In Order)
1. Timer Callbacks (`setTimeout`, `setInterval`)
2. I/O Polling & Callbacks (fs, network)
3. setImmediate Callbacks
4. Close Callbacks

### Priority Queues
1. Process.nextTick() (Highest)
2. Microtasks (Promises)
3. Regular callbacks

## Best Practices
1. Avoid Blocking:
   - Use async versions of functions
   - Offload heavy computations to Thread Pool
   - Break down complex tasks

2. When to Use Thread Pool:
   - File operations
   - Cryptography
   - Compression
   - DNS lookups

# Node.js Events

## Event-Driven Architecture
- Core concept in Node.js where certain objects (event emitters) emit named events when important actions occur
- Examples of events:
  - Request hitting server
  - Timer expiring
  - File finishing to read
- Events are picked up by event listeners that execute callback functions
- Many core modules (HTTP, File System, Timers) are built around this architecture
## Observer Pattern
- Event-driven architecture implements the Observer Pattern
- Components:
  - Subject (Emitter): Emits events
  - Observer (Listener): Waits for and reacts to events
- Benefits:
  - Modules remain decoupled and self-contained
  - Multiple listeners can react to the same event
  - More reactive approach compared to direct function calls

## Basic Event Emitter Usage
```js
import EventEmitter from "events"

// Create custom emitter
const myEmitter = new EventEmitter()

// Set up multiple listeners for same event
myEmitter.on("newSale", () => {
    console.log("There was a new sale!")
})

myEmitter.on("newSale", () => {
    console.log("Customer name: Jonas")
})

// Listener with parameters
myEmitter.on("newSale", (stock) => {
    console.log(`There are now ${stock} items left in stock`)
})

// Emit event with data
myEmitter.emit("newSale", 9)
```

## Creating Custom Event Emitter Class
```js
import EventEmitter from "events"

class Sales extends EventEmitter {
    constructor() {
        super() // Access parent class methods
    }
}

const myEmitter = new Sales()
// Use myEmitter as before
```

## HTTP Server with Events Example
```js
import http from "http"

const server = http.createServer()

// Multiple listeners for 'request' event
server.on("request", (req, res) => {
    console.log("Request received")
    console.log(req.url)
    res.end("Request received")
})

server.on("request", (req, res) => {
    console.log("Another request 🎯")
})

// Listen for server close event
server.on("close", () => {
    console.log("Server closed")
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests...")
})
```

# Streams In Node.js

## Core Concepts
- Process data piece by piece without loading entire data into memory
- All streams extend EventEmitter
- Used for: large files, video streaming, real-time data

## Types
1. Readable Streams (read data)
   - Events: 'data', 'end'
   - Methods: pipe(), read()
   - Example: HTTP request

2. Writable Streams (write data)
   - Events: 'drain', 'finish'
   - Methods: write(), end()
   - Example: HTTP response

3. Duplex Streams (read & write)
   - Example: Web sockets

4. Transform Streams (modify while streaming)
   - Example: zlib compression

## Stream Implementation Examples

### 1. Basic Solution (Not Recommended)
```js
import http from "http"
import fs from "fs"

const server = http.createServer((req, res) => {
    // Solution 1: Load entire file into memory
    fs.readFile("test-file.txt", (err, data) => {
        if (err) console.log(err);
        res.end(data);
    });
});
```

### 2. Using Streams (Better)
```js
const server = http.createServer((req, res) => {
    // Solution 2: Streaming with events
    const readable = fs.createReadStream("test-file.txt");
    
    readable.on("data", (chunk) => {
        res.write(chunk);
    });
    
    readable.on("end", () => {
        res.end();
    });
    
    readable.on("error", (err) => {
        console.log(err);
        res.statusCode = 500;
        res.end("File not found");
    });
});
```

### 3. Using Pipe (Best Practice)
```js
const server = http.createServer((req, res) => {
    // Solution 3: Using pipe operator
    const readable = fs.createReadStream("test-file.txt");
    // readable source -> pipe -> writable destination
    readable.pipe(res);
});


// general examples
// writing stream
import fs from "fs";

for (let i=0; i<10000000000000000000; i++){
    fs.writeFileSync('./data.txt',`${i}\n`,{flag:'a'})
}

// read stream
import fs from "fs";

const stream = fs.createReadStream('./data.txt')

stream.on('data',(data)=>{
    console.log(data);
    
})

// read stream without buffer
import fs from "fs";

const stream = fs.createReadStream('./data.txt',{encoding:'utf8'})

stream.on('data',(data)=>{
    console.log(data);
    
})

```
