# scala-like-option

[![Build Status](https://travis-ci.org/kfiron/scala-like-option.svg?branch=master)](https://travis-ci.org/kfiron/scala-like-option)

Option that covers all API functions from Scala

## install

```js
npm install --save scala-like-option
```

## usage


```js
const optionFactory = require('scala-like-option')

var some = optionFactory.Some('some-content');
var transformation = optionFactory.map(content => 'other-content'); // == 'other-content'

var none = optionFactory.Option(null); // option from null == none
var none = optionFactory.None();
var some = optionFactory.Option('some-content'); // Some('some-content')
var some = some.getOrElse('other-content') // 'some-content'
var some = some.fold('empty', c => 'data') // returns 'data'

```

## Api
### getOrElse(elseObject)
Returns the item or the elseObject if None

Arguments:
 - elseObject: the object that returns of was None

### get()
Returns the element or throws NoSuchElementException if was None

### orElse(Else)
Returns current option if Some or the Else if None

Arguments:
 - Else: other option to return

### orNull()
Returns the element or null if was None

### isEmpty()
Return true if None and false if Some

### isDefined()
Return false if None and true if Some

### map(transformer)
Returns different option with the transformer predicate

Arguments:
 - transformer: function that gets the element and returns new object

### fold(ifEmpty, applyNonEmpty)
Return value from supplied function, one for None and one For Some

Arguments:
 - ifEmpty: value returned from this function if is None
 - applyNonEmpty: value returned from this function if is Some

### flatMap(transformer)
Returns different option for given transformer

Arguments:
 - transformer: function that gets the element and returns new option, it may be None

### filter(predicate)
Returns the content if predicate returns true

Arguments:
 - predicate: function that gets the element and returns true/false


### filterNot(predicate)
Returns the content if predicate returns false

Arguments:
 - predicate: function that gets the element and returns true/false

### find(predicate)
Returns the content if predicate returns true

Arguments:
 - predicate: function that gets the element and returns true/false

### forAll(predicate)
Returns true if give predicate on this element returns true, if None returns always true

Arguments:
 - predicate: function that gets the element and returns true/false

### contains(containElement)
Returns true if the element is equal to give parameter, if none returns false

Arguments:
 - containElement: element to check equality


### exists(predicate)
Checks if element exists for given predicate

Arguments:
 - predicate: function that return true/false and gets the element


### forEach(executor)
Execute function with element, do nothing when None

Arguments:
 - executor: function that called with the element

### toList()
Return array from option, if None it returns empty array

### iterator()
Returns iterator from option, end iterator if none



















