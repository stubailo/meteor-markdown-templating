markdown-templating
===================

Make Meteor templates in .md files!

### How to use

Make a markdown file inside your Meteor app. Inside your markdown, use `{{#template name='templateName'}}` to start a template, and `{{/template}}` to end it. For example:

```
{{#template name='markdownBody'}}

# Welcome to Meteor!

{{> hello}}

{{/template}}
```

Naturally, you can use helpers and include other templates inside your Markdown as well.

### How well tested is this package?

Not at all. I'm working on it though - I'm excited about using it in my own future projects, and I want to be reasonable sure it will work all of the time.