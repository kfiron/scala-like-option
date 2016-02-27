

module.exports.None = () => new INone();
module.exports.Some = content => new ISome(content);
module.exports.Option = content => iOption(content);


var iOption = content => content ? new ISome(content) : new INone();

function INone(){
}
INone.prototype.getOrElse = Else => Else;
INone.prototype.get = () => {throw new NoSuchElementException('no elements in None');};
INone.prototype.orElse = Else => Else;
INone.prototype.orNull = () => null;
INone.prototype.isEmpty = () => true;
INone.prototype.isDefined = () => false;
INone.prototype.map = function(){return this;};
INone.prototype.flatMap = function(){return this;};
INone.prototype.fold = ifEmpty => ifEmpty();
INone.prototype.filter = function(){return this;};
INone.prototype.filterNot = function(){return this;};
INone.prototype.find = function(){return this;};
INone.prototype.forAll = () => true;
INone.prototype.contains = () => false;
INone.prototype.exists = () => false;
INone.prototype.forEach = () => undefined;
INone.prototype.toList = () => [];
INone.prototype.iterator = () => makeIterator([]);



function ISome(content){
  this.content = content;
}

ISome.prototype.get = function(){return this.content;};
ISome.prototype.getOrElse = function(){return this.content;};
ISome.prototype.orElse = function(){return this;};
ISome.prototype.orNull = function(){return this.content;};
ISome.prototype.isEmpty = () => false;
ISome.prototype.isDefined = () => true;
ISome.prototype.map = function(transformer) {
  return new ISome(transformer(this.content));
};
ISome.prototype.fold = function(ifEmpty, applyNonEmpty) {
  return applyNonEmpty(this.content);
};
ISome.prototype.flatMap = function(transformer) {
  return transformer(this.content);
};
ISome.prototype.filter = function(predicate) {
  return predicate(this.content) ? this : new INone();
};
ISome.prototype.filterNot = function(predicate) {
  return predicate(this.content) ? new INone() : this;
};
ISome.prototype.find = function(predicate) {
  return predicate(this.content) ? this : new INone();
};
ISome.prototype.forAll = function(predicate) {
  return predicate(this.content);
};
ISome.prototype.contains = function(containsContent) {
  return this.content === containsContent;
};
ISome.prototype.exists = function(predicate) {
  return predicate(this.content);
};
ISome.prototype.forEach = function(executor) {
  executor(this.content);
};
ISome.prototype.toList = function() {
  return [this.content];
};
ISome.prototype.iterator = function() {
  return makeIterator(this.toList());
};


function NoSuchElementException(message) {
  this.name = 'NoSuchElementException';
  this.message = (message || '');
}
NoSuchElementException.prototype = Error.prototype;

function makeIterator(array){
  var nextIndex = 0;

  return {
    next: function(){
      return nextIndex < array.length ?
      {value: array[nextIndex++], done: false} :
      {done: true};
    }
  };
}