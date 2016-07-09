(function(window, document, cardmaker, undefined) {
    "use strict";
    
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
     * This class contains methods for manipulating sizes of various measurements.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Converter() {}
    
    /**
     * Convert the specified angle in degrees into radians.
     *
     * @param {Number} degrees the degrees to convert.
     * @return {Number} the radians for the specified angle in degrees.
     * @throws {TypeError} if the specified argument is not a numeric value.
     * @see {@link http://www.rapidtables.com/convert/number/degrees-to-radians.htm}
     */
    Converter.degreesToRadians = function (degrees) {
        if (Number.isNumeric(radians)) {
            throw new TypeError('Converter: the specified degrees must be a numeric value.')
        }
        
        return ((Math.PI/180) * degrees);
    }
    
    /**
     * Convert the specified angle in radians into degrees.
     *
     * @param {Number} radians the radians to convert.
     * @return {Number} the degrees for the specified angle in radians
     * @throws {TypeError} if the specified argument is not a numeric value.
     * @see {@link http://www.rapidtables.com/convert/number/radians-to-degrees.htm}
     */
    Converter.radiansToDegrees = function (radians) {
        if (Number.isNumeric(radians)) {
            throw new TypeError('Converter: the specified radians must be a numeric value.')
        }
        
        return ((180/Math.PI) * radians);
    }
    
    /**
     * Convert the specified millimeters into pixels.
     *
     * @param {Number} size the size in millimeters.
     * @param {Number} (optional) the dots per inch, defaults to 300.
     * @return {Number} the pixels for the specified size and dpi.
     * @public
     */
    Converter.mmToPixel = function(size, dpi) {
        var inches = size / 25.4;
        return (Number.isNumeric(size)) ? Converter.inchToPixel(inches, dpi) : 0;
    }
    
    /**
     * Convert the specified centimers into pixels.
     *
     * @param {Number} size the size in centimers.
     * @param {Number} (optional) the dots per inch, defaults to 300.
     * @return {Number} the pixels for the specified size and dpi.
     * @public
     */
    Converter.cmToPixel = function(size, dpi) {
        var inches = size / 2.54;
        return (Number.isNumeric(size)) ? Converter.inchToPixel(inches, dpi) : 0;
    }
    
    /**
     * Convert the specified (PostScript) points into pixels.
     *
     * @param {Number} size the size in points.
     * @param {Number} (optional) the dots per inch, defaults to 300.
     * @return {Number} the pixels for the specified size and dpi.
     * @public
     */
    Converter.pointToPixel = function(size, dpi) {
        var inches = size / 72;
        return (Number.isNumeric(size)) ? Converter.inchToPixel(inches, dpi) : 0;
    }
    
    /**
     * Convert the specified pica into pixels.
     *
     * @param {Number} size the size in pica.
     * @param {Number} (optional) the dots per inch, defaults to 300.
     * @return {Number} the pixels for the specified size and dpi.
     * @public
     */
    Converter.picaToPixel = function(size, dpi) {
        var inches = size / 6;
        return (Number.isNumeric(size)) ? Converter.inchToPixel(inches, dpi) : 0;
    }
    
    /**
     * Convert the specified inches into pixels.
     *
     * @param {Number} size the size in inches.
     * @param {Number} (optional) the dots per inch, defaults to 300.
     * @return {Number} the pixels for the specified size and dpi.
     * @public
     */
    Converter.inchToPixel = function(size, dpi) {
        dpi = (Number.isNumeric(dpi) && dpi > 0) ? dpi : 300;
        return (Number.isNumeric(size)) ? Math.round(size * dpi) : 0;
    }
    
    // add Converter to namespace.
    cardmaker.Converter = Converter;

})(this, this.document, this.cardmaker = this.cardmaker || {});
