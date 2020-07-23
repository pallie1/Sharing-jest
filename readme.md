# Testing in React with Jest

## Learning Objectives (5 min / 0:05)
* Discuss the features of Jest and Enzyme
* Finish setting up a development environment with create-react-app
* Implement test driven development processes
* Use Jest and Enzyme to test React applications

* What is automated testing?
## Quick Review (5 min / 0:10)

<details><summary>Answer</summary>
When we write code to test our other code!</details>

## What is Jest?
[Jest](https://jestjs.io/en/) is an easy to configure testing framework built by Facebook for testing JavaScript code. Jest runs your tests for you automatically when you have it in watch mode. It runs your tests in node instead of the browser so that they run faster. It also contains the API we will use to actually test our components.

## What is Enzyme?
[Enzyme](https://github.com/airbnb/enzyme) mimics JQuery's DOM manipulation library to make testing React easier. It allows us to grab the state of the component, simulate user actions, and grab elements from the virtual DOM.

## Configuration (10 min / 0:20)
Jest automatically looks for files with a `test.js` suffix, or for files in a `__tests__` folder. We will use the suffix today.

Let's start a React app for our testing purposes today.

```bash
$ npx create-react-app testing-lesson
```

Change into `testing-lesson`

```bash
cd testing-lesson
```

Open in vscode or your editor of choice. 

```bash
code .
```

### Preconfigured Tests

The app already has been configured with a single predefined test called `App.test.js` that tests `App.js`

<img src="https://i.imgur.com/5vaMatt.png" alt="" width=200 />

App.test.js contains the following:

```js
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

The `test()` function provides a description of the test, in this case `renders learn react link` as well as a callback with the the code to perform the test. 

The other method to make note of is `expect()` which is passed the `linkElement` and then runs the `toBeInTheDocument()` method.  As you can see the sytax is fairly descriptive as to what is being tested and how to perform the test. 

Let's run the test:

```bash
yarn test
```
<img src="https://i.imgur.com/foCyraY.png" alt="" width=400 />

We get some feedback from the app that our tests are all passing!

Jest comes completely configured within `create-react-app`, so we don't have to do anything else to get it working. Let's now set up Enzyme.  This requires that we install 3 new packages:

- enzyme 
- enzyme-adapter-react-16
- react-test-renderer

```bash
$ yarn add enzyme enzyme-adapter-react-16 react-test-renderer
```

Create a file `setupTests.js`. Create-react-app reads this file to see if there is any additional setup for the tests. In that file, add the following:

```js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

We should be good to write our first tests!

## What is Test Driven Development?
Test driven development is a development strategy where you write the tests first and then your code second. The tests should fail first, then you should write the minimum code necessary to make that test pass, then refactor to make the code cleaner. Then the cycle starts again with a new test! We will be using test driven development today. 

Here is an article about the benefits of test driven development.

- [9-benefits-of-test-driven-development](https://www.madetech.com/blog/9-benefits-of-test-driven-development)

## Writing Our First Test
Today, we will be building a couple of small projects in React. Let's create a components folder to store them.

`$ mkdir src/components`

Then, let's create a `HelloWorld` subdirectory within the components directory to create our first tests.

Let's create the following 2 files:

- `HelloWorld.js` 
- `HelloWorld.test.js`

By adding the files the testing engine, which is in watch mode, will run the `HelloWorld.test.js` file.  It however doesn't have any code and will fail:

<img src="https://i.imgur.com/jyvNMBQ.png" alt="" width=400 />

Let's write a test that confirm the HelloWorld component renders out a name that's fed to it via props. 

```js
import React from 'react'
import { shallow } from 'enzyme'

import HelloWorld from './HelloWorld'

describe('Hello world component', () => {

  it('should render as expected', () => {
    const component = shallow(<HelloWorld name={'Your name'} />)
    expect(component.contains('Your name')).toBe(true)
  })
})

```

In this test we are incorporating the following methods:

- describe: will describe a block of tests with each test being defined using the `it` method
- it: performs a single test
- [shallow](https://github.com/enzymejs/enzyme/blob/master/docs/api/shallow.md): renders a component without rendering any of its children

The testing engine should rerun automatically and this time the App test passes but not HelloWorld. 

<img src="https://i.imgur.com/GzP9B2u.png" alt="" width=400 />

Of course the reason being that we haven't written the actual HelloWorld Component as of yet. 

Now, using test driven development principles, we will write the minimum code for it to pass. In this example, we just need a component that renders a name in it.

```js
import React from 'react';

const HelloWorld = (props) => (
    <h1>{props.name}</h1>
)

export default HelloWorld;
```

<img src="https://i.imgur.com/VKvWMdf.png" alt="" width=400 />

The test passes without the need to import and run the component, nor pass it an actual prop. 

<img src="https://i.imgur.com/tij6txZ.png" alt="" width=400 />

## Writing Tests for a Counter App (30 min / 0:50)

For this exercise, you will be using test driven development to write the React code to pass some pre-written tests. 

We want to build a counter app. When we press a button, we want a number stored in state to increase, and when we press a second button that number will decrease. Given the following tests, write a React component that passes the following tests.

Let's create a folder and some files for our counter app.
```bash
$ mkdir src/components/Counter
$ touch src/components/Counter.{js,test.js}
```

Copy the following code into `Counter.test.js`:
```js
import React from 'react'
import { shallow } from 'enzyme'

import Counter from './Counter'

describe('Counter component', () => {

  let component
  beforeEach(() => {
    component = shallow(<Counter />)
  })
  
  // add the rest of the tests here

})
```

One by one, copy/paste the tests provided into the body of the testing block. Then add the code needed in the `Counter` component to pass the test before adding the next text. 

Take a look at the documentation for [Jest](https://facebook.github.io/jest/docs/en/api.html) and [Enzyme](https://github.com/airbnb/enzyme/tree/master/docs/api) as well. They will give you some context for the english verb-like function names.

```js
  it('should have a header that says "Counter"', () => {
    expect(component.contains(<h1>Counter</h1>)).toBe(true)
  })
```

```js
  it('should have a state attribute called number initialized to zero', () => {
    expect(component.state('number')).toEqual(0)
  })
```

```js
  it('should display the current number in an element with the className number', () => {
    expect(component.find('.number').text()).toEqual("0")
  })
```

```js
  it('should have a button with a class plus that increases the number in state', () => {
    component.find('.plus').simulate('click')
    expect(component.state('number')).toEqual(1)
  })
```

```js
  it('should have a button with a class minus that decreases the number in state', () => {
    component.find('.minus').simulate('click')
    expect(component.state('number')).toEqual(-1)
  })
```

## Break (10 min / 1:00)

## To Do List App (60 min / 2:00)
Let's now create a To Do list app using test driven development. First let's create our files.

We will have two components -- a `ToDos.js` component which will hold individual `Todo.js` components.
```bash
$ mkdir src/components/ToDos
$ touch src/components/ToDos/ToDo{s.js,.js,s.test.js}
```

Now let's scaffold the configuration for our testing file.

`ToDos.test.js`
```js
import React from 'react'
import { mount } from 'enzyme'

import ToDos from './ToDos'
import ToDo from './ToDo'

describe('ToDos Component', () => {
  const listItems = [
    { task: 'create lesson', done: false },
    { task: 'clean apartment', done: false }
  ]

  let component
  // called before every test
  beforeEach(() => {
    // this time, mount instead of shallow because we will have subcomponents within our ToDos component
    component = mount(<ToDos tasks={listItems} />)
  })

  // add tests here

})
```
This looks pretty similar to our other testing blocks, but this time in `beforeEach()` we will use `mount` instead of `shallow` since we are going to have subcomponents within our parent component.  

Let's add our first test:
```js
  it('Should contain two todo subcomponents', () => {
    expect(component.find(ToDo).length).toBe(2)
  })
```

Let's write the minimum amount of code to make this test pass:

`ToDos.js`
```js
import React, { Component } from 'react'

import ToDo from './ToDo'

function ToDos() {
    return (
      <div>
        {this.props.tasks.map( (task, idx) => 
          <ToDo task={task} key={idx} />
        )}
      </div>
    )
}

export default ToDos
```

`ToDo.js`
```js
import React from 'react'

const ToDo = ({ task }) => {
  return (
    <div>
      <div></div>
    </div>
  )
}

export default ToDo
```
Now that we made that one pass, let's add another. 
```js
  it('Should render the todo list tasks', () => {
    component.find(ToDo).forEach((todo, idx) => {
      expect(todo.find('.task-name').text()).toBe(listItems[idx].task)
    })
  })
```

The code to pass this one is pretty minimal!
`ToDo.js`
```diff
import React from 'react'

const ToDo = ({ task }) => {
  return (
    <div>
+      <div className='task-name'>{task.task}</div>
    </div>
  )
}
```

Now let's create functionality for making a new list item.
```js
  it(`Should have have a state attribute for the new todo that should update 
      when the user types in an input`, () => {
    expect(component.state('newTodo')).toBe('')
    component.find('input').simulate('change', {target: {value: 'hello'}})
    expect(component.state('newTodo')).toBe('hello')
  })
```
Note that we can mock events by adding targets and values to the `simulate` method! We normally access `e.target.value`, so we create a similar structure when we mock the event!

`ToDos.js`
```diff
function ToDos(props) {
  const [newTodo, setNewTodo] = useState('')

+  const handleChange = e => {
     setNewTodo(e.target.value)
+  }

    return (
      <div>
+        <input onChange={handleChange}/>
...
```

### You Do: Finish To Do App (30 min / 2:30)

Write the following tests. After writing a test, implement the React code to pass that test.
* `Should create a new todo on the click of a button and update the UI with it`

* `Should mark todos as done on the click of a button`

* `Should have todos with the class checked if they are done and unchecked if they are not done`

Bonus: look at the completed application using `yarn start` and then style the application accordingly.

<details open>
<summary>Solution</summary>
<br>
```js
import React from 'react'

const ToDo = ({ task, markComplete }) => {
  return (
    <div>
      <button className='mark-done' onClick={e => markComplete(task)}>Mark as Complete</button>
      <div className={`task-name ${task.done ? 'checked' : 'unchecked'}`}>{task.task}</div>
    </div>
  )
}

export default ToDo

```
</details>

[Solution](https://git.generalassemb.ly/ga-wdi-exercises/react-testing/tree/solution/src/components/ToDos)

## Conclusion
* Why is test driven development helpful?
* What is Jest? How about Enzyme?
* What is the difference between `shallow` and `mount`?

### Resources
* [Solution Branch](https://git.generalassemb.ly/ga-wdi-exercises/react-testing/tree/solution/src)
* [Jest](http://facebook.github.io/jest/)
* [Enzyme](https://github.com/airbnb/enzyme/tree/master/docs/api)
