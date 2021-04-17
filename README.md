# DynamicCompTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

Quick app showcasing how to render components at dynamically at runtime.

On the `jest` branch, I've swapped out karam for jest and this runs into problems involving Ivy for tests.

This project is meant to showcase how to tell unit tests are not running with Ivy enabled and uses a situation where the codebase is affected (rendering dynamic components at runtime)

### Notes about switching branches

Be sure to run `npm run reinstall` (clears node_modules and runs `npm install`) when switching from `main` branch to `jest`.

Clearing node_modules is important for recreating the issue for jest since the "fix" is permanent as long as node_modules isn't deleted

### main

If you run `npm run test`, everything is good. Karma better than jest proven. Everyone can go home now.


### jest

If you run `npm run test`, you'll get some errors

tl;dr Ivy isn't enabled when running jest unit tests by default, and this causes problems.

Steps to recreate:

1. comment out the 'should have ivy enabled' test in `app.component.specs`
2. run `npm run test` or `npx jest`

You should see the following error:

```bash
UnhandledPromiseRejectionWarning: TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'element' -> object with constructor 'Object'
    |     property 'componentProvider' -> object with constructor 'Object'
    --- property 'parent' closes the circle
```

This error isn't really clear, so let's add the --detectOpenHandles argument:

`npm run test -- --detectOpenHandles` or `npx jest --detectOpenHandles`

```bash
AppComponent › how the dyamic component works › should have a blue background

    No component factory found for DynamicComponent. Did you add it to @NgModule.entryComponents?
```

Naively one might try to add the `DynamicComponent` to `entryComponents` for `DynamicModule` since this is how things were done before Ivy, but since this project has Ivy enabled (which is the new default since Angular 9), this shouldn't be a problem.

If you do add add `DynamicComponent` to `entryComponents` (which is commented out on `DynamicModule`), the error does go away.

However this would mean that Ivy isn't enabled for testing.

To confirm this, uncomment the 'should have ivy enabled' test in `app.component.specs`:

```bash
AppComponent › should have ivy enabled

    expect(received).toBe(expected) // Object.is equality

    Expected: true
```

To bypass this issue, there is a commented out line of code in `jest.config.js` found at the root of the project:

`require('jest-preset-angular/ngcc-jest-processor');`

When including this line, jest now runs `ngcc` before running the tests:

```bash
 ngcc-jest-processor: running ngcc

 ...

 PASS  src/app/dynamic/dynamic/dynamic.component.spec.ts
 PASS  src/app/app.component.spec.ts

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
```
