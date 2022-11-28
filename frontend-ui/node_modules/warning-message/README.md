# warning-message

[![Build Status](https://travis-ci.org/rudolfsonjunior/node-warning-message.svg?branch=master)](https://travis-ci.org/rudolfsonjunior/node-warning-message)
[![Coverage Status](https://coveralls.io/repos/github/rudolfsonjunior/node-warning-message/badge.svg?branch=master)](https://coveralls.io/github/rudolfsonjunior/node-warning-message?branch=master)

> A declarative way to return warning messages

## Why?

Almost any project needs a warning messages.
This package simplifies your workflow.

## Installation

```sh
npm i -S warning-message
```

or

```sh
yarn add warning-message
```

## Usage

After installation you can import the package to your project and use a declarative way return warning messages.
The return value is always a `string`.

You can use the default warning messages or create your own custom warning messages.

### Simple example with default warning messages

If a function takes no parameter it returns the standard message.
If a function takes an parameter, it simple returns this string.

```js
import warningMessage from 'warning-message';

// standard message
warningMessage().email(); // The input has to be an email!
// custom message
warningMessage().email('Not an email!') // Not an email!
```

### Advanced example with default warning messages

Some functions have 2 or more parameters. The last parameter is always a function that takes the previous parameters. You can use this function to create a custom string.

```js
import warningMessage from 'warning-message';

// standard message
warningMessage().minMaxChar(3, 6); // The input has to be at least 3 and maximum 6 letters!
// custom message
warningMessage().minMaxChar(3, 6, (min, max) => `input should have min: ${min} and max: ${max} letters`); // input should have min: 3 and max: 6 letters!
```

### Advanced example with your own custom warnings

Create file where you export your custom warnings:

> Note: the properties: `exactly`, `maxChar`, `minChar`, and `not` can have a `__VAR1__`

> Not: the property: `minMaxChar` can have a `__VAR1__` and a `__VAR2__`

`__VAR1__` & `__VAR2__` are the additional values passed to the function. you can add them if you want but you dont have to.

```js
const customWarnings = {
  date: 'Custom warning: date format!',
  datetime: 'Custom warning: datetime format!',
  email: 'Custom warning: email!',
  exactly: 'Custom warning: exactly __VAR1__!',
  float: 'Custom warning: float!',
  integer: 'Custom warning: integer!',
  maxChar: 'Custom warning: max. __VAR1__ letters!',
  minChar: 'Custom warning: min. __VAR1__ letters!',
  minMaxChar: 'Custom warning: min. __VAR1__ and max. __VAR2__ letters!',
  not: 'Custom warning: not __VALUE__!',
  number: 'Custom warning: number!',
  phonenumber: 'Custom warning: phonenumber!',
  requiredField: 'Custom warning: required!',
  time: 'Custom warning: time format!',
  url: 'Custom warning: url!',
  validation: 'Custom warning: not valid!',
};

export default customWarnings;
```

In you file where you would use the warnings you can use your custom warnings like that:

```js
import warningMessage from 'warning-message';
import customWarnings from 'path/to/your/customWarnings';

// __VAR1__ is the first function argument
// __VAR2__ is the second function argument
warningMessage(customWarnings).minMaxChar(3, 5); // Custom warning: min. 3 and max. 5 letters!

warningMessage(customWarnings).phonenumber(); // Custom warning: phonenumber!

// __VAR1__ is the first function argument
warningMessage(customWarnings).not('this'); // Custom warning: not this!
```


**Functions:**

- [date](#date)
- [datetime](#datetime)
- [email](#email)
- [exactly](#exactly)
- [float](#float)
- [integer](#integer)
- [maxChar](#maxChar)
- [minChar](#minChar)
- [minMaxChar](#minMaxChar)
- [not](#not)
- [number](#number)
- [phonenumber](#phonenumber)
- [requiredField](#requiredField)
- [time](#time)
- [url](#url)
- [valid](#valid)

### date

This function returns a warning for a date.

```js
warningMessage().date(); // The input has to be valid date format!
warningMessage().date('custom message'); // custom message
```

### datetime

This function returns a warning for a datetime.

```js
warningMessage().datetime(); // The input has to be valid datetime format!
warningMessage().datetime('custom message'); // custom message
```

### email

This function returns a warning for an email.

```js
warningMessage().email(); // The input has to be an email!
warningMessage().email('custom message'); // custom message
```

### exactly

This function returns a warning for an value that do not match exactly a target.

```js
warningMessage().exactly('target'); // The input has to be exactly like target!
warningMessage().exactly('target', (target) => `custom message ${target}`); // custom message target
```

### float

This function returns a warning for a float.

```js
warningMessage().float(); // The input has to be a float!
warningMessage().float('custom message'); // custom message
```

### integer

This function returns a warning for an integer.

```js
warningMessage().integer(); // The input has to be an integer!
warningMessage().integer('custom message'); // custom message
```

### maxChar

This function returns a warning for a value that exceeds a target.

```js
warningMessage().macChar(6); // The input has to be max. 6 letters!
warningMessage().maxChar(6, (max) => `custom message ${mex}`); // custom message 6
```

### minChar

This function returns a warning for a value that has less character than a target.

```js
warningMessage().minChar(3); // The input has to be min.  3 letters!
warningMessage().minChar(3, (min) => `custom message ${min}`); // custom message 3
```

### minMaxChar

This function returns a warning for a value that has less character than a target and eceeds a second target.

```js
warningMessage().minMaxChar(3, 6); // The input has to be min. 3 and max. 6 letters!
warningMessage().minMaxChar(3, 6, (min, max) => `custom message ${min} and ${max}`); // custom message 3 and 6
```

### not

This function returns a warning for a value that is not alowed.

```js
warningMessage().not('value'); // The input is not allowed to be: value!
warningMessage().not('value', (value) => `custom message ${value}`); // custom message value
```

### number

This function returns a warning for a number.

```js
warningMessage().number(); // The input has to be a number!
warningMessage().number('custom message'); // custom message
```

### phonenumber

This function returns a warning for a phonenumber.

```js
warningMessage().phonenumber(); // The input has to be a phonenumber!
warningMessage().phonenumber('custom message'); // custom message
```

### requiredField

This function returns a warning for a required inputfield.

```js
warningMessage().requiredField(); // This field is required!
warningMessage().requiredField('custom message'); // custom message
```

### time

This function returns a warning for a time.

```js
warningMessage().time(); // The input has to be a valid time format!
warningMessage().time('custom time warning message'); // custom message
```

### url

This function returns a warning for a url.

```js
warningMessage().url(); // The input has to be a valid url!
warningMessage().url('custom message'); // custom message
```

### validation

This function returns a warning for a validation.

```js
warningMessage().validation(); // The input is not valid!
warningMessage().validation('custom message'); // custom message
```

## LICENSE

MIT © Lukas Aichbauer