(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The FileManager allows a client to upload one or more files.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link http://www.html5rocks.com/en/tutorials/file/dndfiles/}
     */
    function FileManager() {
        /**
         * A reference to this object.
         *
         * @typedef {FileManager}
         * @private
         */
        var self = this;
        
        /**
         * The file uploader.
         *
         * @typedef {cardmaker.FileUploader}
         * @public
         */
        self.uploader = null;
        
        /**
         * Initialize the FileManager.
         *
         * @param {HTMLElement[]} elements the HTML elements with which to upload files.
         * @private
         */
        function init(elements) {
            // call parent constructor.
            cardmaker.MVCObject.call(self);
            
            var validator = new cardmaker.MimeValidator('image/jpeg', 'image/png', 'image/gif');
            
            self.uploader = new cardmaker.FileUploader();
            self.uploader.setValidator(validator);
            self.uploader.on('upload-start', self.redispatchEvent.bind(self));
            self.uploader.on('upload-abort', self.redispatchEvent.bind(self));
            self.uploader.on('upload-error', self.redispatchEvent.bind(self));
            self.uploader.on('upload-finished', self.redispatchEvent.bind(self));
            self.uploader.on('upload-progress', self.redispatchEvent.bind(self));
        
            var index, size;
            for (index = 0, size = elements.length; index < size; index++) {
                self.addElement(elements[index]);
            }
        }

        // call constructor.
        init(arguments);
    }
    
    // inherit from cardmaker.MVCObject. 
    FileManager.prototype = Object.create(cardmaker.MVCObject.prototype);
    FileManager.prototype.constructor = FileManager;
    
    /**
     * Tests whether the browser support the File API.
     *
     * @return {boolean} true if the File API is supported, otherwise false.
     */
    FileManager.prototype.isBrowserCompatible = function() {
        var browser = cardmaker.Browser;
        return (browser.file() && browser.filereader()
                    && browser.filelist() && browser.blob());
    }
    
    /**
     * Add the specified {@link HTMLElement} as a file handler.
     *
     * @param {HTMLElement} element - the element to use as file hander.
     * @return {boolean} true if the element was registered as a file handler, otherwise false.
     * @public
     */
    FileManager.prototype.addElement = function(element) {
        // select files with an input field.
        if (element instanceof HTMLInputElement && element.type === 'file') {
            element.addEventListener('change', this.handleFileSelect.bind(this), false);
            return true;
        }

        var allowed = (element instanceof HTMLElement);
        if (allowed) {
            element.addEventListener('dragover', this.handleDragOver.bind(this), false);
            element.addEventListener('drop', this.handleFileDrop.bind(this), false);
        }
        
        return allowed;
    }
    
    /**
     * Remove the specified {@link HTMLElement} as a file handler.
     *
     * @param {EventTarget} element - the element to remove as file handler.
     * @public
     */
    FileManager.prototype.removeElement = function(element) {
        if (element instanceof EventTarget) {
            element.removeEventListener('change', this.handleFileSelect, false);
            element.removeEventListener('dragover', this.handleDragOver, false);
            element.removeEventListener('drop', this.handleFileDrop, false);
        }
    }
    
    /**
     * Upload files that are selected using an input field.
     *
     * @param {Event} event - an Event object containing details about this event.
     */
    FileManager.prototype.handleFileSelect = function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        var files = event.target.files;
        if (files.length) {
            this.uploader.upload(files);
        }
    }
    
    /**
     * Upload files that are dropped onto a droppable area.
     *
     * @param {Event} event - an Event object containing details about this event.
     */
    FileManager.prototype.handleFileDrop = function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        var files = event.dataTransfer.files;
        if (files.length) {
            this.uploader.upload(files);
        }
    }
    
    /**
     * Prevents this action from being delegated.
     *
     * @param {Event} event - an Event object containing details about this event.
     */
    FileManager.prototype.handleDragOver = function(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }
    
    /**
     * Redispatch events from the {@link cardmaker.FileUploader} object.
     *
     * @param {cardmaker.Event} event - the event that will be dispatched.
     */
    FileManager.prototype.redispatchEvent = function(event) {
        this.dispatch(event);
    }

    // add FileManager to namespace.
    cardmaker.FileManager = FileManager;

})(this, this.document, this.cardmaker = this.cardmaker || {});
