Tinytest.add("markdown-templating - markdown scanner", function (test) {
  var testMarkdown = Assets.getText("tests/test.md");

  var results = markdown_scanner.scan(testMarkdown);

  test.equal(results.uncompiled["1"], "<p>This is template 1.</p>");

  test.equal(results.uncompiled["2"], "<p>This is template 2.</p>");

  test.equal(results.uncompiled["3"], "<p>This is template 3.</p>");

  test.equal(results.uncompiled["4"],
    "<p>This is template 4.</p>\n" +
    "\n" +
    "{{> hello}}");

  test.equal(results.uncompiled["5"],
    "<p>This is template 5.</p>\n" +
    "\n" +
    "<p>{{hello}}</p>");

  test.equal(results.uncompiled["6"],
    "<p>This is template 6.</p>\n" +
    "\n" +
    "<ul>\n" +
    "<li>{{helper}}</li>\n" +
    "<li>{{> template}}</li>\n" +
    "</ul>");

  // XXX add error handling and test that too
});