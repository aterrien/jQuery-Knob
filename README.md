jQuery Knob
=============

- canvas based ; no png or jpg sprites
- touch, mousewheel, keyboard events implemented
- downward compatible ; overloads an input element

Options
-------

The following options (data-*=attributes) are supported :

* min : min value
* max : max value
* cursor : display mode "cursor" | default=gauge
* thickness : gauge thickness
* width : dial width
* displayInput : default=true | false=hide input
* fgColor : foreground color
* bgColor : background color
* ticks : number of ticks | 0=disable
* tickColor
* tickLength
* tickWidth
* tickColorizeValues : colorize ticks
* readOnly : disable input and events
* skin : default | "tron"

Hooks
-------

* draw : when drawing the canvas
* change : at each change of value
* release : on release

Example 1
-------

    <input type="text" value="75" class="dial">

    <script>
    $(function() {
        $(".dial").knob();
    }
    </script>


Example 2
-------

    <input type="text" value="75" class="dial">

    <script>
    $(".dial").knob(
                        {
                        'change':function(e){
                                console.log(e);
                            }
                        }
                    )
              .val(79);
    </script>


Tested on Chrome, Safari, Firefox.
Not tested on MSIE.


1.1.1
-------
- keyboard/mousewheel control refactoring / acceleration
- bugfix no keyboard or mousewheel when readonly
- bugfix min/max can be exceeded
- hooks / keyboard events

