# React Route Transition

A tiny (**1.4kb gzipped**) and simple transition orchestrator for React.

[Example](http://dutzi.github.io/react-route-transition). [Blog Post](https://dutzi.party/animating-route-transitions-using-react-router/).

## Install

```sh
yarn add react-route-transition
# or npm install --save react-route-transition
```

## API

`<RouteTransitionProvider>` - for react-route-transition to work you first need to wrap your app with this provider (place it _inside_ of react-router's `Router`).

`useTransitionHistory()` - returns an object with a single function named `push` that accepts a path (string) and an optional state object. Calling this starts the orchestrator, which fires the relevant `onLeave` animations, waits for them to finish, changes the route and fires the relevant `onEnter` animations.

`useTransition(options: ITransitionOptions)` - this hook registers animations for the current components (it tells react-route-transition which route changes this component listens to and which animations it should fire accordingly). It accepts an object that looks as follows:

```js
useTransition({
  // the list of "handlers"
  handlers: [
    {
      // each handler can either define a path, the path can either be a
      // string/regexp (single path), or an array of strings/regexps (multiple
      // paths)
      //
      path: '/signin',
      // each handler should implement either an onEnter callback, that will
      // be fired once entering said path, or an onLeave callback, or both
      //
      onEnter: async () => {
        await gsap.timeline().fromTo(
          '[data-signin-wrapper] > *',
          { y: 20, opacity: 0 },
          {
            y: 0,
            duration: 0.6,
            stagger: 0.125,
            opacity: 1,
          }
        );
      },
      onLeave: async () => {
        await gsap.timeline().to('[data-home-main] > *, [data-home-footer]', {
          duration: 0.6,
          stagger: 0.125,
          opacity: 0,
          y: -20,
        });
      },
    },
    // ... more handlers
  ],
});
```

## Example Usage

If you are using [react-router](https://github.com/ReactTraining/react-router):

**App.js:**

```js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RouteTransitionProvider } from 'react-route-transition';
// import Home and SignIn components...

export default function () {
  return (
    <Router>
      <RouteTransitionProvider>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
      </RouteTransitionProvider>
    </Router>
  );
}
```

**Home.js:**

```jsx
import React from 'react';
import gsap from 'gsap';
import { useTransition, useTransitionHistory } from 'react-route-transition';

export default function () {
  const history = useTransitionHistory();

  // The following tells react-router-transition that whenever the user
  // navigates to '/', call the first function (start the first animation),
  // and whenever the user leaves '/' call the second function *before* pushing
  // the new path to the react-router history.
  //
  useTransition({
    handlers: [
      {
        path: '/',
        onEnter: async () => {
          await gsap
            .timeline()
            .fromTo(
              '[data-home-main] > *, [data-home-footer]',
              { opacity: 0, y: 20 },
              { duration: 0.6, stagger: 0.125, y: 0, opacity: 1 }
            );
        },
        onLeave: async () => {
          await gsap.timeline().to('[data-home-main] > *, [data-home-footer]', {
            duration: 0.6,
            stagger: 0.125,
            opacity: 0,
            y: -20,
          });
        },
      },
    ],
  });

  async function handleSignIn(e) {
    e.preventDefault();
    // remember this is react-route-animation's push() method, which wraps
    // react-router's method and plays the animations
    //
    history.push('/signin');
  }

  return (
    <div>
      <nav>
        <a href="/signin" onClick={handleSignIn}>
          Sign In
        </a>
      </nav>
      <main data-home-main>{/* this content will be animated */}</main>
      <footer data-home-footer>{/* some stuff here as well */}</footer>
    </div>
  );
}
```

**SignIn.js:**

```jsx
// same imports as above...

export default function () {
  const history = useTransitionHistory();

  useTransition({
    handlers: [
      {
        path: '/signin',
        onEnter: async () => {
          gsap.timeline().fromTo(
            '[data-signin-wrapper] > *',
            { y: 20, opacity: 0 },
            {
              y: 0,
              duration: 0.6,
              stagger: 0.125,
              opacity: 1,
            }
          );
        },
        onLeave: async () => {
          await gsap.timeline().to('[data-home-main] > *, [data-home-footer]', {
            duration: 0.6,
            stagger: 0.125,
            opacity: 0,
            y: -20,
          });
        },
      },
    ],
  });

  async function handleBackToHome(e) {
    e.preventDefault();
    history.push('/');
  }

  return <div data-signin-wrapper>{/* this content will be animated */}</div>;
}
```

If you are not using react-router you can still use react-route-transition, only you need to provide `<TransitionProvider>` two props:

- `push: (path: History.Path, state?: History.LocationState) => void` - an object with a single function called `push` that accepts a path (string) and an optional state. When calling that push method the current route should change.
- `location: { pathname: History.Path }` - an object with a prop named `pathname` that listens to path changes and updates accordingly.

Also, you will need to import `<TransitionProvider>` from `react-route-transition/core`:

```js
import { TransitionProvider } from 'react-route-transition/core';
```

### More options

Say you want one leave animation to start when the user navigates from the Sign In screen to the App screen but a different one when the user navigates from the Sign In screen to the Home screen.

You can do it by defining a `from` and a `to` prop, for example:

```js
useTransition({
  handlers: [
    {
      from: '/signin',
      to: '/app',
      onLeave: async () => {
        // some crazy animation
      },
    },
    {
      from: '/signin',
      to: '/',
      onLeave: async () => {
        // some other crazy animation
      },
    },
  ],
});
```

## License

MIT
