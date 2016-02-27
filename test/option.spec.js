const expect = require('chai').expect,
  optionFactory = require('../index');

describe('None', () => {

  var none = optionFactory.None();
  var some = optionFactory.Some('content');

  it('should return provided parameter when getOrElse', () => {
    expect(none.getOrElse('else')).to.equal('else');
  });

  it('should throw NoSuchElementException when get', () => {
    expect(() => none.get()).to.throw('NoSuchElementException');
  });

  it('should return null when orNull', () => {
    expect(none.orNull()).to.be.null;
  });

  it('should be empty when None', () => {
    expect(none.isEmpty()).to.be.true;
  });

  it('should not be defined when None', () => {
    expect(none.isDefined()).to.be.false;
  });

  it('should return none on map', () => {
    expect(none.map(() => 'something')).to.deep.equal(none);
  });

  it('should return none on flatMap', () => {
    expect(none.flatMap(() => 'something')).to.deep.equal(none);
  });

  it('should return result of is empty on fold', () => {
    expect(none.fold(() => 'was_empty', () => 'was_not_empty')).to.equal('was_empty');
  });

  it('should return none when filter', () => {
    expect(none.filter(() => 'something')).to.deep.equal(none);
  });

  it('should return none when filterNot', () => {
    expect(none.filterNot(() => 'something')).to.deep.equal(none);
  });

  it('should return none when find', () => {
    expect(none.find(() => 'something')).to.deep.equal(none);
  });

  it('should return provided option parameter when orElse', () => {
    expect(none.orElse(some)).to.deep.equal(some);
  });

  it('should return true when forAll', () => {
    expect(none.forAll(() => false)).to.be.true;
  });

  it('should return false when contains()', () => {
    expect(none.contains('something')).to.be.false;
  });

  it('should return false when exists()', () => {
    expect(none.exists(c => c)).to.be.false;
  });

  it('should do nothing when forEach()', () => {
    var data = 'data';
    none.forEach(c => data = c);
    expect(data).to.equal('data');
  });

  it('should empty array when toList()', () => {
    expect(none.toList()).to.deep.equal([]);
  });

  it('should return end of iterator()', () => {
    expect(none.iterator().next().done).to.be.true;
  });

});


describe('Some', () => {

  var content = 'content';
  var option = optionFactory.Some(content);

  it('should return the content when get', () => {
    expect(option.get()).to.equal(content);
  });

  it('should return the content when getOrElse', () => {
    expect(option.getOrElse('else')).to.equal(content);
  });

  it('should return the content when orNull', () => {
    expect(option.orNull()).to.be.equal(content);
  });

  it('should not be empty when Some with content', () => {
    expect(option.isEmpty()).to.be.false;
  });

  it('should be defined when Some with content', () => {
    expect(option.isDefined()).to.be.true;
  });

  it('should transform a map', () => {
    expect(optionFactory.Some('content').map(content => content + 'Add')).to.deep.equal(optionFactory.Some('contentAdd'));
  });

  it('should return result of not empty when fold', () => {
    var content = 'content';
    expect(option.fold(() => 'was_empty', content => 'was_not_empty:' + content)).to.equal('was_not_empty:' + content);
  });

  it('should return none on flatMap when function returns none', () => {
    expect(option.flatMap(() => optionFactory.None())).to.deep.equal(optionFactory.None());
  });

  it('should return some on flatMap when function returns some', () => {
    expect(option.flatMap((content) =>  optionFactory.Some(content + 'add'))).to.deep.equal(optionFactory.Some('contentadd'));
  });

  it('should return the element when filter predicate is true', () => {
    expect(option.filter(content => content.startsWith('c'))).to.deep.equal(option);
  });

  it('should return None when filter predicate is false', () => {
    expect(option.filter(content => content.startsWith('z'))).to.deep.equal(optionFactory.None());
  });

  it('should return None when filterNot predicate is true', () => {
    expect(option.filterNot(content => content.startsWith('c'))).to.deep.equal(optionFactory.None());
  });

  it('should return Some when filterNot predicate is false', () => {
    expect(option.filterNot(content => content.startsWith('z'))).to.deep.equal(option);
  });

  it('should return the element when find predicate is true', () => {
    expect(option.find(content => content.startsWith('c'))).to.deep.equal(option);
  });

  it('should return None when find predicate is false', () => {
    expect(option.find(content => content.startsWith('z'))).to.deep.equal(optionFactory.None());
  });

  it('should return current option when orElse', () => {
    expect(option.orElse(optionFactory.Some('other'))).to.deep.equal(option);
  });

  it('should return true when forAll with predicate the returns true', () => {
    expect(option.forAll(content => content.startsWith('c'))).to.be.true;
  });

  it('should return false when forAll with predicate the returns true', () => {
    expect(option.forAll(content => content.startsWith('z'))).to.be.false;
  });

  it('should return true when contains() contain the content', () => {
    expect(option.contains(content)).to.be.true;
  });

  it('should return false when forAll with predicate the returns true', () => {
    expect(option.contains('other-content')).to.be.false;
  });

  it('should return false when exists() predicte is false', () => {
    expect(option.exists(c => c.startsWith('z'))).to.be.false;
  });

  it('should return true when exists() predicte is false', () => {
    expect(option.exists(c => c.startsWith('c'))).to.be.true;
  });

  it('should call forEach on content element', () => {
    var data = 'data';
    option.forEach(c => data = c);
    expect(data).to.equal(content);
  });

  it('should return array with one element when toList()', () => {
    expect(option.toList()).to.deep.equal([content]);
  });

  it('should return iterator from element', () => {
    var iterator = option.iterator();
    expect(iterator.next().value).to.equal(content);
    expect(iterator.next().done).to.be.true;
  });

});

describe('option', () => {

  it('should return Some when have content', () => {
    expect(optionFactory.Option('content')).to.deep.equal(optionFactory.Some('content'));
  });

  it('should return None when content is null', () => {
    expect(optionFactory.Option(null)).to.deep.equal(optionFactory.None());
  });

  it('should return None when content is undefined', () => {
    expect(optionFactory.Option(undefined)).to.deep.equal(optionFactory.None());
  });

});
