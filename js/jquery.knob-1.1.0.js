/**
 * Knob - jQuery Plugin
 * Backward compatible, touchable dial
 *
 * Version: 1.1.0 (10/05/2012)
 * Requires: jQuery v1.7+
 *
 * Copyright (c) 2011 Anthony Terrien
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to eskimoblood and spiffistan
 */
$(function() {

    $.fn.knob = $.fn.dial = function( gopt ) {

        return this.each(

                    function() {

                        var $this = $(this);

                        if( $this.data('dialed') ) return $this;
                        $this.data('dialed',true);

                        var opt = $.extend(
                                        {
                                            'min' : $this.data('min') || 0
                                            ,'max' : $this.data('max') || 100
                                            ,'cursor' : $this.data('cursor')
                                            ,'thickness' : $this.data('thickness') || .3
                                            ,'width' : $this.data('width') || 200
                                            ,'displayInput' : $this.data('displayinput')==null || $this.data('displayinput')
                                            ,'fgColor' : $this.data('fgcolor') || '#87CEEB' //#222222'
                                            ,'bgColor' : $this.data('bgcolor') || '#EEEEEE'
                                            ,'tickColor' : $this.data('tickColor') || $this.data('fgcolor') || '#DDDDDD'
                                            ,'ticks' : $this.data('ticks') || 0
                                            ,'tickLength' : $this.data('tickLength') || 0
                                            ,'tickWidth' : $this.data('tickWidth') || 0.02
                                            ,'tickColorizeValues' : $this.data('tickColorizeValues') || true
                                            ,'readOnly' : $this.data('readonly')
                                            ,'skin' : $this.data('skin') || 'default'
                                            ,'draw' :
                                                    /**
                                                     * @param int a angle
                                                     * @param int v current value
                                                     * @param array opt plugin options
                                                     * @param context ctx Canvas context 2d
                                                     */
                                                    function( a, v, opt, ctx ) {
                                                            var sa = 1.5*Math.PI        // Start angle
                                                                ,ea = sa+a              // End angle
                                                                ,r = opt.width/2        // Radius
                                                                ,lw = r*opt.thickness;  // Line width

                                                            ctx.clearRect(0, 0, opt.width, opt.width);
                                                            ctx.lineWidth = lw;

                                                            opt.cursor
                                                                && ( sa = ea-0.3 )
                                                                && ( ea = ea+0.3 );

                                                            var ticks = opt.ticks;
                                                            var tl = opt.tickLength;
                                                            var tw = opt.tickWidth;

                                                            for(tick = 0; tick < ticks; tick++) {

                                                                ctx.beginPath();

                                                                if(a > (((2 * Math.PI) / ticks) * tick) && opt.tickColorizeValues) {
                                                                    ctx.strokeStyle = opt.fgColor;
                                                                }else{
                                                                    ctx.strokeStyle = opt.tickColor;
                                                                }

                                                                var tick_sa = (((2 * Math.PI) / ticks) * tick) - (0.5 * Math.PI);
                                                                ctx.arc( r, r, r-lw-tl, tick_sa, tick_sa + tw , false);
                                                                ctx.stroke();
                                                            }

                                                            ctx.beginPath();
                                                            ctx.strokeStyle = opt.fgColor;
                                                            ctx.arc( r, r, r-lw, sa, ea, false);
                                                            ctx.stroke();

                                                            switch(opt.skin){

                                                                case 'default' :
                                                                    ctx.beginPath();
                                                                    ctx.strokeStyle = opt.bgColor;
                                                                    ctx.arc(
                                                                                r, r, r-lw ,sa
                                                                                ,(v==opt.min && !opt.cursor)
                                                                                    ? sa+0.0001
                                                                                    : ea
                                                                                , true
                                                                            );
                                                                    ctx.stroke();
                                                                    break;

                                                                case 'tron' :
                                                                    ctx.lineWidth = 2;
                                                                    ctx.beginPath();
                                                                    ctx.strokeStyle = opt.fgColor;
                                                                    ctx.arc( r, r, r-lw+1+lw*2/3, 0, 2*Math.PI, false);
                                                                    ctx.stroke();
                                                                    break;
                                                            }
                                                        }
                                            ,'change' :
                                                    /**
                                                     * @param int v Current value
                                                     */
                                                    function(v) {}
                                            ,'release' :
                                                    /**
                                                     * @param int v Current value
                                                     * @param jQuery ipt Input
                                                     */
                                                    function(v,ipt) {}
                                        }
                                        ,gopt
                                    );

                        var c = $('<canvas width="'+opt.width+'" height="'+opt.width+'"></canvas>')
                            ,wd = $('<div style=width:'+opt.width+'px;display:inline;"></div>')
                            ,k;

                        $this.wrap( wd ).before( c );

                        opt.displayInput
                        && $this.css(
                                    {
                                    'width' : opt.width/2+'px'
                                    ,'position' : 'absolute'
                                    ,'margin-top' : (opt.width*5/13)+'px'
                                    ,'margin-left' : '-'+3*opt.width/4+'px'
                                    ,'font-size' : opt.width/5+'px'
                                    ,'border' : 'none'
                                    ,'background' : 'none'
                                    ,'font-family' : 'Arial'
                                    ,'font-weight' : 'bold'
                                    ,'text-align' : 'center'
                                    ,'color' : opt.fgColor
                                    ,'padding' : '0px'
                                    ,'-webkit-appearance': 'none'
                                    }
                                )
                        || $this.css(
                                    {
                                    'width' : '0px'
                                    , 'visibility' : 'hidden'
                                    }
                                );

                        k = new Knob( c, opt );
                        k.onRelease = function(v) {
                                                    opt.release(v,$this);
                                                };
                        k.val( parseInt($this.val()) || 0 );
                        k.onChange = function(v) {
                                                    $this.val(v);
                                                    opt.change(v);
                                                 };

                        // bind change on input
                        $this.bind(
                                'change'
                                ,function( e ) {
                                    k.val( $this.val() );
                                }
                            );

                        if( !opt.readOnly ){
                            c.bind(
                                "mousedown touchstart"
                                ,function( e ) {
                                    e.preventDefault();
                                    k.startDrag( e );
                                }
                            );
                            
                            var keys={37: -1, 38:1, 39:1, 40: -1}
                            $this.keydown(function(event){
                                setVal( keys[event.keyCode]);
                                event.preventDefault();
                            });
                            
                            $this.bind('mousewheel DOMMouseScroll', function(event){
                                var originalEvent = event.originalEvent;
                                var deltaX = originalEvent.detail || originalEvent.wheelDeltaX;
                                var deltaY = originalEvent.detail || originalEvent.wheelDeltaY;
                                setVal( deltaX > 0 ||  deltaY > 0 ? 1 : deltaX < 0 ||  deltaY < 0 ? -1 : 0);
                                event.preventDefault();
                            });
                        }else{
                            $this.attr('readonly','readonly');
                        }

                        function setVal(dir){
                            if(dir){
                                k.val( parseInt($this.val()) + dir );
                            }
                        }
                    }
                ).parent();
    }

    Knob = function( c, opt ) {

        var v = null
            ,ctx = c[0].getContext("2d")
            ,a = Math.PI*0.0001
            ,PI2 = 2*Math.PI
            ,mx ,my ,x ,y
            ,_self = this;

        this.onChange = function() {}
        this.onRelease = function() {}

        this.val = function(_v) {
            if(null!=_v){
                if( v==_v ) return;
                v=_v;
                this.onChange(_v);
                a = (_v-opt.min)*PI2/(opt.max-opt.min);
                opt.draw( a, _v, opt, ctx );
            }else{
                var b = a = Math.atan2( mx-x, -(my-y-opt.width/2) );
                (a<0) && (b=a+PI2);
                 _v = Math.round( b*(opt.max-opt.min)/PI2 ) + opt.min;
                return ( _v>opt.max ) ? opt.max : _v;
            }
        }

        this.capture = function(e) {
            switch( e.type ){
                case 'mousemove' :
                case 'mousedown' :
                    mx = e.pageX;
                    my = e.pageY;
                    break;
                case 'touchmove' :
                case 'touchstart' :
                    mx = e.originalEvent.touches[0].pageX;
                    my = e.originalEvent.touches[0].pageY;
                    break;
            }
            this.val( this.val() );
        }

        this.startDrag = function(e) {

            var p = c.position();
            x = p.left+(opt.width/2);
            y = p.top;

            this.capture(e);

            $(document).bind(
                            "mousemove.dial touchmove.dial"
                            ,function(e) {
                                _self.capture(e);
                            }
                        )
                        .bind(
                            "mouseup.dial touchend.dial"
                            ,function() {
                                $(document).unbind('mousemove.dial touchmove.dial mouseup.dial touchend.dial');
                                _self.onRelease(v);
                            }
                        );
        }
    }
});