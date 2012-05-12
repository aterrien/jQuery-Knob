jQuery Knob
=============

- canvas based ; no png or jpg sprites
- touch, mousewheel, keyboard events implemented
- downward compatible ; overloads an input element

Options
-------

Options are provided as attributes 'data-option':

    <input type="text" class="dial" data-min="-50" data-max="50">

The following options are supported :

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

    <script>
    $(".dial").knob({
                        'release':function(e) { /*make something*/ }
                    });
    </script>

* 'release' : executed on release.

            Parameters :
            - value : int, current value
            - input : jQuery element, input element

* 'change' : executed at each change of the value

            Parameters :
            - value : int, current value

* 'draw' : when drawing the canvas

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


Revision 1.1.1
-------
- keyboard/mousewheel control refactoring / acceleration
- bugfix no keyboard or mousewheel when readonly
- bugfix min/max can be exceeded
- hooks / keyboard events

