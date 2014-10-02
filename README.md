markdown-templating
===================

Make Meteor templates in .md files!

### How to use

`meteor add simple:markdown-templating`

Check out the [example app](https://github.com/stubailo/meteor-markdown-templating/tree/master/example), in particular [example.md](https://github.com/stubailo/meteor-markdown-templating/blob/master/example/example.md).

Make a markdown file inside your Meteor app. Inside your markdown, use `{{#template name='templateName'}}` to start a template, and `{{/template}}` to end it. For example:

```
{{#template name='markdownBody'}}

# Welcome to Meteor!

There's another template included below.

{{> hello}}

{{/template}}
```

Naturally, you can use helpers and include other templates inside your Markdown as well.

### Why would I use this if there's already the {{#markdown}} helper?

- You like to use an editor with live preview ([Mou](http://mouapp.com/)) to edit Markdown files, and it doesn't work with Markdown embedded in HTML.
- With this package, your markdown will be pre-compiled on the server when the app is built instead of compiled on the client every time the page is loaded.
- If you want to make a lot of templates that use Markdown, it's easier and more reasonable to keep them in .md files than .html files.
- Extending the Meteor templating system is fun.

### How well tested is this package?

There are a few tests, but they are mostly sanity checks and don't go into testing all of the possible combinations of templates, markdown, and helpers.

Please report issues if you find them!

### Known issues/weirdness

1. No error handling - you'll just get a printout that says "parse error" in the console... if you're lucky.