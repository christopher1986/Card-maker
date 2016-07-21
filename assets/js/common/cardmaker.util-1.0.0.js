(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The ArrayUtil class provides static methods for collection types such as arrays.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function ArrayUtil() {}
    
    /**
     * Swap the elements at the specified positions in the specified array.
     *
     * @param {Array} src - the array containing the elements to swap.
     * @param {Number} i - the index of the first element to swap.
     * @param {Number} j - the index of the second element to swap with.
     * @public
     * @static
     */
    ArrayUtil.swap = function(src, i, j) {
        var tmp = src[i];
        src[i] = src[j];
        src[j] = tmp;
    }
    
    /**
     * Tests whether the specified argument is an array.
     *
     * @param {*} obj - the argument whose type will be tested.
     * @return {Boolean} true if the argument is an array, otherwise false.
     * @public
     * @static
     */
    ArrayUtil.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    
    /**
     * Returns a shallow copy of the specified array.
     *
     * @param {Array} src - the source to copy.
     * @param {Number} begin - (optional) zero-based index from which to start the copy.
     * @param {Number} end - (optional) zero-based index at which to end the copy.
     * @return {Array} a shallow copy of the source.
     * @public
     * @static
     */
    ArrayUtil.copy = function(src, begin, end) {
        return Array.prototype.slice.call(src, begin, end);
    }
    
    /**
     * The NumberUtil class provides static methods for numeric values and Number objects.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function NumberUtil() {}
    
    /**
     * Tests whether the specified argument is a numeric value.
     *
     * @param {*} value - the argument whose type will be tested.
     * @return {Boolean} true if the argument is a numeric value, otherwise false.
     * @public
     * @static
     */
    NumberUtil.isNumeric = function(value) {
        return (!isNaN(parseFloat(value)) && isFinite(value));
    }
    
    /**
     * Tests whether the specified argument is an integer value.
     *
     * @param {*} value - the argument whose type will be tested.
     * @return {Boolean} true if the argument is an integer value, otherwise false.
     * @public
     * @static
     */
    NumberUtil.isInt = function(value) {
        return (NumberUtil.isNumeric(value) && value % 1 === 0);
    }

    /**
     * The ObjectUtil class provides static methods for (plain) objects.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function ObjectUtil() {}
    
    /**
     * Tests whether the specified argument is a plain object.
     *
     * @param {*} obj - the argument whose type will be tested.
     * @return {Boolean} true if the argument is a plain object, otherwise false.
     * @public
     * @static
     */
    ObjectUtil.isPlainObject = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    
    /**
     * Merge the contents of two or more objects into the first object.
     *
     * @param {Boolean} deep - (optional) the first boolean argument determines whether the objects should be deep copied.
     * @param {...Object} target - two or more objects that will be merged into the first object.
     * @return {Object|null} the resulting object after the merging has taken place, or null on failure.
     * @public
     * @static
     */
    ObjectUtil.merge = function(target) {
        var args = ArrayUtil.copy(arguments);
        var deep = (args.length && typeof args[0] === 'boolean') ? args.shift() : false;
        
        var objects = args.filter(ObjectUtil.isPlainObject);
        var merger  = {};
        
        var obj, prop, index, size;
        for (index = 0, size = objects.length; index < size; index++) {
            obj = objects[index];
            for (prop in obj) {
                // deep copy objects recursively.
                if (deep && ObjectUtil.isPlainObject(obj[prop]) && merger.hasOwnProperty(prop) && ObjectUtil.isPlainObject(merger)) {
                    merger[prop] = ObjectUtil.merge(deep, merger[prop], obj[prop]);
                } else {
                    merger[prop] = obj[prop];
                }
            }
        }
        
        return merger; 
    }
    
    /**
     * The StringUtil class provides static methods for String objects.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function StringUtil() {}
    
    /**
     * Returns a formatted string according to the given arguments.
     *
     * @param {String} str - the string to format.
     * @param {...String} a variable number of arguments to use in the format.
     * @return string the formatted string.
     * @throws TypeError if the first argument is not a string.
     * @public
     * @static
     */
    StringUtil.format = function(str) {
        if (typeof str !== 'string') {
            throw new TypeError('StringUtil expects first argument to be a string.');
        }

        var args = ArrayUtil.copy(arguments, 1);
        return str.replace(/{(\d+)}/g, function(match, number) {
            return (typeof args[number] !== 'undefined') ? args[number] : match;
        });
    }
    
    // add ArrayUtil to namespace.
    cardmaker.ArrayUtil = ArrayUtil;
    // add NumberUtil to namespace.
    cardmaker.NumberUtil = NumberUtil;    
    // add ObjectUtil to namespace.
    cardmaker.ObjectUtil = ObjectUtil;
    // add StringUtil to namespace.
    cardmaker.StringUtil = StringUtil;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
