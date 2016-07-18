(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * A Bounds class defines the dimension and location of an object in a two-dimensional space.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Bounds(x, y, width, height) {
        /**
         * A reference to this object.
         *
         * @typedef {Bounds}
         * @private
         */
        var self = this;
        
        /**
         * The X coordinate of the Bounds.
         *
         * @type {Number}
         * @public
         */
        self.x = 0;
        
        /**
         * The Y coordinate of the Bounds.
         *
         * @type {Number}
         * @public
         */
        self.y = 0;

        /**
         * The width of the Bounds in pixels.
         *
         * @type {Number}
         * @public
         */        
        self.width = 0;
        
        /**
         * The height of the Bounds in pixels.
         *
         * @type {Number}
         * @public
         */
        self.height = 0;
        
        /**
         * Initialize the Bounds.
         *
         * @param {Number} x (optional) the X coordinate.
         * @param {Number} y (optional) the Y coordinate.
         * @param {Number} width (optional) the width in pixels.
         * @param {Number} height (optional) the height in pixels.
         */
        function init(x, y, width, height) {
            self.setX(x);
            self.setY(y);
            self.setWidth(width);
            self.setHeight(height);
        }
        init(x, y, width, height);
    }
    
    /**
     * Set the X coordinate of the Bounds.
     *
     * @param {Number} x the X coordinate.
     * @public
     */
    Bounds.prototype.setX = function(x) {
        this.x = (cardmaker.NumberUtil.isNumeric(x)) ? Math.floor(x) : 0;
    }

    /**
     * Returns the X coordinate of the Bounds.
     *
     * @return {Number} the X coordinate.
     * @public
     */
    Bounds.prototype.getX = function() {
        return this.x;
    }
    
    /**
     * Set the Y coordinate of the Bounds.
     *
     * @param {Number} y the Y coordinate.
     * @public
     */
    Bounds.prototype.setY = function(y) {
        this.y = (cardmaker.NumberUtil.isNumeric(y)) ? Math.floor(y) : 0;
    }
    
    /**
     * Returns the Y coordinate of the Bounds.
     *
     * @return {Number} the Y coordinate.
     * @public
     */
    Bounds.prototype.getY = function() {
        return this.y;
    }
    
    /**
     * Set the width of the Bounds in pixels.
     *
     * @param {Number} width the width in pixels.
     * @public
     */
    Bounds.prototype.setWidth = function(width) {
        this.width = (cardmaker.NumberUtil.isNumeric(width)) ? Math.floor(width) : 0;
    }
    
    /**
     * Returns the width of the bounds in pixels.
     *
     * @return {Number} the width in pixels.
     * @public
     */
    Bounds.prototype.getWidth = function() {
        return this.width;
    }
    
    /**
     * Set the height of the Bounds in pixels.
     *
     * @param {Number} height the height in pixels.
     * @public
     */
    Bounds.prototype.setHeight = function(height) {
        this.height = (cardmaker.NumberUtil.isNumeric(height)) ? Math.floor(height) : 0; 
    }
    
    /**
     * Returns the height of the Bounds in pixels.
     *
     * @return {Number} the height in pixels.
     * @public
     */
    Bounds.prototype.getHeight = function() {
        return this.height;
    }
    
    /**
     * Returns a {@link cardmaker.Bounds} object that represents the intersection.
     *
     * @param {cardmaker.Bounds|null} the intersection, or null if the bounds don't intersect.
     */
    Bounds.prototype.intersect = function(bounds) {
        
    }
    
    /**
     * Tests whether this bounds intersects with the specified {@link cardmaker.Bounds} object.
     *
     * @return {Boolean} true if the bounds intersect, otherwise false.
     */
    Bounds.prototype.intersects = function(bounds) {
    
    }

    // add Bounds to namespace.
    cardmaker.Bounds = Bounds;

})(this, this.document, this.cardmaker = this.cardmaker || {});
