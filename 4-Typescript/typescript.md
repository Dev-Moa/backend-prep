## Typescript

**Objectives**

- Intro and Setup
- Annotations In Depth
- Type Inference
- Any Type
- Function Parameter Annotations
- Default Params Values
- Function Return Annotations
- Void Functions
- Never Keyword In Depth
- Arrays Types In Depth
- Multi Dimensional Arrays
- Objects In Depth
- Type Aliases
- Optional Properties
- Readonly Property
- Intersection Types
- Unions
- Literal Types
- Tuples
- Enums
- OOP
- Interfaces
- Generics
- Type Narrowing
- Declaration Files

## Intro

- install typescript

```sh
npm i -g typescript
npm i -g ts-node
```

## Annotations

- Annotations are used to specify the data type of a variable parameter,function return value, and other types of values.
- annotations help developers catch error early in development by them to spoecifiy what types of values can be assigned to a give variable or passed as an argument to a function

**Syntax**

```ts
// string
// let variableName : type = value
let myName : string = "maxamed"
let num : number = 12
let bool : boolean = true
```

## Type Inference

- Type inference is a feature in typescript that allows the compiler to automatically determine the type of a variable based on its value

```ts

let myName = "devmoha"
let num = 12
let bool = true

```

## Any Type

- Typescript has a special anytype annotation that can be used to represent any type, when a variable is annotated with anytype typescript will allow it to have anyvalue and disable all type checking for that variable and its properties
- WARNING : dont overuse anytype

```js
let kname : any = 12
kname = "any"
kname = true

```

## Function parameters annotations

- function parameter annotations in typescript are used to specify the expected types of the parameter that a function takes .

```ts
const add = (x: number, y: number)=>{
    return x + y
}
console.log(add(2,1));
```

## Return annotation

```ts
function double(x:number,y:number) : number {
    return x+y
}
console.log(double(1,2))

```

## Void In Typescript

- Void is a type that represents the absence of any value
- its often used as the return type for the functions that do not return a value

```ts
function voidF(x:number) : void {
    console.log("void function");
    // ERROR if you try to return in void function
    return "test"
}

```

## Never

- The Never keyword is used to indicate that a function will not return anything or that a variable can never have a value.
- the never type is useful for indicating that certain code paths should never be reached or that certain values are impossible , it can help catch errors at compile time instead of runtime

- Usecases of Never:
    - A function that always throws an error
    - A function that has an infinite loop
    - A variable that can never have a value

## Arrays Types

- Arrays are a type of object that can store multiple values of the same data type , arrays in typescript are typed which means you can specify the type of values that an array can hold

- 2 Types of arrays :
    - using square bracket [type] notation to indicate an array of a specific type
```ts
    const nums : number[] = [1,3,4]
    nums.push(5)


```
    -(OLD WAY) using generic array <type> notation to indicate an array of a specific type
```ts
const numbs : Array<number> = [1,23]

```

## Multi Dimensional arrays

- Multi dimensional array is an array that contains other arrays as its elements, multi dimensional arrays can be defined using the same notation as one dimensional arrays but with nested square brackets

```ts
const matrix : number[][] = [
    [1,2],
    [3,4]
]

```

## Objects

- an object in typescript is a structured data type that represents a collection of properties each with a key and an associated value.
- The properties of an object can have specific types and the object itself can be annotated with a type , often defined using an interface or type allias. typescript uses structural typing,meaning that the shape of an object ( its structure or properties )is what matters for type compatibility.

```ts
// syntax
type varName (annotations/types) = { property:value }


const person : {name:string,age:number} = {
    name : "ahmed",
    age : 12
}

// objects as function return value
// arrow function
const printUser : ()=> {name:string,age:number} =()=>{
    return {
        name : "ali",
        age:12
    }
}

// declaration
function user (): {name:string,age:number} {
    return {
        name:"ali",
        age:12
    }
}

```


## Type aliases

- a type aliases is a way to create a new name for an existing type it allows you to define a custom type that refers to another type and give it a more meaningful or descriptive name.
- type aliases are defined using the type keyword followed by the name of the aliases , an equal sign (=) and the type it refers to .


