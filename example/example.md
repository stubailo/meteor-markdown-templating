{{#template name="markdownBody"}}

# Welcome to Meteor!

{{> hello}}

{{/template}}

{{#template name="hello" x="y"}}

## Hello

It's useful to be able to make templates with Markdown and be able to use
helpers inside them!

{{currentTime}}

{{/template}}