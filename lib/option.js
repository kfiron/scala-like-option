module.exports.None = () => none;
module.exports.Some = content => new ISome(content);
module.exports.Option = content => content ? new ISome(content) : none;


var none = {
  getOrElse: Else => Else,
  get: () => {
    throw new NoSuchElementException('no elements in None');
  },
  orElse: Else => Else,
  orNull: () => null,
  isEmpty: () => true,
  isDefined: () => false,
  map: function () {
    return this;
  },
  flatMap: function () {
    return this;
  },
  fold: ifEmpty => ifEmpty(),
  filter: function () {
    return this;
  },
  filterNot: function () {
    return this;
  },
  find: function () {
    return this;
  },
  forAll: () => true,
  contains: () => false,
  exists: () => false,
  forEach: () => undefined,
  toList: () => [],
  iterator: () => makeIterator([])

};



function ISome(content) {
  this.content = content;
}

ISome.prototype.get = function () {
  return this.content;
};
ISome.prototype.getOrElse = function () {
  return this.content;
};
ISome.prototype.orElse = function () {
  return this;
};
ISome.prototype.orNull = function () {
  return this.content;
};
ISome.prototype.isEmpty = () => false;
ISome.prototype.isDefined = () => true;
ISome.prototype.map = function (transformer) {
  return new ISome(transformer(this.content));
};
ISome.prototype.fold = function (ifEmpty, applyNonEmpty) {
  return applyNonEmpty(this.content);
};
ISome.prototype.flatMap = function (transformer) {
  return transformer(this.content);
};
ISome.prototype.filter = function (predicate) {
  return predicate(this.content) ? this : none;
};
ISome.prototype.filterNot = function (predicate) {
  return predicate(this.content) ? none : this;
};
ISome.prototype.find = function (predicate) {
  return predicate(this.content) ? this : none;
};
ISome.prototype.forAll = function (predicate) {
  return predicate(this.content);
};
ISome.prototype.contains = function (containsContent) {
  return this.content === containsContent;
};
ISome.prototype.exists = function (predicate) {
  return predicate(this.content);
};
ISome.prototype.forEach = function (executor) {
  executor(this.content);
};
ISome.prototype.toList = function () {
  return [this.content];
};
ISome.prototype.iterator = function () {
  return makeIterator(this.toList());
};


function NoSuchElementException(message) {
  this.name = 'NoSuchElementException';
  this.message = (message || '');
}
NoSuchElementException.prototype = Error.prototype;

function makeIterator(array) {
  var nextIndex = 0;

  return {
    next: function () {
      return nextIndex < array.length ?
      {value: array[nextIndex++], done: false} :
      {done: true};
    }
  };
}