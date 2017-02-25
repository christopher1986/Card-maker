(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The Canvas represents a drawable area on which images, shapes and other objects are added.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Canvas(canvas) {
        /**
         * A reference to this object.
         *
         * @typedef {Canvas}
         * @private
         */
        var self = this;

        /**
         * An aggregate of listeners.
         *
         * @typedef {cardmaker.ListenerAggregate}
         * @private
         */
        var listeners = null;

        /**
         * The element that represents the user interface for this canvas.
         *
         * @type {HTMLCanvasElement}
         * @public
         */
        self.canvas = null;

        /**
         * The file manager responsible for uploading images.
         *
         * @typedef {cardmaker.FileManager}
         * @public
         */
        self.fileManager = null;

        /**
         * The layout renderer draws objects onto the canvas.
         *
         * @typedef {cardmaker.LayoutRenderer}
         * @public
         */
        self.layoutRenderer = null;

        /**
         * A collection of drawable objects for this canvas.
         *
         * @typedef {cardmaker.Drawable[]}
         * @public
         */
        self.drawables = [];

        /**
         * A collection of panels attached to this canvas.
         *
         * @typedef {cardmaker.Panel[]}
         * @public
         */
        self.panels = [];

        /**
         * Initialize a new Canvas.
         *
         * @param {HTMLCanvasElement} canvas - the canvas element.
         * @throws {TypeError} if the specified argument is not an HTMLCanvasElement.
         * @private
         */
        function init(canvas) {
            if (!(canvas instanceof window.HTMLCanvasElement)) {
                throw new TypeError('Canvas expects an HTMLCanvasElement.');
            }

            // call parent constructor.
            cardmaker.MVCObject.call(self);

            self.canvas = canvas;
            self.fileManager = new cardmaker.FileManager();
            self.fileManager.on('upload-finished', self.onUploadFinished.bind(self));
            self.layoutRenderer = new cardmaker.LayoutRenderer(self);

            listeners = new cardmaker.ListenerAggregate(self);
            listeners.attach(document);
        }
        init(canvas);
    }

    // inherit from cardmaker.MVCObject.
    Canvas.prototype = Object.create(cardmaker.MVCObject.prototype);
    Canvas.prototype.constructor = Canvas;

    /**
     * Add the specified panel to this canvas.
     *
     * @param {cardmaker.Panel} panel - the panel to add.
     * @returns {Boolean} true if the panel was added, otherwise false.
     * @throws {TypeError} if the specified argument is not a panel.
     */
    Canvas.prototype.addPanel = function(panel) {
        if (!(panel instanceof cardmaker.Panel)) {
            throw new TypeError('Canvas expects a cardmaker.Panel object.');
        }

        var oldSize = this.panels.length;
        var newSize = this.panels.push(panel);

        if (newSize > oldSize) {
            panel.setCanvas(this);
        }

        return (newSize > oldSize);
    }

    /**
     * Removes the first occurrence of the specified panel from this canvas.
     *
     * @param {cardmaker.Panel} panel - the panel to remove.
     * @returns {Boolean} true if the panel was removed, otherwise false.
     * @throws {TypeError} if the specified argument is not a panel.
     */
    Canvas.prototype.removePanel = function(panel) {
        if (!(panel instanceof cardmaker.Panel)) {
            throw new TypeError('Canvas expects a cardmaker.Panel object.');
        }

        var index, size, exists;
        for (index = 0, size = this.panels.length; index < size; index++) {
            exists = (this.panels[index] === panel);
            if (exists) {
                array.splice(index, 1);
                break;
            }
        }

        return exists;
    }

    /**
     * Add the specified drawable to this canvas.
     *
     * @param {cardmaker.Drawable} drawable - the drawable object to add.
     * @returns {Boolean} true if the drawable object was added, otherwise false.
     * @throws {TypeError} if the specified argument is not a drawable object.
     */
    Canvas.prototype.addDrawable = function(drawable) {
        if (!(drawable instanceof cardmaker.Drawable)) {
            throw new TypeError('Canvas expects a cardmaker.Drawable object.');
        }

        var oldSize = this.drawables.length;
        var newSize = this.drawables.push(drawable);

        if (newSize > oldSize) {
            var self = this;
            drawable.on('invalidate', function(event) {
                self.layoutRenderer.relayout();
                this.draw(self.canvas);
            });
            self.layoutRenderer.relayout();
            drawable.draw(this.canvas);
        }

        return (newSize > oldSize);
    }

    /**
     * Removes the first occurrence of the specified drawable from this canvas.
     *
     * @param {cardmaker.Drawable} drawable - the drawable object to remove.
     * @returns {Boolean} true if the drawable object was removed, otherwise false.
     * @throws {TypeError} if the specified argument is not a drawable object.
     */
    Canvas.prototype.removeDrawable = function(drawable) {
        if (!(drawable instanceof cardmaker.Drawable)) {
            throw new TypeError('Canvas expects a cardmaker.Drawable object.');
        }

        var index, size, exists;
        for (index = 0, size = this.drawables.length; index < size; index++) {
            exists = (this.drawables[index] === drawable);
            if (exists) {
                array.splice(index, 1);
                break;
            }
        }

        return exists;
    }

    /**
     * Add the specified {@link HTMLElement} as a file handler.
     *
     * @param {HTMLElement} element - the element to use as file hander.
     * @returns {Boolean} true if the element was added as file handler, otherwise false.
     * @see {@link cardmaker.FileManager#addFileManager}
     * @public
     */
    Canvas.prototype.addFileManager = function(element) {
        return this.fileManager.addElement(element);
    }

    /**
     * Remove the specified {@link HTMLElement} as a file handler.
     *
     * @param {EventTarget} element - the element to remove as file handler.
     * @see {@link cardmaker.FileManager#removeFileManager}
     * @public
     */
    Canvas.prototype.removeFileManager = function(element) {
        this.fileManager.removeElement(element);
    }

    /**
     * Remove the specified {@link HTMLElement} as a file handler.
     *
     * @param {EventTarget} element - the element to remove as file handler.
     * @see {@link cardmaker.FileManager#removeFileManager}
     * @public
     */
    Canvas.prototype.removeFileManager = function(element) {
        this.fileManager.removeElement(element);
    }

    /**
     * Add the uploaded image as a drawable object to the canvas.
     *
     * @param {ProgressEvent} event - an Event object containing details about this event.
     * @public
     */
    Canvas.prototype.onUploadFinished = function(event) {
        var self = this;
        var image = new window.Image();
        image.src = event.target.result;
        image.onload = function(event) {
            self.addDrawable(new cardmaker.Image(this));
        };
    }

    /**
     * Returns a {@link cardmaker.Bounds} object containing the canvas boundaries.
     *
     * @return {@cardmaker.Bounds} the canvas boundaries.
     */
    Canvas.prototype.getBounds = function() {
        return new cardmaker.Bounds(0, 0, this.canvas.width, this.canvas.height);
    }

    // add Canvas to namespace.
    cardmaker.Canvas = Canvas;

})(this, this.document, this.cardmaker = this.cardmaker || {});
