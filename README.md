markdown-templating
===================

Make Meteor templates in .md files!

### How to use

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

- I like to use an editor with live preview ([Mou](http://mouapp.com/)) to edit Markdown files, and it doesn't work with Markdown embedded in HTML.
- With this package, your markdown will be pre-compiled on the server when the app is built instead of compiled on the client every time the page is loaded.
- If you want to make a lot of templates that use Markdown, it's easier and more reasonable to keep them in .md files than .html files.
- Extending the Meteor templating system is fun.

### How well tested is this package?

Not at all. I'm working on it though - I'm excited about using it in my own future projects, and I want to be reasonable sure it will work all of the time.