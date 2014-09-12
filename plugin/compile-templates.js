var path = Npm.require('path');

var doHTMLScanning = function (compileStep, htmlScanner) {
  // XXX the way we deal with encodings here is sloppy .. should get
  // religion on that
  var contents = compileStep.read().toString('utf8');
  var results;

  try {
    results = htmlScanner.scan(contents, compileStep.inputPath);
  } catch (e) {
    if (e instanceof htmlScanner.ParseError) {
      compileStep.error({
        message: e.message,
        sourcePath: compileStep.inputPath,
        line: e.line
      });
      return;
    } else {
      throw e;
    }
  }

  if (results.js) {
    var path_part = path.dirname(compileStep.inputPath);

    if (path_part === '.') {
      path_part = '';
    }

    if (path_part.length && path_part !== path.sep) {
      path_part = path_part + path.sep;
    }

    var ext = path.extname(compileStep.inputPath);
    var basename = path.basename(compileStep.inputPath, ext);

    // XXX generate a source map

    compileStep.addJavaScript({
      path: path.join(path_part, "template." + basename + ".md.js"),
      sourcePath: compileStep.inputPath,
      data: results.js
    });
  }
};

Plugin.registerSourceHandler(
  "md", {isTemplate: true, archMatching: 'web'},
  function (compileStep) {
    doHTMLScanning(compileStep, markdown_scanner);
  }
);
