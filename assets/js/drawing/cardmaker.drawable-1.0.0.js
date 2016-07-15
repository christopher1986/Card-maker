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
        
        /**
         * A drawable object that contains this drawable.
         *
         * @typedef {cardmaker.Drawable}
         * @private
         */
        self.parent = null;
        
        /**
         * The x coordinate relative to the parent location.
         *
         * @type {Number}
         * @private
         */ 
        self.x = 0;
        
        /**
         * The y coordinate relative to the parent location.
         *
         * @type {Number}
         * @private
         */
        self.y = 0;
        
        /**
         * A transformation matrix. 
         *
         * @typedef {cardmaker.Matrix}
         * @private
         */
        self.matrix = new cardmaker.Matrix();
        
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
     * @abstract
     */
    Drawable.prototype.draw = function(canvas) {
        throw new Error('This method must be implemented by a subclass.');
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
    
    /**
     * Set the parent of this drawable.
     *
     * @param {cardmaker.DrawableContainer|null} parent the parent of this drawable, or null to remove the current parent.
     * @throws {TypeError} if the specified argument is not a {@link cardmaker.DrawableContainer} or null literal.
     * @public
     */
    Drawable.prototype.setParent = function(parent) {
        if (!(parent instanceof cardmaker.DrawableContainer) || parent !== null ) {
            throw new TypeError('Drawable expects parent to be a cardmaker.DrawableContainer object');
        }
        
        this.parent = parent;
    }
    
    /**
     * Returns if present the parent this drawable.
     *
     * @return {cardmaker.DrawableContainer|null} the parent of this drawable, or null if this drawable has no parent.
     * @public
     */
    Drawable.prototype.getParent = function() {
        return this.parent;
    }
    
    /**
     * Set the x coordinate of this drawable which will be relative to the parent location. 
     *
     * @param {Number} x the x coordinates of the drawable.
     * @throws {TypeError} if the specified argument is not a numeric value.
     * @public
     */
    Drawable.prototype.setX= function(x) {
        if (!cardmaker.NumberUtil.isNumeric(x)) {
            throw new TypeError('Drawable expects the x coordinate to be a numeric value.')
        }
        
        this.x = x;
    }
    
    /**
     * Returns the x coordinate of this drawable which is relative to the parent location. 
     *
     * @return {Number} the x coordinates of the drawable.
     * @public
     */
    Drawable.prototype.getX = function() {
        return this.x;
    }
    
    /**
     * Set the y coordinate of this drawable which will be relative to the parent location. 
     *
     * @param {Number} y the y coordinates of the drawable.
     * @throws {TypeError} if the specified argument is not a numeric value.
     * @public
     */
    Drawable.prototype.setY = function(y) {
        if (!cardmaker.NumberUtil.isNumeric(y)) {
            throw new TypeError('Drawable expects the y coordinate to be a numeric value.')
        }
        
        this.y = y;
    }
    
    /**
     * Returns the y coordinate of this drawable which is relative to the parent location. 
     *
     * @return {Number} the y coordinates of the drawable.
     * @public
     */
    Drawable.prototype.getY = function() {
        return this.y;
    }
    
    /**
     * Converts the point object from the drawable (local) coordinates to the canvas (global) coordinates.
     *
     * @param {cardmaker.Point} point the local coordinates to convert.
     * @return {cardmaker.Point} point object containing the global coordinates.
     * @public
     */
    Drawable.prototype.localToGlobal = function(point) {
    
    }
    
    /**
     * Converts the point object from the canvas (global) coordinates to the drawable (local) coordinates.
     *
     * @param {cardmaker.Point} point the global coordinates to convert.
     * @return {cardmaker.Point} point object containing the local coordinates.
     * @public
     */
    Drawable.prototype.globalToLocal = function(point) {
    
    }
    
    // add Drawable to namespace.
    cardmaker.Drawable = Drawable;
    // add InvalidateEvent to namespace.
    cardmaker.InvalidateEvent = InvalidateEvent;

})(this, this.document, this.cardmaker = this.cardmaker || {});
