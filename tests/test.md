{{#template name='1'}}
This is template 1.
{{/template}}

{{#template name="2"}}
This is template 2.
{{/template}}

{{#template name="3" foo='bar'}}
This is template 3.
{{/template}}

The template inclusion {{> hello}} in the template below shouldn't be wrapped
in paragraph tags.

{{#template name="4"}}
This is template 4.

{{> hello}}
{{/template}}

The helper {{hello}} in the template below should be wrapped in paragraph tags.

{{#template name="5"}}
This is template 5.

{{hello}}
{{/template}}

{{#template name="6"}}
This is template 6.

- {{helper}}
- {{> template}}
{{/template}}

The next few templates test different kinds of template names

{{#template name="has_underscore"}}
This is template has_underscore.
{{/template}}

{{#template name="has-dash"}}
This is template has-dash.
{{/template}}
