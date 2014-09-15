markdown_scanner = {
  // Scan a template file for <head>, <body>, and <template>
  // tags and extract their contents.
  //
  // This is a primitive, regex-based scanner.  It scans
  // top-level tags, which are allowed to have attributes,
  // and ignores top-level HTML comments.

  // Has fields 'message', 'line', 'file'
  ParseError: function () {
  },

  scan: function (contents, source_name) {
    var results = {};

    var crazyTemplateRegex = /(^|\n){{#template(\s+\w+=["']\w+["'])+}}((.|[\n\r])+?)\n{{\/template}}/g;

    var match;
    while ((match = crazyTemplateRegex.exec(contents))) {
      var tag = "template"; // body currently not supported
      
      // get attributes
      var attribs = {};
      var startTagRegex = new RegExp("{{#template(\\s+\\w+=[\"']\\w+[\"'])+}}");
      var startTag = match[0].match(startTagRegex);
      var attribRegex = /(\w+)=["'](\w+)["']/g;

      while ((attribMatch = attribRegex.exec(startTag))) {
        attribs[attribMatch[1]] = attribMatch[2];
      }

      var templateContents = match[3];
      var contentsStartIndex = match.index + match[3].length;
      var throwParseError = function () {
        console.log("Parse error");
      };
      var tagStartIndex = match.index;

      markdown_scanner._handleTag(results, tag, attribs, templateContents,
        throwParseError, contentsStartIndex, tagStartIndex);
    }

    return results;
  },

  _initResults: function() {
    var results = {};
    results.head = '';
    results.body = '';
    results.js = '';
    return results;
  },

  _handleTag: function (results, tag, attribs, contents, throwParseError,
                        contentsStartIndex, tagStartIndex) {

    // do we have 1 or more attribs?
    var hasAttribs = false;
    for(var k in attribs) {
      if (attribs.hasOwnProperty(k)) {
        hasAttribs = true;
        break;
      }
    }

    if (tag === "head") {
      if (hasAttribs)
        throwParseError("Attributes on <head> not supported");
      results.head += contents;
      return;
    }


    // <body> or <template>

    try {
      if (tag === "template") {
        var name = attribs.name;
        if (! name)
          throwParseError("Template has no 'name' attribute");

        if (SpacebarsCompiler.isReservedName(name))
          throwParseError("Template can't be named \"" + name + "\"");

        var converter = new Showdown.converter();
    
        // parse markdown
        contents = converter.makeHtml(contents);

        // remove extraneous paragraphs around template inclusions
        contents = contents.replace(/<p>({{\s*>[^{}]+}})<\/p>/g, "$1");

        results.uncompiled = results.uncompiled || {};
        results.uncompiled[name] = contents;

        var renderFuncCode = SpacebarsCompiler.compile(
          contents, {
            isTemplate: true,
            sourceName: 'Template "' + name + '"'
          });

        var nameLiteral = JSON.stringify(name);
        var templateDotNameLiteral = JSON.stringify("Template." + name);

        results.js += "\nTemplate.__checkName(" + nameLiteral + ");\n" +
          "Template[" + nameLiteral + "] = new Template(" +
          templateDotNameLiteral + ", " + renderFuncCode + ");\n";
      } else {
        // <body>
        if (hasAttribs)
          throwParseError("Attributes on <body> not supported");

        var renderFuncCode = SpacebarsCompiler.compile(
          contents, {
            isBody: true,
            sourceName: "<body>"
          });

        // We may be one of many `<body>` tags.
        results.js += "\nTemplate.body.addContent(" + renderFuncCode + ");\nMeteor.startup(Template.body.renderToDocument);\n";
      }
    } catch (e) {
      if (e.scanner) {
        // The error came from Spacebars
        throwParseError(e.message, contentsStartIndex + e.offset);
      } else {
        throw e;
      }
    }
  }
};
