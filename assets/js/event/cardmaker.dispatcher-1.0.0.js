(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Event class is a generic event that is passed to an event handler.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Event(type) {
        /**
         * A reference to this object.
         *
         * @typedef {Event}
         * @private
         */
        var self = this;
        
        /**
         * The event type.
         *
         * @type {String}
         * @public
         */
        self.type = '';
        
        /**
         * Initialize a new Event.
         *
         * @param {String} type - the event type.
         * @private
         */
        function init(type) {
            self.type = (typeof type === 'string') ? type : '';
        }
        init(type);
    }
    
    /**
     * The EventItem contains information such as the event name and priority of an event handler.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function EventItem(handler, priority, once) {
        /**
         * A reference to this object.
         *
         * @typedef {EventItem}
         * @private
         */
        var self = this;
        
        /**
         * An event that should be dispached only once.
         *
         * @type {Boolean}
         * @public
         */
        self.once = false;
        
        /**
         * The priority of this event.
         *
         * @type {Number}
         * @public
         */
        self.priority = 0;
        
        /**
         * The handler to execute.
         *
         * @type {Callback}
         */
        self.handler = null;
        
        /**
         * Initialize a new EventItem.
         *
         * @param {callback} handler - the callback that will be executed for this event.
         * @param {Number} priority - (optional) the priority of this event, defaults to 0.
         * @param {Boolean} once - (optional) only execute the handler once, defaults to false.
         * @private
         */
        function init(handler, priority, once) {
            self.handler  = handler;
            self.priority = (cardmaker.NumberUtil.isNumeric(priority) && priority >= 0) ? parseInt(priority) : 0;
            self.once     = (typeof once === 'boolean') ? once : false;
        }
        init(handler, priority, once);
    }
    
    /**
     * The EventDispatcher is responsible for managing and dispatching events.
     * 
     * Objects such as Element, Document, Window or any other object implementing the
     * EventTarget interface should not rely on this dispatcher and instead use the 
     * default event mechanism available in JavaScript.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function EventDispatcher()
    {
        /**
         * A reference to this object.
         *
         * @typedef {EventDispatcher}
         * @private
         */
        var self = this;
        
        /**
         * A collection of event items.
         *
         * @type {Object}
         * @public
         */
        self.items = {};
    }
    
    /**
     * Dispatch event for the specified callee.
     *
     * @param {Object} callee - the callee for which the event is dispatched.
     * @param {Event|string} event - an Event object or string containing the event type.
     * @param {...*} additional paramaters to pass along to the event handler.
     */
    EventDispatcher.prototype.dispatch = function(callee, event) {
        if (typeof event === 'string') {
            event = new Event(event);
        }

        var args = [event].concat(cardmaker.ArrayUtil.copy(arguments, 2));
        if (this.items.hasOwnProperty(event.type)) {
            var bucket = this.items[event.type];
            var start  = bucket.length - 1;
            for (var i = start; i >= 0; i--) {
                var item = bucket[i];
                if (item.once) {
                    bucket.splice(i, 1);
                }

                item.handler.apply(callee, args);
            }
        }
    }

    /**
     * Attach an event handler for the specified event.
     *
     * @param {String} event - the event type.
     * @param {callback} handler - the callback to execute.
     * @param {Number} priority - (optional) the priority associated with the handler.
     * @param {Boolean} once - (optional) only execute the handler once, defaults to false.
     * @public
     */
    EventDispatcher.prototype.on = function(event, handler, priority, once) {
        var bucket   = (this.items.hasOwnProperty(event)) ? this.items[event] : [];
        var current  = new EventItem(handler, priority, once);
        var previous = bucket[bucket.length-1];

        bucket.push(current);
        if (previous instanceof EventItem && previous.priority < current.priority) {
            // sort events by descending priority.
            bucket.sort(function(first, other) {
                if (first.priority == other.priority) {
                    return 0;
                }
                return (first.priority < other.priority) ? 1 : -1;
            });
        }
        
        this.items[event] = bucket;
    }
    
    /**
     * Attach an event handler for the specified event. The handler is executed at most once.
     *
     * @param {String} event - the event type.
     * @param {callback} handler - the callback to execute.
     * @param {Number} priority - (optional) the priority associated with the handler.
     * @public
     */
    EventDispatcher.prototype.one = function(event, handler, priority) {
        this.on(event, handler, priority, true);
    }
    
    /**
     * Detach an event handler for the specified event or remove all handlers if no handler is specified.
     *
     * @param {String} event - the event type for this to remove one or more handlers.
     * @param {callback} (optional) - handler a specific callback to remove.
     * @return {Boolean} true if one or more handlers were removed, otherwise false.
     * @public
     */
    EventDispatcher.prototype.off = function(event, handler) {
        var removed = false;
        if (this.items.hasOwnProperty(event)) {
            var bucket = this.items[event];
            
            // remove all handlers.
            if (typeof handler === 'undefined') {
                this.items[event] = [];
                return true;
            }
            
            // remove specific handler.
            var start = bucket.length - 1;
            for (var i = start; i >= 0; i--) {
                var item = bucket[i];
                if (item.handler === handler) {
                    bucket.splice(i, 1);
                    removed = true;
                }
            }
        }
        
        return removed;
    }
    
    // add EventDispatcher to namespace.
    cardmaker.EventDispatcher = EventDispatcher;
    // add Event to namespace.
    cardmaker.Event = Event;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
