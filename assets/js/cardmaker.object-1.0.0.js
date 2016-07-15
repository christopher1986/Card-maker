(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * A generic object which specific objects can inherit from.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function MVCObject()
    {
        /**
         * A reference to this object.
         *
         * @typedef {MVCObject}
         * @private
         */
        var self = this;
        
        /**
         * The EventDispatcher.
         *
         * @typedef {EventDispatcher}
         * @public
         */
        self.dispatcher = new cardmaker.EventDispatcher();
    }
    
    /**
     * Dispatch event for the specified callee.
     *
     * @param {Event|string} event an Event object or string containing the event type.
     * @param {...*} additional paramaters to pass along to the event handler.
     */
    MVCObject.prototype.dispatch = function(event) {
        var args = cardmaker.ArrayUtil.copy(arguments);
            args.unshift(this);

        this.dispatcher.dispatch.apply(this.dispatcher, args);
    }
    
    /**
     * Attach an event handler for the specified event.
     *
     * @param {String} event the event type.
     * @param {Callback} handler the callback to execute.
     * @param {Number} priority (optional) the priority associated with the handler.
     * @param {Boolean} once (optional) only execute the handler once, defaults to false.
     * @return {MVCObject} provides a fluent interface which allows multiple handlers to be attached.
     * @public
     */
    MVCObject.prototype.on = function(event, handler, priority, once) {
        this.dispatcher.on(event, handler, priority, once);
        return this;
    }
    
    /**
     * Attach an event handler for the specified event. The handler is executed at most once.
     *
     * @param {String} event the event type.
     * @param {Callback} handler the callback to execute.
     * @param {Number} priority (optional) the priority associated with the handler.
     * @return {MVCObject} provides a fluent interface which allows multiple handlers to be attached.
     * @public
     */
    MVCObject.prototype.one = function(event, handler, priority) {
        this.dispatcher.one(event, handler, priority);
        return this;
    }
    
    /**
     * Detach an event handler for the specified event or remove all handlers if no handler is specified.
     *
     * @param {String} event the event type for this to remove one or more handlers.
     * @param {Callback} (optional) handler a specific callback to remove.
     * @return {MVCObject} provides a fluent interface which allows multiple handlers to be detached.
     * @public
     */
    MVCObject.prototype.off = function(event, handler) {
        this.dispatcher.off(event, handler);
        return this;
    }

    // add MVCObject to namespace.
    cardmaker.MVCObject = MVCObject;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
