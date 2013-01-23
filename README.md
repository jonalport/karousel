# Karousel

A simple jQuery carousel plugin by [Jon Alport](http://jonalport.com/)

## Quick start

These are the things you need to have in place to get started:

* Include jQuery
* Include Karousel
* Initialise Karousel
* Markup

## In the head

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

## In the body

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

## Demo

[http://github.jonalport.com/karousel/example/](http://github.jonalport.com/karousel/example/)