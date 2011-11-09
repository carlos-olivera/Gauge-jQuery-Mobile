/**
 * jQuery Mobile custom widget
 * Author: @carlos_olivera
 * Date: 11/7/11
 * Time: 10:08 PM
 * Based on slider component
 */

( function( $, undefined ) {

    $.widget( "mobile.gauge", $.mobile.widget, {
        options: {
            theme: null,
            trackTheme: null,
            disabled: false,
            initSelector: "div[type='gauge'], :jqmData(role='gauge')"
        },

        _create: function() {

            var self = this,

                control = this.element,
                valor =  parseFloat( control.attr( "value" ) ),
                parentTheme = $.mobile.getInheritedTheme( control, "c" ),
                theme = this.options.theme || parentTheme,
                trackTheme = this.options.trackTheme || parentTheme,
                selectClass = "ui-gauge-widget",
                controlID = control.attr( "id" ),
                labelID = controlID + "-label",
                textValueID = controlID + "-gtext",
                label = $( "[for='"+ controlID +"']" ).attr( "id", labelID ),

                min =  parseFloat( control.attr( "min" ) ),
                max =  parseFloat( control.attr( "max" ) ),
                step = window.parseFloat( control.attr( "step" ) || 1 ),

                gauge = $( "<div class='ui-gauge " + selectClass + " ui-btn-down-" + trackTheme +
                    " ui-btn-corner-all' role='application'></div>" ).appendTo(control),

                handle = $( "<p href='#' class='ui-gauge-handle'></p>" )
                    .appendTo( gauge )
                    .buttonMarkup({ corners: true, theme: theme, shadow: true })
                    .attr({
                        "role": "gauge",
                        "aria-valuemin": min,
                        "aria-valuemax": max,
                        "aria-valuenow": valor,
                        "aria-valuetext": valor,
                        "title": valor,
                        "aria-labelledby": labelID
                    }),
                options;

            $.extend( this, {
                gauge: gauge,
                handle: handle
            });

            gauge.wrapInner( "<div class='ui-gauge-inneroffset'></div>" );

            textval =  $( "<span class='ui-gauge-label ui-btn-corner-right' role='img' id='" + textValueID + "'>" + valor + "</span>" )
                .prependTo( handle );

            label.addClass( "ui-gauge" );

            control.addClass("ui-gauge-widget");

            //gauge.insertAfter( control );
            this.refresh(undefined, undefined, true);
        },

        refresh: function( val, isfromControl, preventInputUpdate ) {

            if ( this.options.disabled || this.element.attr('disabled')) {
                this.disable();
            }

            var control = this.element, percent,
                cType = control[0].nodeName.toLowerCase(),
                min = parseFloat( control.attr( "min" ) ),
                valor = parseFloat( control.attr( "value" ) ),
                controlID = control.attr( "id" ),
                textValueID = controlID + "-gtext",
                max = parseFloat( control.attr( "max" ) ),
                leyend = control.attr("leyend"),
                maxleyend = control.attr("maxleyend");

            if ( val == null ) {
                val = valor;
            }
            percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;

            if ( isNaN( percent ) ) {
                return;
            }

            if ( percent < 0 ) {
                percent = 0;
            }

            if ( percent > 100 ) {
                percent = 100;
            }

            var newval = Math.round( ( percent / 100 ) * ( max - min ) ) + min;

            if ( newval < min ) {
                newval = min;
            }

            var actualvalue = parseFloat( val ).toFixed(2);


            if ( newval > max ) {
                newval = max;
                actualvalue = maxleyend;
            }

            if (val > max) {
                actualvalue = maxleyend;
            }

            this.handle.css( "width", percent + "%" );
            this.handle.attr( {
                "aria-valuenow": newval,
                "aria-valuetext": newval,
                title: newval
            });


            if ( !preventInputUpdate ) {
                var valueChanged = false;

                valueChanged = valor !== newval;
                this.element.attr("value",valor);
                $("#" + textValueID).text( actualvalue + leyend);

                if ( !isfromControl && valueChanged ) {
                    control.trigger( "change" );
                }
            }
        },

        enable: function() {
            this.element.attr( "disabled", false );
            this.gauge.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
            return this._setOption( "disabled", false );
        },

        disable: function() {
            this.element.attr( "disabled", true );
            this.gauge.addClass( "ui-disabled" ).attr( "aria-disabled", true );
            return this._setOption( "disabled", true );
        }

    });

//auto self-init widgets
    $( document ).bind( "pagecreate create", function( e ){
        $.mobile.gauge.prototype.enhanceWithin( e.target );
    });

})( jQuery );

