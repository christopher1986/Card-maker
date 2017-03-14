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
         * The element that represents the user interface for this canvas.
         *
         * @type {HTMLCanvasElement}
         * @private
         */
        self.canvasElement = null;

        /**
         * The file manager responsible for uploading images.
         *
         * @typedef {cardmaker.FileManager}
         * @private
         */
        self.fileManager = null;

        /**
         * The stage to which drawables objects are added.
         *
         * @typedef {cardmaker.Stage}
         * @private
         */
        self.stage = null;

        /**
         * A collection of panels attached to this canvas.
         *
         * @typedef {cardmaker.Panel[]}
         * @private
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

            self.canvasElement = canvas;
            self.fileManager = new cardmaker.FileManager();
            self.fileManager.on('upload-finished', self.onUploadFinished.bind(self));
            self.stage = new cardmaker.Stage(self);

            var listeners = new cardmaker.ListenerAggregate(self);
            listeners.attach(document);
        }
        init(canvas);
    }

    // inherit from cardmaker.MVCObject.
    Canvas.prototype = Object.create(cardmaker.MVCObject.prototype);
    Canvas.prototype.constructor = Canvas;

    /**
     * Register a new listener listener to the underlying HTML canvas element.
     *
     * @param {String} type A string representing the event type to remove.
     * @param {Callback} listener The event listener function that receives notifications.
     * @param {Boolean} useCapture Specifies whether the listener is a capturing listener or not.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
     */
    Canvas.prototype.addEventListener = function(type, listener, useCapture) {
        this.canvasElement.addEventListener(type, listener, useCapture);
    }

    /**
     * Remove the event listener previously registered with the underlying HTML canvas element.
     *
     * @param {String} type A string representing the event type to remove.
     * @param {Callback} listener The event listener function to remove.
     * @param {Boolean} useCapture Specifies whether the listener is a capturing listener or not.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener}
     */
    Canvas.prototype.removeEventListener = function(type, listener, useCapture) {
        this.canvasElement.removeEventListener(type, listener, useCapture);
    }

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
            var drawable = new cardmaker.Image(this);
            self.stage.addChild(new cardmaker.DraggableDrawable(drawable));
            self.stage.draw(self.canvasElement);
        };
    }

    // add Canvas to namespace.
    cardmaker.Canvas = Canvas;

})(this, this.document, this.cardmaker = this.cardmaker || {});
