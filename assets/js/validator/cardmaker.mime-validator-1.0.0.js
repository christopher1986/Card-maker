(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The MimeValidator tests whether a file is of a specific MIME type.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function MimeValidator() {
        /**
         * A reference to this object.
         *
         * @typedef {MimeValidator}
         * @private
         */
        var self = this;
        
        /**
         * A collection of valid MIME types.
         *
         * @type {string[]}
         * @public
         */
        this.types = [];
        
        /**
         * Initialize the MimeValidator.
         *
         * @param {string[]} types - (optional) the MIME types.
         */
        function init(types) {
            // call parent constructor.
            cardmaker.Validator.call(self);
            
            self.types = types;
        }
        init(arguments);
    }
    
    // inherit from Validator. 
    MimeValidator.prototype = Object.create(cardmaker.Validator.prototype);
    MimeValidator.prototype.constructor = MimeValidator;
    
    /**
     * Tests whether the specified file is of a specific MIME type.
     *
     * @param {File} file - the file to validate.
     * @return {boolean} true if the specified file is valid, otherwise false.
     * @public
     */
    MimeValidator.prototype.isValid = function(file) {
        var types = this.types;
        if (file instanceof File) {      
            var index, size, type;
            for (index = 0, size = types.length; index < size; index++) {
                type = types[index];
                if (typeof type === 'string' && type === file.type) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // add MimeValidator to namespace.
    cardmaker.MimeValidator = MimeValidator;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
