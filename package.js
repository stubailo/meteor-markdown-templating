Package.describe({
  summary: "Define templates inside .md files.",
  version: '1.1.1',
  name: "simple:markdown-templating",
  git: "https://github.com/stubailo/meteor-markdown-templating"
});

// Today, this package is closely intertwined with Showdown and Spacebars
Package._transitional_registerBuildPlugin({
  name: "compileMarkdownTemplates",
  use: [
    'showdown',
    'spacebars-compiler',
    'underscore'
  ],
  sources: [
    'plugin/markdown-scanner.js',
    'plugin/compile-templates.js'
  ]
});

// This on_use describes the *runtime* implications of using this package.
Package.onUse(function (api) {
  api.versionsFrom("0.9.1");
  api.imply(['templating'], 'client');
});

Package.onTest(function (api) {
  api.use([
    "tinytest",
    "simple:markdown-templating",
    "underscore",
    "spacebars-compiler",
    "showdown"
  ]);

  api.addFiles([
    "plugin/markdown-scanner.js",
    "tests/tests.js"
  ], "server");

  api.addFiles([
    "tests/test.md"
  ], "server", {asset: true});
});
