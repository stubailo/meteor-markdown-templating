Package.describe({
  summary: "Allows templates to be defined in .md files",
  version: '1.0.0',
  name: "sashko:markdown-templating"
});

// Today, this package is closely intertwined with Showdown and Spacebars

Package._transitional_registerBuildPlugin({
  name: "compileTemplates",
  use: ['showdown', 'spacebars-compiler', 'underscore'],
  sources: [
    'plugin/html_scanner.js',
    'plugin/compile-templates.js'
  ]
});

// This on_use describes the *runtime* implications of using this package.
Package.on_use(function (api) {
  // html_scanner.js emits client code that calls Meteor.startup and
  // Blaze, so anybody using templating (eg apps) need to implicitly use
  // 'meteor' and 'blaze'.
  api.use('blaze');
  api.use('underscore');
  api.imply(['meteor', 'blaze', 'templating'], 'client');
});
