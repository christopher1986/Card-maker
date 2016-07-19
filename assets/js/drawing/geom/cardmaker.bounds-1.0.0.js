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
         * The X coordinate of this Bounds.
         *
         * @type {Number}
         * @public
         */
        self.x = 0;
        
        /**
         * The Y coordinate of this Bounds.
         *
         * @type {Number}
         * @public
         */
        self.y = 0;

        /**
         * The width of this Bounds in pixels.
         *
         * @type {Number}
         * @public
         */        
        self.width = 0;
        
        /**
         * The height of this Bounds in pixels.
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
            self.setMinX(x);
            self.setMinY(y);
            self.setWidth(width);
            self.setHeight(height);
        }
        init(x, y, width, height);
    }
    
    /**
     * Set the X coordinate for the upper-left corner of this Bounds.
     *
     * @param {Number} x the X coordinate.
     * @public
     */
    Bounds.prototype.setMinX = function(x) {
        this.x = (cardmaker.NumberUtil.isNumeric(x)) ? Math.floor(x) : 0;
    }

    /**
     * Returns the X coordinate of the upper-left corner of this Bounds.
     *
     * @return {Number} the X coordinate.
     * @public
     */
    Bounds.prototype.getMinX = function() {
        return this.x;
    }
    
    /**
     * Returns the X coordinate of the lower-right corner of this Bounds.
     *
     * The lower-right X coordinate is the same as adding the X coordinate 
     * of the upper-left corner with the width of this bounds.
     *
     * @return {Number} the maximum X coordinate.
     * @public
     */
    Bounds.prototype.getMaxX = function() {
        return this.x + this.width;
    }
    
    /**
     * Set the Y coordinate for the upper-left corner of this Bounds.
     *
     * @param {Number} x the X coordinate.
     * @public
     */
    Bounds.prototype.setMinY = function(y) {
        this.y = (cardmaker.NumberUtil.isNumeric(y)) ? Math.floor(y) : 0;
    }
    
    /**
     * Returns the Y coordinate of the upper-left corner of this Bounds.
     *
     * @return {Number} the Y coordinate.
     * @public
     */
    Bounds.prototype.getMinY = function() {
        return this.y;
    }
    
    /**
     * Returns the Y coordinate of the lower-right corner of this Bounds.
     *
     * The lower-right Y coordinate is the same as adding the Y coordinate 
     * of the upper-left corner with the height of this bounds.
     *
     * @return {Number} the maximum Y coordinate.
     * @public
     */
    Bounds.prototype.getMaxY = function() {
        return this.y + this.height;
    }
    
    /**
     * Set the width of this Bounds in pixels.
     *
     * @param {Number} width the width in pixels.
     * @public
     */
    Bounds.prototype.setWidth = function(width) {
        this.width = (cardmaker.NumberUtil.isNumeric(width) && width > 0) ? Math.floor(width) : 0;
    }
    
    /**
     * Returns the width of this bounds in pixels.
     *
     * @return {Number} the width in pixels.
     * @public
     */
    Bounds.prototype.getWidth = function() {
        return Math.max(this.width, 0);
    }
    
    /**
     * Set the height of this Bounds in pixels.
     *
     * @param {Number} height the height in pixels.
     * @public
     */
    Bounds.prototype.setHeight = function(height) {
        this.height = (cardmaker.NumberUtil.isNumeric(height) && height > 0) ? Math.floor(height) : 0; 
    }
    
    /**
     * Returns the height of this Bounds in pixels.
     *
     * @return {Number} the height in pixels.
     * @public
     */
    Bounds.prototype.getHeight = function() {
        return Math.max(this.height, 0);
    }
    
    /**
     * Tests if the boundary of the specified bounds is entirely contained within the boundary of this bounds.
     *
     * @param {cardmaker.Bounds} bounds the bounds whose boundary to test.
     * @return {Boolean} true if the specified bounds is contained within this bounds, otherwise false.
     * @public
     */
    Bounds.prototype.containsBounds = function(bounds) {
        var contains = false;
        if (bounds instanceof cardmaker.Bounds) {
            contains = (this.contains(bounds.getMinX(), bounds.getMinY()) && 
                        this.contains(bounds.getMaxY(), bounds.getMaxY());
        }
        
        return contains;
    }
    
    /**
     * Tests if the specified point is inside the boundary of this bounds.
     *
     * @param {cardmaker.Point} point the point to test.
     * @return {Boolean} true if the specified point is inside the boundary of this bounds.
     * @see {@link cardmaker.Bounds#contains(x, y)}
     * @public
     */
    Bounds.prototype.containsPoint = function(point) {
        var contains = false;
        if (point instanceof cardmaker.Point) {
            contains = this.contains(point.getX(), point.getY());
        }
        
        return contains;
    }
    
    /**
     * Tests if the specified (x, y) coordinates are inside the boundary of this bounds.
     *
     * @param {Number} x the X coordinate to test.
     * @param {Number} y the Y coordinate to test.
     * @return {Boolean} true if the specified coordinates are inside the boundary of this bounds, otherwise false.
     * @public
     */
    Bounds.prototype.contains = function(x, y) {
        return (x >= this.getMinX() && x <= this.getMaxX() && 
                y >= this.getMinY() && y <= this.getMaxY());
    }
    
    /**
     * Returns true if this Bounds does not enclose an area.
     * 
     * @return {Boolean} true if the dimensions of this Bounds are less or equal to zero, otherwise false.
     * @public
     */
    Bounds.prototype.isEmpty = function() {
        return (this.getWidth() <= 0 || this.getHeight() <= 0);
    }
    
    /**
     * Returns a {@link cardmaker.Bounds} object that represents the intersection.
     * 
     * If the two bounds don't interset the width and height of the resulting Bounds
     * object will be zero and is thus considered to be empty.
     *
     * @param {cardmaker.Bounds} a bounds object containing the intersection.
     * @throws {TypeError} if the specified argument is not a {@link cardmaker.Bounds} object.
     * @public
     */
    Bounds.prototype.intersection = function(bounds) {
        if (!(bounds instanceof Bounds)) {
            throw new TypeError('Bounds expects a cardmaker.Bounds object.');
        }
         
        // compute boundary.
        var minX   = Math.max(this.getMinX(), bounds.getMinX());
        var minY   = Math.max(this.getMinY(), bounds.getMinY());
        var width  = Math.min(this.getMaxX(), bounds.getMaxX()) - minX;
        var height = Math.min(this.getMaxY(), bounds.getMaxY()) - minY;
        
        return new Bounds(minX, minY, width, height);
    }
    
    /**
     * Tests whether this bounds intersects with the specified {@link cardmaker.Bounds} object.
     *
     * @return {Boolean} true if the bounds intersect, otherwise false.
     * @public
     */
    Bounds.prototype.intersects = function(bounds) {
        // the bounds cannot intersect.
        if (this.isEmpty() || bounds.isEmpty()) {
            return false;
        }
        
        return (bounds.getMaxX() > this.getMinX() &&
                bounds.getMaxY() > this.getMinY() &&
                bounds.getMinX() < this.getMaxX() &&
                bounds.getMinY() < this.getMaxY());
    }

    // add Bounds to namespace.
    cardmaker.Bounds = Bounds;

})(this, this.document, this.cardmaker = this.cardmaker || {});
