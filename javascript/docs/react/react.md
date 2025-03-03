# React

`create react app - npx create-react-app my-app`

## To get Started with React

1. `import React from 'react'`

2. `function Greeting(){ return <h1>Hello World</h1> }`

- Now to have the function render something on the screen, we need to import ReactDOM from `'react-dom'`
  therefore:

3. import ReactDOM from `'react-dom'`
4. `ReactDOM.render(x, document.getElementById('root'))`

- why root? <br> Because its the part of the html file where we render the react app
  now what is this x
  x-> x is a closing tag . if i have a function say greeting , then x is <Greeting/>

- Return type of the function is JSX.

## Creating Functions

1. generic function
   ```JavaScript
   function greeting(){
   return <h1>Hello World</h1>
   }
   ```
2. arrow function
   ```JavaScript
    const greeting = () => {
   return React.createElement('h1',(), 'Hello World')
   (element, props, children)
   ```

- Difference between arrow function and generic function:

1. when implementing this:
   ```JavaScript
   function Greeting(){
   return (
   <div>
   <h1>Hello World</h1>
   </div>
   );}
   ```

generic function is easier rather than this:
endless function calls

```JavaScript
const Greeting = () => {
return React.createElement('div', null, React.createElement('h1', null, 'Hello World'));
}
```

## JSX Rules (the return type of a function)

1. return single element (div inside div is allowed , but 2 divs not allowed to be returned)

2. div/section / article or Fragment (Fragment is ReactFragment which doesnt create a new div)

3. use camel Case for html attributes (say , onClick instead of onclick)

4. className instead of class (class is reserved keyword in JS , div className = "abc")

5. close every element (even for img , `<img src=" />`)

6. formatting (say return something , return it such that the opening tag is in same line as of the return keyword, or use parenthesis )

# Nested Components and tools

create functions and you can use them inside other functions (nest them)

```JavaScript
function greeting (){
return <Person/>
}
const Person = () => {
return some name here}
```

# JSX CSS

taking an example of a tag to style (inline style) in index.js
this is how we do it

```JavaScript
<h4 style={{color: '#617d98', fontSize:"0.75rem", marginTop:"0.25rem"}}>
Text here...
</h4>
```

3 things to note:

1. `style` is an object so to create an object, we use curly braces
   1st curly brace(outer one) is to enter JS world , 2nd curly brace is to enter JSX world , i.e to create an object
2. Values are in quotes
3. camel case for attributes

## JavaScript in JSX

```JavaScript
const author = "Ashu"
```

now include it as `{author}` in JSX and use methods of javascript on the object {author} like `{author.toUpperCase()}`
(just so that I don't forget, JSX is the return type of a function in React)

## Props

- Short for properties
  it is an object passed as a parameter/argument

## Props -children

- It is the child of a component
  place something inside the closed tag of a component(make a opening and closing tag)..it will automatically be understood as a children component pass children as a prop to the component use `{children}` in the const Book anywhere to use accordingly.
