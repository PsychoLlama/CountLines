/*global require, describe, beforeEach, afterEach,
  it, expect*/

var exports = require('../CountLines.js');
var CountLines = exports.CountLines;
//var CountLines = require('../CountLines.js').CountLines;

describe('Java line counter:', function () {
  var countLines, input,
    allMessages = [];

  beforeEach(function () {
    countLines = new CountLines();
    input = [];
  });

  function getNumLines() {
    return countLines.input(input);
  }

  describe('single line, no comments', function () {
    it('an empty array', function () {
      expect(getNumLines()).toBe(0);
    });

    it('an empty string', function () {
      input.push('');
      expect(getNumLines()).toBe(0);
    });

    it('one character: *', function () {
      input.push('*');
      expect(getNumLines()).toBe(1);
    });

    it('one character: "', function () {
      input.push('"');
      expect(getNumLines()).toBe(1);
    });

    it('one character: /', function () {
      input.push('/');
      expect(getNumLines()).toBe(1);
    });

    it('whitspace only', function () {
      input.push(' \t\n\r');
      expect(getNumLines()).toBe(0);
    });
  });

  describe('line comments', function () {

    it('single line comment', function () {
      input.push('//');
      expect(getNumLines()).toBe(0);
    });

    it('start line comment followed by characters', function () {
      input.push('// comment');
      expect(getNumLines()).toBe(0);
    });

    it('whitespace followed by line comment', function () {
      input.push(' \t\n\r//');
      expect(getNumLines()).toBe(0);
    });

    it('whitespace followed by line comment followed by text', function () {
      input.push(' \t\n\r// comment');
      expect(getNumLines()).toBe(0);
    });

  });

  describe('block comment', function () {


    it('start block comment', function () {
      input.push('/*');
      expect(getNumLines()).toBe(0);
    });

    it('whitespace followed by start block comment', function () {
      input.push(' \t\n\r/*');
      expect(getNumLines()).toBe(0);
    });

    it('whitespace followed by block comment', function () {
      input.push(' \t\n\r/**/');
      expect(getNumLines()).toBe(0);
    });

    it('whitespace followed by block comment followed by text', function () {
      input.push(' \t\n\r/* comment');
      expect(getNumLines()).toBe(0);
    });

    it('block comment only', function () {
      input.push('/**/');
      expect(getNumLines()).toBe(0);
    });

    it('block comment only containing text', function () {
      input.push('/* comment */');
      expect(getNumLines()).toBe(0);
    });

    it('block comment followed by text', function () {
      input.push('/**/ hello');
      expect(getNumLines()).toBe(1);
    });

    it('block comment with comment followed by text', function () {
      input.push('/* comment */ hello');
      expect(getNumLines()).toBe(1);
    });

    it('multiple block comments with comments', function () {
      input.push('/* comment */ /* hello! */');
      expect(getNumLines()).toBe(0);
    });

    it('Two block comments with text in between', function () {
      input.push('/* comment */ valid content /* hello! */');
      expect(getNumLines()).toBe(1);
    });

    it('block comment followed by line comment', function () {
      input.push('/**/ \t\n\r // comment');
      expect(getNumLines()).toBe(0);
    });

    it('block comment followed by line comment', function () {
      input.push('/*/*/*');
      expect(getNumLines()).toBe(1);
    });

  });

  describe('quote', function () {
    var expectedNumLines;
    afterEach(function () {
      expect(getNumLines()).toBe(expectedNumLines);
    });

    it('should recognize quotes', function () {
      input.push('""');
      expectedNumLines = 1;
    });

    it('should not be recognized inside of block quote', function () {
      input.push('/* " */ " /* " ');
      input.push('content */');
      expectedNumLines = 2;
    });

  });

});
