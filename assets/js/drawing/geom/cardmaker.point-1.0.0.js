(function(window, document, cardmaker, undefined) {
    "use strict";
    
    if (typeof Number.isInt !== 'function') {
        /**
         * Tests whether the specified argument is an integer value.
         *
         * @param {*} value the argument whose type will be tested.
         * @return {Boolean} true if the argument is an integer value, otherwise false.
         * @public
         * @static
         */
        Number.isInt = function(value) {
            return (Number.isNumeric(value) && value % 1 === 0);
        }
    }
    
    if (typeof Number.isNumeric !== 'function') {
        /**
         * Tests whether the specified argument is a numeric value.
         *
         * @param {*} value the argument whose type will be tested.
         * @return {boolean} true if the argument is a numeric value, otherwise false.
         * @public
         * @static
         */
        Number.isNumeric = function(value) {
            return (!isNaN(parseFloat(value)) && isFinite(value));
        }
    }
    
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
         * @param {String|Number} x (optional) the x-coordinate of this point.
         * @param {String|Number} y (optional) the y-coordinate of this point.
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
     * @param {Number} x the x-coordinate.
     * @public
     */
    Point.prototype.setX = function(x) {
        this.x = (Number.isInt(x)) ? x : 0;
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
     * @param {Number} y the y-coordinate.
     * @public
     */
    Point.prototype.setY = function(y) {
        this.y = (Number.isInt(y)) ? x : 0;
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
     * @param {Number} x the x-coordinate.
     * @param {Number} y the y-coordinate.
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
     * @param {Number} tx the distance to move the point along the x-coordinate space.
     * @param {Number} ty the distance to move the point along the y-coordinate space.
     * @public
     */
    Point.prototype.translate = function(tx, ty) {
        var x = this.getX();
        if (Number.isInt(tx)) {
            this.setX(x + tx); 
        }
        
        var y = this.getY();
        if (Number.isInt(ty)) {
            this.setY(y + ty);
        }
    }
    
    /**
     * Merge the location (x,y) of specified point with this one.
     *
     * @param {cardmaker.Point} the point whose location to merge.
     * @return {cardmaker.Point} a new point object containing the result of the merger.
     * @throws {TypeError} if the specified argument is not a {cardmaker.point} object.
     * @public
     */
    Point.prototype.merge = function(point) {
        if (point instanceof cardmaker.Point) {
            throw new TypeError('Point: in order to merge a cardmaker.Point object is expected');
        }
    
        var x = this.getX() + point.getX();
        var y = this.getY() + point.getY();
        
        return new Point(x, y);
    }
    
    // add Point to namespace.
    cardmaker.Point = Point;

})(this, this.document, this.cardmaker = this.cardmaker || {});
