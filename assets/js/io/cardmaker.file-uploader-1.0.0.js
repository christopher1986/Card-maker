(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The ProgressEvent contains information about the upload progress.
     *
     * @author Chris Harris <c.haris@hotmail.com>
     * @version 1.0.0
     * @since 1.1.0
     */
    function ProgressEvent(type, target, loaded, total) {
        /**
         * A reference to this object.
         *
         * @typedef {ProgressEvent}
         * @private
         */
        var self = this;
        
        /**
         * The target.
         *
         * @type {FileReader}
         * @public
         */
        self.target = null;
        
        /**
         * The bytes loaded.
         *
         * @type {Number}
         * @public
         */
        self.loaded = 0;
        
        /**
         * The total bytes to load.
         *
         * @type {Number}
         * @public
         */
        self.total = 0;
        
        /**
         * The bytes loaded as a percentage value.
         *
         * @type {Number}
         * @public
         */
        self.percentage = 0;
        
        /**
         * Initialize the ProgressEvent.
         *
         * @param {String} type - the event type.
         * @param {FileReader} target - the underlying file reader.
         * @param {Number} loaded - the bytes loaded.
         * @param {Number} total - the total bytes to load.
         * @private
         */
        function init(type, target, loaded, total) {
            // call parent constructor.
            cardmaker.Event.call(self, type);
        
            self.target     = target;
            self.loaded     = (cardmaker.NumberUtil.isNumeric(loaded)) ? loaded : 0;
            self.total      = (cardmaker.NumberUtil.isNumeric(total)) ? total : 0;
            self.percentage = (self.total > 0) ? Math.round((self.loaded / self.total) * 100) : 0;
        }
        init(type, target, loaded, total);
    }
    
    // inherit from cardmaker.Event. 
    ProgressEvent.prototype = Object.create(cardmaker.Event.prototype);
    ProgressEvent.prototype.constructor = ProgressEvent;
    
    /**
     * The FileUploader is responsible for uploading files from the desktop to the browser.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link http://www.html5rocks.com/en/tutorials/file/dndfiles/}
     */
    function FileUploader() {
        /**
         * A reference to this object.
         *
         * @typedef {FileUploader}
         * @private
         */
        var self = this;
        
        /**
         * The validator.
         *
         * @type {cardmaker.Validator|null}
         * @public
         */
        self.validator = null;
        
        // call parent constructor.
        cardmaker.MVCObject.call(self);
    }
    
    // inherit from cardmaker.MVCObject. 
    FileUploader.prototype = Object.create(cardmaker.MVCObject.prototype);
    FileUploader.prototype.constructor = FileUploader;
    
    /**
     * Set the validator that determines whether a file should be uploaded.
     *
     * @param {cardmaker.Validator} validator - the file validator.
     * @public
     */
    FileUploader.prototype.setValidator = function(validator) {
        this.validator = (validator instanceof cardmaker.Validator) ? validator : null;
    }
    
    /**
     * Returns the validator that determines whether a file should be uploaded.
     *
     * @return {cardmaker.Validator|null} the validator or null if no validator is set.
     * @public
     */
    FileUploader.prototype.getValidator = function() {
        return this.validator;
    }
    
    /**
     * Upload a collection of files.
     *
     * @param {FileList} files - a collection of {@link window.File} objects.
     * @throws {TypeError} if the specified argument is not a {@link window.FileList} object.
     */
    FileUploader.prototype.upload = function(files) {
        if (!(files instanceof window.FileList)) {
            throw new TypeError('FileUploader requires a FileList object');
        }
        
        var validator = this.getValidator();
        
        var index, size, file, reader;
        for (index = 0, size = files.length; index < size; index++) {
            file = files[index];
            if (validator && validator.isValid(file)) {
                reader = new FileReader();
                reader.onabort = this.onAbort.bind(this);
                reader.onerror = this.onError.bind(this);
                reader.onload = this.onFinished.bind(this);
                reader.onloadstart = this.onStart.bind(this);
                reader.onprogress = this.onProgress.bind(this);
                reader.readAsDataURL(file);
            }
        }
    }
    
    /**
     * Dispatch an event when the upload starts.
     *
     * @param {ProgressEvent} event - an Event object containing details about the event.
     */
    FileUploader.prototype.onStart = function(event) {
        this.dispatch(new ProgressEvent('upload-start', event.target, event.loaded, event.total));
    }
    
    /**
     * Dispatch an event when the upload is done.
     *
     * @param {ProgressEvent} event - an Event object containing details about the event.
     */
    FileUploader.prototype.onFinished = function(event) {
        this.dispatch(new ProgressEvent('upload-finished', event.target, event.loaded, event.total));
    }
    
    /**
     * Dispatch an event as the upload progresses.
     *
     * @param {ProgressEvent} event - an Event object containing details about the event.
     */
    FileUploader.prototype.onProgress = function(event) {
        this.dispatch(new ProgressEvent('upload-progress', event.target, event.loaded, event.total));
    }
    
    FileUploader.prototype.onError = function(event) {
        
    }
    
    /**
     * Dispatch an event as the upload is aborted.
     *
     * @param {ProgressEvent} - an Event object containing details about the event.
     */
    FileUploader.prototype.onAbort = function(event) {
        this.dispatch(new ProgressEvent('upload-abort', event.loaded, event.total));
    }

    // add FileUploader to namespace.
    cardmaker.FileUploader = FileUploader;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
