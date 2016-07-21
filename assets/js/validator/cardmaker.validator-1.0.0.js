(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Validator tests whether a value meets one or more requirements.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Validator() {}
    
    /**
     * Tests whether the specified value meets all requirements imposed by this validator.
     * This method should be overridden by concrete validators.
     *
     * @param {*} value - the value to validate.
     * @return {boolean} true if the specified value is valid, otherwise false.
     * @abstract
     * @public
     */
    Validator.prototype.isValid = function(value) {
        throw new Error('This method must be implemented by a subclass.');
    }
    
    // add Validator to namespace.
    cardmaker.Validator = Validator;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
