(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The ListenerAggregate will attach or detach one or more listeners to a specific {@link EventTarget} object.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function ListenerAggregate(canvas)
    {
        /**
         * A reference to this object.
         *
         * @typedef {EventDispatcher}
         * @private
         */
        var self = this;
        
        /**
         * The canvas associated with this aggregrate.
         *
         * @typedef {cardmaker.Canvas}
         * @public
         */
        self.canvas = null;
        
        /**
         * Initialize the ListenerAggregate.
         *
         * @param {cardmaker.Canvas} the canvas associated with this aggregrate.
         * @throws {TypeError} if the specified argument is not a canvas.
         * @private
         */
        function init(canvas) {
            if (!(canvas instanceof cardmaker.Canvas)) {
                throw new TypeError('ListenerAggregate expects a cardmaker.Canvas.');
            }
            
            self.canvas = canvas;
        }
        init(canvas);
    }
    
    /**
     * Attach listeners contained by this aggregrate to the specified target.
     *
     * @param {EventTarget} target the target to which the listeners will be attached.
     * @public
     */
    ListenerAggregate.prototype.attach = function(target) {
        if (target instanceof EventTarget) {
            target.addEventListener('keydown', this.layerSelect.bind(this));
        }
    }
    
    /**
     * Detach listeners contained by this aggregrate from the specified target.
     *
     * @param {EventTarget} target the target from which to detach all listeners.
     * @public
     */
    ListenerAggregate.prototype.detach = function(target) {
        if (target instanceof EventTarget) {
            target.removeEventListener('keydown', this.layerSelect.bind(this));
        }
    }

    /**
     * Handle the selection of layers using the Ctrl-click command.
     *
     * @param {KeyboardEvent} event object containing details about this event.
     */
    ListenerAggregate.prototype.layerSelect = function(event) {
        var keyName = event.key;
        if (keyName.toLowerCase() === 'control') {

        }
    }
    
    // add ListenerAggregate to namespace.
    cardmaker.ListenerAggregate = ListenerAggregate;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
