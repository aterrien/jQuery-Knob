jQuery Knob
=============

- canvas based ; no png or jpg sprites.
- touch, mouse and mousewheel, keyboard events implemented.
- downward compatible ; overloads an input element.

Example
-------

    <input type="text" value="75" class="dial">

    <script>
    $(function() {
        $(".dial").knob();
    });
    </script>

Options
-------

Options are provided as attributes 'data-option':

    <input type="text" class="dial" data-min="-50" data-max="50">

... or in the "knob()" call :

    $(".dial").knob({
                    'min':-50
                    ,'max':50
                    });

The following options are supported :

Behaviors :
* min : min value | default=0.
* max : max value | default=100.
* step : step size | default=1.
* angleOffset : starting angle in degrees | default=0.
* angleArc : arc size in degrees | default=360.
* stopper : stop at min & max on keydown/mousewheel | default=true.
* readOnly : disable input and events | default=false.

UI :
* cursor : display mode "cursor", cursor size could be changed passing a numeric value to the option, default width is used when passing boolean value "true" | default=gauge.
* thickness : gauge thickness.
* lineCap : gauge stroke endings. | default=butt, round=rounded line endings
* width : dial width.
* displayInput : default=true | false=hide input.
* displayPrevious : default=false | true=displays the previous value with transparency.
* fgColor : foreground color.
* inputColor : input value (number) color.
* font : font family.
* fontWeight : font weight.
* bgColor : background color.

Hooks
-------

    <script>
    $(".dial").knob({
                        'release' : function (v) { /*make something*/ }
                    });
    </script>

* 'release' : executed on release

    Parameters :
    + value : int, current value

* 'change' : executed at each change of the value

    Parameters :
    + value : int, current value

* 'draw' : when drawing the canvas

    Context :
    - this.g : canvas context 2D (see Canvas documentation)
    - this.$ : jQuery wrapped element
    - this.o : options
    - this.i : input
    - ... console.log(this);

* 'cancel' : triggered on [esc] keydown

* 'error' : called if the browser doesn't support canvases and the plugin didn't initialize as a result

The scope (this) of each hook function is the current Knob instance (refer to the demo code).

Example
-------

    <input type="text" value="75" class="dial">

    <script>
    $(".dial").knob({
                     'change' : function (v) { console.log(v); }
                    });
    </script>


Dynamically configure
-------

    <script>
    $('.dial')
        .trigger(
            'configure',
            {
            "min":10,
            "max":40,
            "fgColor":"#FF0000",
            "skin":"tron",
            "cursor":true
            }
        );
    </script>

Set the value
-------

    <script>
    $('.dial')
        .val(27)
        .trigger('change');
    </script>

Supported browser
-------

Tested on Chrome, Safari, Firefox, IE 9.0.

MIT License
-------

Copyright (C) 2013 Anthony Terrien

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
