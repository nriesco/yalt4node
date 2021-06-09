/* eslint-env mocha */
const path = require('path')
const should = require('should') // eslint-disable-line no-unused-vars
const lib = require(path.join('..', 'src'))

// note #1: use `#methodName` to group tests
// note #2: use the text from `@testcase` for each `it`
// not sure how to use should? start here: https://github.com/shouldjs/should.js
// or take a look at the samples below

describe('#addNumbers', function () {
  it('two valid integers', function () {
    lib.addNumbers(1, 2).should.equal(3)
    lib.addNumbers(2, 1).should.equal(3)
  })
})

describe('#addNumbers2', function () {
  it('two valid integers', function () {
    lib.addNumbers(10, 7).should.equal(17)
    lib.addNumbers(30, 4).should.equal(34)
  })
})

// // sample tests
// lib.someMethod(3).should.not.be.containDeep({ type: 'string', length: 3 });
// lib.someMethod(3).should.containDeep({ type: 'number' });
// lib.someMethod(3).should.containDeep({ value: 3 });
// lib.someMethod(3).should.deepEqual({ type: 'number', value: 3 });
// lib.someMethod(1).should.be.ok();
// lib.someMethod(-1).should.be.false();
// lib.someMethod(1, 2).should.equal(3);
// lib.someMethod(1, 2).should.be.equal(3);
