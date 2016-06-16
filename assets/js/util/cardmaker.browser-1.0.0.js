(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * This class is used to detect whether the browser supports specific features.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Browser() {}
    
    /**
     * A mapping between features and browser support.
     *
     * @type {object}
     * @public
     * @static
     */
    Browser.supports = {};
    
    /**
     * Tests whether the FileReader from the File API is available.
     *
     * @return {boolean} true if the FileReader is supported, otherwise false.
     * @public
     * @static
     */
    Browser.filereader = function() {
        if (!Browser.supports.hasOwnProperty('filereader')) {
            Browser.supports.filereader = (typeof window.FileReader !== 'undefined');
        }
        
        return Browser.supports.filereader;
    }
    
    /**
     * Tests whether File from the File API is available.
     *
     * @return {boolean} true if File is supported, otherwise false.
     * @public
     * @static
     */
    Browser.file = function() {
        if (!Browser.supports.hasOwnProperty('file')) {
            Browser.supports.file = (typeof window.File !== 'undefined');
        }
        
        return Browser.supports.file;
    }
    
    /**
     * Tests whether the FileList from the File API is available.
     *
     * @return {boolean} true if the FileList is supported, otherwise false.
     * @public
     * @static
     */
    Browser.filelist = function() {
        if (!Browser.supports.hasOwnProperty('filelist')) {
            Browser.supports.filelist = (typeof window.FileList !== 'undefined');
        }
        
        return Browser.supports.filelist;
    }
    
    /**
     * Tests whether Blob from the File API is available.
     *
     * @return {boolean} true if Blob is supported, otherwise false.
     * @public
     * @static
     */
    Browser.blob = function() {
        if (!Browser.supports.hasOwnProperty('blob')) {
            Browser.supports.blob = (typeof window.Blob !== 'undefined');
        }
        
        return Browser.supports.blob;
    }

    // add Browser to namespace.
    cardmaker.Browser = Browser;

})(this, this.document, this.cardmaker = this.cardmaker || {});
