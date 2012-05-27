jQuery Knob
=============

- canvas based ; no png or jpg sprites.
- touch, mousewheel, keyboard events implemented.
- downward compatible ; overloads an input element.

Example
-------

    <input type="text" value="75" class="dial">

    <script>
    $(function() {
        $(".dial").knob();
    }
    </script>

Options
-------

Options are provided as attributes 'data-option':

    <input type="text" class="dial" data-min="-50" data-max="50">

... or in the "knob()" call :

    $(".dial").knob({
                    'min':-50
                    ,'max':50
                    })

The following options are supported :

Behaviors :
* min : min value || default=0.
* max : max value || default=100.
* stopper : stop at 0 & 100 on keydown/mousewheel || default=true.
* readOnly : disable input and events.
* angleOffset: change the 0 position of the knob (in degree), || default=0.

UI :
* cursor : display mode "cursor" | default=gauge.
* thickness : gauge thickness.
* width : dial width.
* displayInput : default=true | false=hide input.
* displayPrevious : default=false | true=displays the previous value with transparency.
* fgColor : foreground color.
* bgColor : background color.
* ticks : number of ticks | 0=disable.
* tickColor.
* tickLength.
* tickWidth.
* tickColorizeValues : colorize ticks.
* skin : default | "tron".

Hooks
-------

    <script>
    $(".dial").knob({
                        'release':function(v,ipt) { /*make something*/ }
                    });
    </script>

* 'release' : executed on release

    Parameters :
    + value : int, current value
    + input : jQuery element, input element

* 'change' : executed at each change of the value

    Parameters :
    + value : int, current value

* 'draw' : when drawing the canvas

    Parameters :
    + angle : computed angle
    + value : current value
    + opt : plugin options
    + context : Canvas context 2d

Example
-------

    <input type="text" value="75" class="dial">

    <script>
    $(".dial").knob(
                        {
                        'change':function(e){
                                console.log(e);
                            }
                        }
                    );
    </script>


Dynamically configure
-------

    <script>
    $('.dial').trigger('configure',{"min":10, "max":40, "fgColor":"#FF0000", "skin":"tron", "cursor":true})
    </script>

Supported browser
-------

Tested on Chrome, Safari, Firefox, IE 9.0.

Revision 1.1.2
-------
- removed padding around the wheel in default skin / default thickness = 0.35.
- 'configure' event.
- added 'displayPrevious' option.
- change color cgColor / 'displayPrevious' must be true.
- escape keycode supported while changing = restore the current value.
- tab keycode supported.
- added 'stopper'.
- bugfix init when 'value' attribute is not defined.
- JSLint qa.
- infinite mode demo.

Revision 1.1.1
-------
- keyboard/mousewheel control refactoring / acceleration.
- bugfix no keyboard or mousewheel when readonly.
- bugfix min/max can be exceeded.
- hooks / keyboard events.