```ts
type Person = {
    name : string,
    age : number
}

// in objects
const person : Person = {
    name : "ahmed",
    age : 12
}
// in functions
const printUser = (user : Person)=>{
    console.log(`${user.name}`);
}

console.log(printUser({name:"ali",age:12}));

// etc

```

## Optional Properties and readonly property

- you can make a certain property optional in an object type by adding a question mark (?) after the property name .
- for example lets say you have an object type for a person with a name,age and email properties but you want to make the email property optional you can do this by adding a question mark after the email property.

- read only will make property readonly mode not able to set new value

```ts
type Person = {
    name : string;
    readonly address : string;
    age: number;
    email?: string;  // optional question mark
}

```

## Intersection types

- intersection type is a way to combine multiple types into single type that includes all the properties and methods of each constituent type . an intersection type is denoted by the & symbol.

```ts

// type 1
type Person = {
    name : string,
    email : string,
    age: number
}
// type 2
type Employee = {
    id : number,
    title : string,
}

// combine or ie intersect
type PersonAndEmployee = Person & Employee

const printEmployee ( emp : PersonAndEmployee)=>{
    console.log(`${emp.name}`);
    
}

```

## Unions

- unions are used to declare a type that can have one of several possible types . unions are usefull when we want to allow a variable or aprameter to accept multiple types.

- the syntax for defining a union type in typescript uses the pipe symbol |

- it equavalent to how OR works in logic

```ts
let name : string | number = "string"
let name : string | number = 12

```

## Literal types

- literal types allow you to specify a value that can only be one specific literal value , this means that a variable with a literal type can only have one specific value and no other

```ts

let color : "red" | "green" | "blue"

```


## Tuples

- tuple is a type that represents an array with a fixed number of elements. where each element can have a different type. the order of the types in the tupple definition corresponds to the order of the values in the actual array. tupple are similiar to arrays but they have a specific structure and can be used to model finite sequences with known lengths

```ts
let myTupple : [number,string] = [12,"hello"]
console.log(myTupple[0])
console.log(myTupple[1])

```

## Enums

- Enum is a way to define a set of named constants. enums allow you to define a collection of related values that can be used interchangeably in your code.

```ts
enum weatherConditions {
    sunny,cloudy,rainy,snowy
}

// usage
const currentWeather = weatherConditions.sunny

console.log(currentWeather);

```

## Class Properties annotations

- you can annotate class properties with a type this allows you to define the data type of the property and ensure that its always consistent

```ts
class Person {
    name : string;
    age : number;

    constructor(name : string,age:number){
        this.name = name,
        this.age = age
    }
}

```
## Access modifiers

- in typescript you can access modifiers to control the visibility of class members(properties and methods).
- access modifiers determine the ways in which class members can be accessed from within and outside the class
- There are 3 types of access modifiers in typescript
    - public
    - private
    - protected
- **public** : members marked as public can be accessed from anywhere both inside and outside the class
- **private** : members marked as private can only be accessed from within the class they are defined in
- **protected** members marked as protected can be accessed from within the class they are defined in as well as any subclasses that extend the class .

```ts
class Animal {
    public name : string
    private age : number
    protected species : string

    constructor(name:string,age:number,species:string){
        this.name = name,
        this.age = age,
        this.species = species
    }
    public getName () : string {
        return this.name
    }

    private getAge():number{
        return this.age
    }

    protected getSpecies():string{
        return this.species
    }
}

const dog = new Animal("dog",12,"dogs")

console.log(dog.name); //public
console.log(dog.getName); //public
// others are private and protected and not publicly available
```

## Getters and setters

- Getters and setters are used to access and modify class properties.
- Getters and setters allow you to define a property in a class that looks like a simple variable from the outside but internally has additional logic for getting and setting the value

```ts

class MyClass {
    private _myProperty : number = 0
    get myProperty():number {
        return this._myProperty;
    }
    set myProperty(value:number){
        if(value < 0){
            throw new Error("Value cannot be negative")
        }
        this._myProperty = value
    }
}

const instance = new MyClass()

console.log(`instance ${instance.myProperty}`);
instance.myProperty = 10
console.log(`instance ${instance.myProperty}`);


```

## Interface

