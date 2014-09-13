Package.describe({
  summary: "Define templates inside .md files.",
  version: '1.0.1',
  name: "sashko:markdown-templating",
  git: "https://github.com/stubailo/meteor-markdown-templating"
});

// Today, this package is closely intertwined with Showdown and Spacebars
Package._transitional_registerBuildPlugin({
  name: "compileTemplates",
  use: ['showdown', 'spacebars-compiler', 'underscore'],
  sources: [
    'plugin/md_scanner.js',
    'plugin/compile-templates.js'
  ]
});

// This on_use describes the *runtime* implications of using this package.
Package.on_use(function (api) {
  api.versionsFrom("0.9.1");
  api.imply(['templating'], 'client');
});
