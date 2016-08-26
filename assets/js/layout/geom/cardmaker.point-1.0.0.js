(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Point class represents a location (x,y) in coordinate space.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Point(x, y) {
        /**
         * A reference to this object.
         *
         * @typedef {Point}
         * @private
         */
        var self = this;
        
        /**
         * The x-coordinate of this point.
         *
         * @type {Number}
         * @public
         */
        self.x = 0;
        
        /**
         * The y-coordinate of this point.
         *
         * @type {Number}
         * @public
         */
        self.y = 0;
        
        /**
         * Initialize the Point.
         *
         * @param {String|Number} x - (optional) the x-coordinate of this point.
         * @param {String|Number} y - (optional) the y-coordinate of this point.
         * @private
         */
        function init(x, y) {
            self.setX(x);
            self.setY(y);
        }
        init(x, y);
    }
    
    /**
     * Set the x-coordinate of this point.
     *
     * @param {Number} x - the x-coordinate.
     * @public
     */
    Point.prototype.setX = function(x) {
        this.x = (cardmaker.NumberUtil.isInt(x)) ? x : 0;
    }
    
    /**
     * Returns the x-coordinate of this point in integer precision.
     *
     * @return {Number} the x-coordinate.
     * @public
     */
    Point.prototype.getX = function() {
        return this.x;
    }
    
    /**
     * Set the y-coordinate of this point.
     *
     * @param {Number} y - the y-coordinate.
     * @public
     */
    Point.prototype.setY = function(y) {
        this.y = (cardmaker.NumberUtil.isInt(y)) ? y : 0;
    }
    
    /**
     * Returns the y-coordinate of this point in integer precision.
     *
     * @return {Number} the y-coordinate.
     * @public
     */
    Point.prototype.getY = function() {
        return this.y;
    }
    
    /**
     * Set the location (x,y) of this point to the specified x and y coordinates.
     *
     * @param {Number} x - the x-coordinate.
     * @param {Number} y - the y-coordinate.
     * @public
     */
    Point.prototype.move = function(x, y) {
        this.setX(x);
        this.setY(y);
    }
    
    /**
     * Translate the location (x,y) of this point into the direction designated by the tx and ty coordinates,
     * such that it now represents the following location (x+tx, y+ty).
     *
     * @param {Number} tx - the distance to move the point along the x-coordinate space.
     * @param {Number} ty - the distance to move the point along the y-coordinate space.
     * @public
     */
    Point.prototype.translate = function(tx, ty) {
        var x = this.getX();
        if (cardmaker.NumberUtil.isInt(tx)) {
            this.setX(x + tx); 
        }
        
        var y = this.getY();
        if (cardmaker.NumberUtil.isInt(ty)) {
            this.setY(y + ty);
        }
    }
    
    /**
     * Returns a point object with the specified coordinates added to the coordinates of this point.
     *
     * @param {Number} x - the x-coordinate to add.
     * @param {Number} y - the y-coordinate to add.
     * @retunr {cardmaker.Point} a point object with the added coordinates.
     */
    Point.prototype.add = function(x, y) {
        x = (cardmaker.NumberUtil.isInt(x)) ? x : 0;
        y = (cardmaker.NumberUtil.isInt(y)) ? y : 0;
        
        return new Point((this.getX() + x), (this.getY() + y));
    }
    
    /**
     * Returns a point object with the specified coordinates subtracted from the coordinates of this point.
     *
     * @param {Number} x - the x-coordinate to subtract.
     * @param {Number} y - the y-coordinate to subtract.
     * @retunr {cardmaker.Point} a point object with the subtracted coordinates.
     */
    Point.prototype.subtract = function(x, y) {
        x = (cardmaker.NumberUtil.isInt(x)) ? x : 0;
        y = (cardmaker.NumberUtil.isInt(y)) ? y : 0;
        
        return new Point((this.getX() - x), (this.getY() - y));
    }
    
    /**
     * Creates a new point from the specified {@link cardmaker.Bounds} object.
     *
     * @param {cardmaker.Bounds} bounds - the bounds from which to create a new Point object.
     * @return {cardmaker.Point} a point object.
     * @public
     * @static
     */
    Point.createFromBounds = function(bounds) {
        var point = new Point();
        if (bounds instanceof cardmaker.Bounds) {
            point.setX(bounds.getMinX());
            point.setY(bounds.getMinY());
        }
        
        return point;
    }
    
    // add Point to namespace.
    cardmaker.Point = Point;

})(this, this.document, this.cardmaker = this.cardmaker || {});
