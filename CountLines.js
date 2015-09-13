function CountLines() {
  this.numLines = 0;
  this.messages = [];
}

CountLines.prototype = {
  constructor: CountLines,
  
  in: function(input) {
    var countLines = this;
    input.forEach(function(string) {
      if (validLine(string, countLines)) {
        countLines.numLines++;
      }
    });
    return this.numLines;
  },
  
  logger: function(message) {
    this.messages.push(message);
  }
}

function validLine(line, countLines) {
  var validLine = false;
  var insideQuote = false;
  
  if (line.match(/^\s*$/)) {
    return;
  }
  if (line.match(/^\s*\/\//)) {
    return;
  }
  for (var i = 0; i < line.length; i++) {
    switch(line[i]) {
      case '*':
        if (insideQuote) break;
        if (!countLines.insideBlockComment) {
          validLine = true;
        } else if (charAt(line, i + 1) === '/') {
          countLines.insideBlockComment = false;
          i++;
        }
        break;
      case '"':
        if (countLines.insideBlockComment) break;
        insideQuote = !insideQuote;
        validLine = true;
        break;
      case ' ':
      case '\t':
      case '\r':
      case '\n':
        break;
      case '/':
        if (insideQuote) break;
        if (countLines.insideBlockComment) break;
        nextChar = charAt(line, i+1);
        if (nextChar === '*') {
          countLines.insideBlockComment = true;
          i++;
        } else if (nextChar === '/') {
          return validLine;
        } else {
          validLine = true;
        }
        break;
      default:
        if (countLines.insideBlockComment) break;
        validLine = true;
    }
  }
  
  return validLine;
}
function charAt(line, index) {
  if (line.length <= index) {
    return false;
  }
  return line[index];
}

exports.CountLines = CountLines;