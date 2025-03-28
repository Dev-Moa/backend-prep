# Node.js

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
- Using ES6 modules way

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

- node js has two main dependencies

- v8 engine converts js code into machine code so that machine can understand
- libuv opensource library with strong focus on async io

- libuv is a multiplatform support library with a focus on async io.
- it was developed speicially for node js

- features of libuv include : file system events,async DNS resolution, async file system ops, full featured event loop

- other node js dependencies include :
    - Llhttp
    - c-ares
    - open ssl
    - zlib

- thread : each unit capable of executing code is called thread

## Single-Threaded Nature
- Node.js runs on a single thread per application
- All users share the same thread
- Blocking operations affect all users
- This is why async operations are crucial

## I/O Operations
- I/O = Input/Output operations (file system, network requests)
- Node.js uses non-blocking I/O model
- Heavy I/O work is offloaded to background
- Callback functions handle results when ready

## Blocking vs Non-Blocking
- Blocking: Each operation waits for previous to complete
- Non-Blocking: Operations run in background while code continues
- Example:
  - Blocking: `readFileSync` stops code execution
  - Non-Blocking: `readFile` (with callback) or `fs.promises` (your current approach)

## Why Node.js Uses This Model
- Different from PHP's multi-thread approach
- Designed for high performance and scalability
- Better resource utilization
- Ideal for I/O intensive applications

# Node.js Events

```js
import EventEmitter from "events"

// create instance
const customEmitter = new EventEmitter()

// 1. on : listen/register for an event ,
// if you create using on you call call it as many times as you want
customEmitter.on("response",(name,id)=>{
    console.log(`user : ${name},${id}`);
})
// 2. once : listen/register for an event
customEmitter.once("response",(name,id)=>{
    console.log(`user : ${name},${id}`);
})
// 3. emit : emit/call an event
customEmitter.emit("response","me","123")
customEmitter.emit("response","me","123")

```

# Streams In Node.js
- streams are a way to handle reading and writing a data

```js
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









