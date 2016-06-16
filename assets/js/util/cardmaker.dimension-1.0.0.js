(function(window, document, cardmaker, undefined) {
    "use strict";
    
    if (typeof Array.isArray !== 'function') {
        /**
         * Tests whether the specified argument is an array.
         *
         * @param {*} obj the argument whose type will be tested.
         * @return {boolean} true if the argument is an array, otherwise false.
         * @public
         * @static
         */
        Array.isArray = function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
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
     * The Dimension2D class encapsulate the width and height of a dimension in space.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Dimension2D(width, height) {
        /**
         * A reference to this object.
         *
         * @typedef {Dimension2D}
         * @private
         */
        var self = this;
        
        /**
         * The width in pixels.
         *
         * @type {Number}
         * @public
         */
        self.width = 0;
        
        /**
         * The height in pixels.
         *
         * @type {Number}
         * @public
         */
        self.height = 0;
        
        /**
         * Initialize the Dimension2D.
         *
         * @param {String|Number} width (optional) the width.
         * @param {String|Number} height (optional) the height.
         * @private
         */
        function init(width, height) {
            self.setWidth(width);
            self.setHeight(height);
        }
        init(width, height);
    }
    
    /**
     * Set the width which may be followed by a unit of measurement (e.g. 90mm).
     *
     * @param {String|Number} width the width.
     * @public
     */
    Dimension2D.prototype.setWidth = function(width) {
        this.width = (typeof width === 'string') ? this.convert(width) : width;
    }
    
    /**
     * Returns the width in pixels.
     *
     * @return {Number} the width.
     * @public
     */
    Dimension2D.prototype.getWidth = function() {
        return (Number.isNumeric(this.width)) ? this.width : 0;
    }
    
    /**
     * Set the height which may be followed by a unit of measurement (e.g. 130mm).
     *
     * @param {String|Number} height the height.
     * @public
     */
    Dimension2D.prototype.setHeight = function(height) {
        this.height = (typeof height === 'string') ? this.convert(height) : height;
    }
    
    /**
     * Returns the height in pixels.
     *
     * @return {Number} the height.
     * @public
     */
    Dimension2D.prototype.getHeight = function() {
        return (Number.isNumeric(this.height)) ? this.height : 0;
    }
    
    /**
     * Converts the specified string which represents a size of a particular measurement unit into pixels. 
     * The units millimeters (mm), centimers (cm), pica (pc), point (pt) and inches (in) are supported.
     *
     * @param {String} size the size followed by a unit of measurement.
     * @return {Number} the size in pixels.
     * @public
     */
    Dimension2D.prototype.convert = function(size) {
        var matches = size.match(/(\d+)(\w*)/);
        if (Array.isArray(matches)) {
            switch (matches[2]) {
                case 'mm':
                    return cardmaker.Converter.mmToPixel(matches[1]);
                case 'cm':
                    return cardmaker.Converter.cmToPixel(matches[1]);
                case 'pc':
                    return cardmaker.Converter.picaToPixel(matches[1]);
                case 'pt':
                    return cardmaker.Converter.pointToPixel(matches[1]);
                case 'in':
                    return cardmaker.Converter.inchToPixel(matches[1]);                
                default:
                    return matches[1];
            }
        }
        
        return 0;
    }
    
    // add Dimension2D to namespace.
    cardmaker.Dimension2D = Dimension2D;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
