# Karousel

A simple jQuery carousel plugin by [Jon Alport](http://jonalport.com/)

## Demo

[http://jonalport.github.com/karousel/example/](http://jonalport.github.com/karousel/example/)

## Quick start

These are the things you need to have in place to get started:

* Include jQuery
* Include Karousel
* Initialise Karousel
* Markup

## In the head
```html
<!-- Include jQuery -->
<script src="http://code.jquery.com/jquery-latest.js"></script>
<!-- Include Karousel -->
<script src="../jquery.karousel.js"></script>
<!-- Initialise Karousel -->
<script type="text/javascript">
  $(document).ready(function() {
    $('#slides').karousel({firstSlide: 2});
  });
</script>
```
## In the body
```html
<ul id="slides">
  <li>
    <p>Slide 1</p>
  </li>
  <li>
    <p>Slide 2</p>
  </li>
  <li>
    <p>Slide 3</p>
  </li>
</ul>
```