- interface is a way to define a contract for the shape of an object . it specifies the properties and their types that an object must have .
- interfaces are a powerfull tool for enforcing a certain structure in your code.

```ts
interface Person {
    name : string,
    age : number
}

//usage

const person: Person = {
    name : "john",
    age : 12
}

```

- while interfaces are commonly used to define the structure of objectes they are not limited to just objects , interfaces in typescript can also be used to describe the shape of functions and classes

```ts
// interface for functions

interface MathOperation {
    (x:number,y:number):number
}

// usage
const add : MathOperation = (a,b)=> a+b
const subtract : MathOperation = (a,b)=> a-b

console.log(add(1,2))
console.log(subtract(1,2))
```
```ts
// interface for classes

interface Vehicle {
    start():void
    stop():void
}

// class
class Car implements Vehicle {
    start(){
        console.log("car started")
    }
    stop(){
        console.log("car stopped")
    }
}

//usage

const mycar = new Car()
mycar.start()
mycar.stop()

// interface for objects\
interface Song {
    songName : string,
    singerName : string,
    printSongInfo (songName:string,singerName:string):string
}

const mySong : Song = {
    songName : "Natural",
    singerName : "Imagin me ",
    printSongInfo:(songName,singerName)=>{
        return `Song ${songName} SingerName ${singerName} `
    }
}

console.log(mySong.printSongInfo("song 1","song 2"));

// extending
interface Song {
    songName : string,
    singerName : string,
    printSongInfo (songName:string,singerName:string):string
}

interface SongCategory extends Song  {
    songCategory : string,
}


const mySong : SongCategory = {
    songName : "Natural",
    singerName : "Imagin me ",
    songCategory : "comedy "
    printSongInfo:(songName,singerName)=>{
        return `Song ${songName} SingerName ${singerName} `
    }
}

console.log(mySong.printSongInfo("song 1","song 2"));

```


## Declaration merging

- Once an interface is declared, it cannot be directly modified however typescript allows what is informally referred to as "declaration merging" or "interface extension" which is often misconstrued as "re-opening"

- Declaration merging in typescript refers to the ability to extend or augement an existing declaration including interfaces.
- This can be useful when you want to add new properties or methods to an existing interface without modifying the original declaration .


```ts


```

Here's the explanation and example for **Declaration Merging**:

## Declaration Merging

- Declaration merging in TypeScript allows you to extend or augment an existing declaration, such as an interface, by declaring it multiple times. This is particularly useful for adding new properties or methods to an existing interface without modifying the original declaration.
- TypeScript automatically merges declarations with the same name, combining their members.

### Example

```ts
interface Person {
    name: string;
    age: number;
}

// We can extend the `Person` interface by declaring it again
interface Person {
    address: string;
}

// Now, `Person` includes `name`, `age`, and `address`
const person: Person = {
    name: "Ali",
    age: 30,
    address: "123 Main St"
};

console.log(person);
```

In this example, we first define the `Person` interface with `name` and `age` properties. Later, we declare `Person` again and add an `address` property. TypeScript merges both declarations, so `Person` now includes all three properties: `name`, `age`, and `address`.


## Generics

- Generics allow you to write flexible, reusable code components that work with multiple types rather than a single one. Using generics, you can create components that work with any data type.
- They are defined by adding `<T>` to a function, class, or interface and replacing specific types with `T` (or other letters) within the code.

```ts
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("Hello");
console.log(output);  // "Hello"
```

## Type Narrowing

- Type narrowing allows TypeScript to refine the type of a variable within specific code blocks, based on the value's type. This is helpful with union types.
- It typically involves conditional checks like `typeof`, `instanceof`, and custom type guard functions.

```ts
function printId(id: number | string) {
    if (typeof id === "string") {
        console.log("String ID:", id.toUpperCase());
    } else {
        console.log("Number ID:", id);
    }
}
```

## Declaration Files

- Declaration files (`.d.ts`) are files that contain only TypeScript declarations for JavaScript libraries or TypeScript code. These files provide TypeScript type definitions for libraries that do not have built-in type definitions.
- They are useful for integrating JavaScript libraries into TypeScript projects with accurate type checking.

```ts
// example.d.ts
declare module "my-library" {
    export function myFunction(param: string): void;
}
```