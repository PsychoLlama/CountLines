/*globals exports */
/*jslint plusplus: true */
'use strict';

function lineIsValid(line, countLines) {
  var validLine = false,
    insideQuote = false,
    nextChar,
    i;

  if (line.match(/^\s*$/)) {
    return;
  }
  if (line.match(/^\s*\/\//)) {
    return;
  }
  for (i = 0; i < line.length; i++) {

    switch (line[i]) {
    case '*':
      if (insideQuote) {
        break;
      }
      if (!countLines.insideBlockComment) {
        validLine = true;
      } else if (line[i + 1] === '/') {
        countLines.insideBlockComment = false;
        i++;
      }
      break;
    case '"':
      if (countLines.insideBlockComment) {
        break;
      }
      insideQuote = !insideQuote;
      validLine = true;
      break;
    case ' ':
    case '\t':
    case '\r':
    case '\n':
      break;
    case '/':
      if (insideQuote) {
        break;
      }
      if (countLines.insideBlockComment) {
        break;
      }
      if (line[i + 1] === '*') {
        countLines.insideBlockComment = true;
        i++;
      } else if (line[i + 1] === '/') {
        return validLine;
      } else {
        validLine = true;
      }
      break;
    default:
      if (countLines.insideBlockComment) {
        break;
      }
      validLine = true;
    }
  }

  return validLine;
}

function CountLines() {
  this.numLines = 0;
  this.messages = [];
}

CountLines.prototype = {
  constructor: CountLines,

  input: function (input) {
    var countLines = this;
    input.forEach(function (string) {
      if (lineIsValid(string, countLines)) {
        countLines.numLines++;
      }
    });
    return this.numLines;
  }
};

function charAt(line, index) {
  if (line.length <= index) {
    return false;
  }
  return line[index];
}

module.exports = CountLines;
