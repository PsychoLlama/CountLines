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
//    countLines.logger('<' + line + '>');
//  var validLine = false;
  if (line.match(/^\s*$/)) {
    // Just whitespace
    return;
  }
  if (line.match(/^\s*\/\//)) {
    // Just whitespace with a line comment
    return;
  }
  countLines.logger(line);
  var regex = 'c';
//  var regex = /\/\*.*?\*\//;
  if (line.match(regex)) {
console.log('here');
    line = line.replace(regex, 'd');
  }
  countLines.logger(line);
/*
  if (line.match(/^\s*(\/\*.*\*\/\s*)+?$/)) {
    // Just whitespace with complete
    //  block comment and optional whitespace
    return;
  }
  if (line.match(/^\s*(\/\*.*\*\/.*)+?$/)) {
    // Just whitespace with complete
    //  block comment and optional whitespace
    return true;
  }
  if (line.match(/^\s*\/\*.*\*\/((\s*\/\/.*)|\s*)$/)) {
    // Just whitespace with complete
    //  block comment and optional whitespace
    return;
  }
  if (line.match(/^\s*\/\*.*\*\/.*\S*.*$/)) {
    // Complete block comment followed by valid content
    return true;
  }
  if (line.match(/^\s*\/\*.*((\*[^/])|.*)$/)) {
    // Block comment does not end on this line
    return;
  }
/**/
  return true;
}

exports.CountLines = CountLines;