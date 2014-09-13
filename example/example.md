{{#template name='markdownBody'}}

# Welcome to Meteor!

{{> hello}}

{{/template}}

{{#template name="hello"}}

It's useful to be able to make templates with Markdown and be able to use
helpers inside them! That's what the `markdown-templating` package lets you do.
If you want to replicate a certain Markdown style, make sure to include the
proper CSS. In this case, we have included CSS for a GitHub look, from
[sindresorhus/github-markdown-css](https://github.com/sindresorhus/github-markdown-css/blob/gh-pages/github-markdown.css).

### Current Time

> Here's the current time: {{currentTime}}

### HTML Template Inclusion Below

{{> htmlTemplate}}

{{/template}}