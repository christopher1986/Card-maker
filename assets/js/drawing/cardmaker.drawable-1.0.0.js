(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The InvalidateEvent contains information about a Drawable object that has been invalidated.
     *
     * @author Chris Harris <c.haris@hotmail.com>
     * @version 1.0.0
     * @since 1.1.0
     */
    function InvalidateEvent(type, target) {
        /**
         * A reference to this object.
         *
         * @typedef {InvalidateEvent}
         * @private
         */
        var self = this;
        
        /**
         * The Drawable that is invalid.
         *
         * @typedef {cardmaker.Drawable}
         * @public
         */
        self.target = null;
        
        /**
         * Initialize the InvalidateEvent.
         *
         * @param {String} the event type.
         * @private
         */
        function init(type, target) {
            // call parent constructor.
            cardmaker.Event.call(self, type);
        
            self.target = target;
        }
        init(type, target);
    }
    
    // inherit from cardmaker.Event. 
    InvalidateEvent.prototype = Object.create(cardmaker.Event.prototype);
    InvalidateEvent.prototype.constructor = InvalidateEvent;
    
    /**
     * The Drawable class represents "something that can be drawn" onto a {@link cardmaker.Canvas} object.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Drawable() {
        /**
         * A reference to this object.
         *
         * @typedef {Drawable}
         * @private
         */
        var self = this;
        
        // call parent constructor.
        cardmaker.MVCObject.call(self);
    }
    
    // inherit from cardmaker.MVCObject.
    Drawable.prototype = Object.create(cardmaker.MVCObject.prototype);
    Drawable.prototype.constructor = Drawable;
    
    /**
     * Draw this {@link Drawable} onto the specified {@link cardmaker.Canvas}.
     *
     * Don't call this method directly, instead call the {@link Drawable#invalidate()} method
     * and allow the canvas to compute if other objects should be invalidated and redrawn.
     *
     * @param {cardmaker.Canvas} canvas the canvas on which to draw.
     * @public
     */
    Drawable.prototype.draw = function(canvas) {
    
    }
    
    /**
     * Invalidate this {@link Drawable} and redraw it at some point in the future.
     *
     * @see {@link Drawable#draw(canvas)}
     * @public
     */
    Drawable.prototype.invalidate = function() {
        this.on('invalidate', new InvalidateEvent('invalidate', this));
    }
    
    // add Drawable to namespace.
    cardmaker.Drawable = Drawable;
    // add InvalidateEvent to namespace.
    cardmaker.InvalidateEvent = InvalidateEvent;

})(this, this.document, this.cardmaker = this.cardmaker || {});
