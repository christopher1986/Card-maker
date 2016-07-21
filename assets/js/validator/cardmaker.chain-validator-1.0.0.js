(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The ChainValidator is a composite that will test a value against one or more validators.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function ChainValidator(validators) {
        /**
         * A reference to this object.
         *
         * @typedef {ChainValidator}
         * @private
         */
        var self = this;
        
        /**
         * A mapping between names and validators.
         *
         * @typedef {object}
         * @public
         */
        self.validators = {};
        
        /**
         * Initialize the ChainValidator.
         *
         * @param {object} validators - (optional) the initial validators to add.
         */
        function init(validators) {
            // call parent constructor.
            cardmaker.Validator.call(self);
            
            self.putValidators(validators);
        }
        init(validators);
    }
    
    // inherit from Validator. 
    ChainValidator.prototype = Object.create(cardmaker.Validator.prototype);
    ChainValidator.prototype.constructor = ChainValidator;
    
    /**
     * Tests whether the specified value meets all requirements imposed by this validator.
     *
     * @param {*} value - the value to validate.
     * @return {boolean} true if the specified value is valid, otherwise false.
     * @public
     */
    ChainValidator.prototype.isValid = function(value) {
        var name, validator;
        for (name in this.validators) {
            validator = this.validators[name];
            if (this.isValidator(validator) && !validator.isValid(value)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Associate the specified name with the specified validator into this chain of validators.
     *
     * @param {string} name-  the name with which the validator will be associated.
     * @param {cardmaker.Validator} validator - the validator to associate with the specified name.
     * @return {cardmaker.Validator|null} the validator previously associated with the specified name, or null.
     * @public
     */
    ChainValidator.prototype.putValidator = function(name, validator) {
        var previous = null;
        if (typeof name === 'string' && this.isValidator(validator)) {
            previous = (this.validators.hasOwnProperty(name)) ? this.validators[name] : null;
            this.validators[name] = validator;
        }
        
        return previous;
    }
    
    /**
     * Put a collection of key-value pairs into this chain of validator.
     *
     * @param {object} validators - the collection containing names and validators to add.
     * @return {object} a collection of key-value pairs containing the previous validators, or empty object.
     * @public
     */
    ChainValidator.prototype.putValidators = function(validators) {
        var oldValidators = {};
        if (cardmaker.ObjectUtil.isPlainObject(validators)) {
            var name, previous;
            for (name in validators) {
                previous = this.putValidator(name, validators[name]);
                if (previous) {
                    oldValidators[name] = previous;
                }
            }
        }
        
        return oldValidators;
    }
    
    /**
     * Returns if present the validator associated with the specified name.
     *
     * @param {string} name - the name whose associated validator to return.
     * @return {cardmaker.Validator|null} the validator found for the specified name, or null on failure.
     * @public
     */
    ChainValidator.prototype.getValidator = function(name) {
        return (this.hasValidator(name)) ? this.validators[name] : null;
    }
    
    /**
     * Removes from this chain of validators the validator associated with the specified name.
     *
     * @param {string} name - the name whose associated validator to remove.
     * @return {cardmaker.Validator|null} the validator that was removed, or null if no validator was found.
     * @public
     */
    ChainValidator.prototype.removeValidator = function(name) {
        var previous = null;
        if (this.hasValidator(name)) {
            previous = this.validators[name];
            delete this.validators[name];
        }
        
        return previous;
    }
    
    /**
     * Tests whether a validator exists for the specified name.
     *
     * @param {string} name - the name whose presence will be tested.
     * @return {boolean} true if a validator was found for the specified name, otherwise false.
     * @public
     */
    ChainValidator.prototype.hasValidator = function(name) {
        return (typeof name === 'string' && this.validators.hasOwnProperty(name));
    }
    
    /**
     * Clear all validators. This chain of validators will be empty after this call returns.
     *
     * @public
     */
    ChainValidator.prototype.clearValidators = function() {
        this.validators = {};
    }
    
    /**
     * Tests whether the specified argument is a Validator object.
     *
     * @param {*} validator - the argument to test.
     * @return {boolean} true if the specified argument is validator, otherwise false.
     * @public
     */
    ChainValidator.prototype.isValidator = function(validator) {
        return (validator instanceof cardmaker.Validator);
    }
    
    // add ChainValidator to namespace.
    cardmaker.ChainValidator = ChainValidator;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
