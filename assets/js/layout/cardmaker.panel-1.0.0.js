(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Panel is responsible for grouping controls and other objects.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    var Panel = function(element) {
        /**
         * A reference to this object.
         *
         * @typedef {Panel}
         * @private
         */
        var self = this;
        
        /**
         * The element that represents the user interface for this panel.
         *
         * @type {HTMLElement}
         * @public
         */
        self.element = null;
        
        /**
         * The canvas to which this panel is attached.
         *
         * @type {cardmaker.Canvas}
         * @public
         */
        self.canvas = null;
        
        /**
         * Initialize a new Panel.
         *
         * @param {HTMLElement} element - the HTML element.
         * @throws {TypeError} if the specified argument is not an HTMLElement.
         * @private
         */
        function init(element) {
            if (!(element instanceof window.HTMLElement)) {
                throw new TypeError('Panel expects an HTMLElement.');
            }
            
            // call parent constructor.
            cardmaker.MVCObject.call(self);
            
            self.element = element;
        }
        init(element);
    }
    
    // inherit from cardmaker.MVCObject.
    Panel.prototype = Object.create(cardmaker.MVCObject.prototype);
    Panel.prototype.constructor = Panel;
    
    /**
     * Set the canvas to which this panel will be attached.
     *
     * @param {cardmaker.Canvas} canvas - the canvas to which this panel will be attached.
     * @throws {TypeError} if the specified argument is not a canvas.
     */
    Panel.prototype.setCanvas = function(canvas) {
        if (!(canvas instanceof cardmaker.Canvas)) {
            throw new TypeError('Panel expects a cardmaker.Canvas object.');
        }
        
        var oldCanvas = this.getCanvas();
        if (oldCanvas instanceof cardmaker.Canvas) {
            oldCanvas.removePanel(this);
        }
        
        this.canvas = canvas;
    }
    
    /**
     * Returns the canvas to which this panel is attached.
     *
     * @return {cardmaker.Canvas|null} the canvas to which the panel is attached, or null if the panel is not attached to a canvas.
     */
    Panel.prototype.getCanvas = function() {
        return this.canvas;
    }
    
    // add Panel to namespace.
    cardmaker.Panel = Panel;

})(this, this.document, this.cardmaker = this.cardmaker || {});
