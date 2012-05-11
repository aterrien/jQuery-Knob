/**
 * Knob - jQuery Plugin
 * Nice, configurable, backward compatible knob UI component
 *
 * Copyright (c) 2011 - 2013 Anthony Terrien

 * Version: 1.0.0 (23/11/2011)
 * Requires: jQuery v1.7+
 *
 * Under MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
$(function() {

    $.fn.knob = function( gopt ) {

        return this.each(

                    function() {

                        var $this = $(this);

                        if( $this.data('knobed') ) return $this;
                        $this.data('knobed',true);

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
                                                            var sa = 1.5*Math.PI
                                                                ,ea = sa+a
                                                                ,r = opt.width/2
                                                                ,lw = r*opt.thickness;

                                                            ctx.clearRect(0, 0, opt.width, opt.width);
                                                            ctx.lineWidth = lw;

                                                            opt.cursor
                                                                && ( sa = ea-0.3 )
                                                                && ( ea = ea+0.3 );

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
                        }else{
                            $this.attr('readonly','readonly');
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
                            "mousemove.knob touchmove.knob"
                            ,function(e) {
                                _self.capture(e);
                            }
                        )
                        .bind(
                            "mouseup.knob touchend.knob"
                            ,function() {
                                $(document).unbind('mousemove.knob touchmove.knob mouseup.knob touchend.knob');
                                _self.onRelease(v);
                            }
                        );
        }
    }
});