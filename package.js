Package.describe({
  summary: "Define templates inside .md files.",
  version: '2.0.3',
  name: "simple:markdown-templating",
  git: "https://github.com/stubailo/meteor-markdown-templating"
});

// Today, this package is closely intertwined with Showdown and Spacebars
Package.registerBuildPlugin({
  name: "compileMarkdownTemplates",
  use: [
    'caching-compiler@1.1.6',
    'ecmascript@0.7.0',
    'markdown@1.0.4',
    'spacebars-compiler@1.0.6',
    'underscore@1.0.3',
    'simple:highlight.js@1.0.9'
  ],
  sources: [
    'plugin/markdown-scanner.js',
    'plugin/compile-templates.js'
  ]
});

// This on_use describes the *runtime* implications of using this package.
Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.imply(['templating@1.3.0'], 'client');
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

  api.addAssets([
    "tests/test.md"
  ], "server");
});
