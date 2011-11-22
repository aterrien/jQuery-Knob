/**
 * Knob - jQuery Plugin
 * Nice, configurable, backward compatible knob UI component
 *
 * Copyright (c) 2011 - 2013 Anthony Terrien

 * Version: 1.0.0 (21/11/2011)
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

                            opt = $.extend(
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
                                            }
                                            ,gopt
                                        );

                            var c = $('<canvas width="'+opt.width+'" height="'+opt.width+'"></canvas>')
                                //,ipt = $('<input type="text">')
                                ,wd = $('<div style=width:'+opt.width+'px;display:inline;"></div>')
                                ,k;

                            $this.wrap( wd )
                            $this.before( c );

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
                                        ,'color' : 'lightgrey'
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

                            k = new Knob( $this, c, opt );
                            k.set( parseInt($this.val()) || 0 );

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

                            return $this;
                        }
                    );
    }

    Knob=function( ipt, c, opt ){

        var v = 0
            ,ctx = c[0].getContext("2d")
            ,a = Math.PI*0.0001
            ,a2 = 2*Math.PI
            ,r = opt.width/2
            ,lw = r*opt.thickness
            ,mx ,my ,x ,y
            ,self = this;
            ;

        this.set = function( _v ) {
            v=( _v>opt.max ) ? opt.max : _v;
            ipt.val(v);
            a = (v-opt.min)*a2/(opt.max-opt.min);
            this.draw();
        }

        this.get = function() {
            var dx = mx-x
                ,dy = -(my-y-opt.width/2)
                ,b = a = Math.atan2(dx,dy);

            (a<0) && (b=a+a2);
            return v = Math.round( b*(opt.max-opt.min)/a2 ) + opt.min;
        }

        this.capture = function( e ) {
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
            this.set( this.get() );
        }

        this.startDrag = function( e ) {

            var p = c.position();

            x = p.left+(opt.width/2);
            y = p.top;

            this.capture(e);
            
            $(document).bind(
                            "mousemove.knob touchmove.knob"
                            ,function( e ){
                                self.capture(e);
                            }
                        )
                        .bind(
                            "mouseup touchend"
                            ,function(){
                                $(document).unbind('mousemove.knob touchmove.knob');
                            }
                        );
        }

        this.draw = function() {

            var _sa = 1.5*Math.PI
                ,_ea = _sa+a;

            ctx.clearRect(0, 0, opt.width, opt.width);
            ctx.lineWidth = lw;

            opt.cursor
                && (_sa=_ea-0.3 )
                && (_ea=_ea+0.3 );

            ctx.beginPath();
            ctx.strokeStyle = opt.fgColor;
            ctx.arc( r, r, r-lw, _sa, _ea, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = opt.bgColor;
            ctx.arc(
                        r, r, r-lw
                        ,_sa
                        ,(v==opt.min && !opt.cursor)
                            ? _sa+0.0001
                            : _ea
                        , true
                    );
            ctx.stroke();
        };
    }

    $(".knob").knob();
});

