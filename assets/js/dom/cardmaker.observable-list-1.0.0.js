(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The ListChangedEvent contains information about changes made to a list.
     *
     * @author Chris Harris <c.haris@hotmail.com>
     * @version 1.0.0
     * @since 1.1.0
     */
    function ListChangedEvent(type, context, list, node) {
        /**
         * A reference to this object.
         *
         * @typedef {ListChangedEvent}
         * @private
         */
        var self = this;
        
        /**
         * The event context.
         *
         * @type {Number}
         * @public
         */
        self.context = 0x00;
        
        /**
         * The list that has changed.
         *
         * @type {cardmaker.List}
         * @public
         */
        self.list = null;
        
        /**
         * The node that triggered the change.
         *
         * @type {window.Node}
         * @public
         */
        self.node = null;
        
        /**
         * Initialize the ListChangedEvent.
         *
         * @param {String} type - the event type.
         * @param {Number} context - the event context.
         * @param {cardmaker.List} - list the list that has changed.
         * @param {window.Node} node - the node that triggered the change.
         * @private
         */
        function init(type, context, list, node) {
            // call parent constructor.
            cardmaker.Event.call(self, type);
            
            self.context = (cardmaker.NumberUtil.isInt(context)) ? context : 0x00;
            self.list    = (list instanceof cardmaker.List) ? list : null;
            self.node    = (node instanceof window.Node) ? node : null;
        }
        init(type, context, list, node);
    }
    
    // inherit from cardmaker.Event. 
    ListChangedEvent.prototype = Object.create(cardmaker.Event.prototype);
    ListChangedEvent.prototype.constructor = ListChangedEvent;

    /**
     * A constant that defines the 'added' context.
     *
     * @type {Number}
     * @constant
     * @public
     */
    ListChangedEvent.ITEM_ADDED = 0x01;
    
    /**
     * A constant that defines the 'removed' context.
     *
     * @type {Number}
     * @constant
     * @public
     */
    ListChangedEvent.ITEM_REMOVED = 0x02;

    /**
     * Returns true if the change is related to an element that has was removed from the list.
     *
     * @return {Boolean} true if an element was removed from the list.
     * @public
     */
    ListChangedEvent.prototype.wasAdded = function() {
        return (this.context === ListChangedEvent.ITEM_ADDED);
    }
    
    /**
     * Returns true if the change is related to an element that has been added to the list.
     *
     * @return {Boolean} true if an element was added to the list.
     * @public
     */
    ListChangedEvent.prototype.wasRemoved = function() {
        return (this.context === ListChangedEvent.ITEM_REMOVED);
    }

    /**
     * The ObservableList is a list that notifies listeners about possible changes such as adding or removing child elements.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function ObservableList(element, options) {
        /**
         * A reference to this object.
         *
         * @typedef {ObservableList}
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
        
        /**
         * Initialize the ObservableList.
         *
         * @param {window.Node} element - the HTML element that represents this list.
         * @param {Object} options - (optional) the {@link MutationObserver} options.
         * @private
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver}
         */
        function init(element, options) {
            // call parent constructor.
            cardmaker.List.call(self, element);

            var defaults = {
                attributes: true, 
                childList: true, 
                characterData: true,
                subtree: false
            };
            options = cardmaker.ObjectUtil.merge(defaults, options);

            var observer = new MutationObserver(function(mutations) {
                var index, size;
                mutations.forEach(function(mutation) {
                    // dispatch ListChangedEvents for added nodes.
                    for (index = 0, size = mutation.addedNodes.length; index < size; index++) {
                        self.dispatch(new ListChangedEvent('changed', ListChangedEvent.ITEM_ADDED, self, mutation.addedNodes[index]));
                    }
                    // dispatch ListChangedEvents for removed nodes.
                    for (index = 0, size = mutation.removedNodes.length; index < size; index++) {
                        self.dispatch(new ListChangedEvent('changed', ListChangedEvent.ITEM_REMOVED, self, mutation.removedNodes[index]));
                    }
                });
            });
            observer.observe(self.getParent(), options);
        }
        init(element, options);
    }
    
    // inherit from cardmaker.List.
    ObservableList.prototype = Object.create(cardmaker.List.prototype);
    ObservableList.prototype.constructor = ObservableList;
    
    /**
     * Dispatch event for the specified callee.
     *
     * @param {Event|string} event - Event object or string containing the event type.
     * @param {...*} additional paramaters to pass along to the event handler.
     */
    ObservableList.prototype.dispatch = function(event) {
        var args = cardmaker.ArrayUtil.copy(arguments);
            args.unshift(this);

        this.dispatcher.dispatch.apply(this.dispatcher, args);
    }    
    
    /**
     * Add the specified change listener to this observable list.
     *
     * @param {Callback} listener - the listener to add.
     * @return {cardmaker.ObservableList} provides a fluent interface which allows multiple handlers to be attached.
     * @public
     */
    ObservableList.prototype.addChangeListener = function(listener) {
        this.dispatcher.on('changed', listener);
        return this;
    }
    
    /**
     * Remove the specified change listener from this observable list.
     *
     * @param {Callback} listener - the listener to remove.
     * @return {cardmaker.ObservableList} provides a fluent interface which allows multiple handlers to be detached.
     * @public
     */
    ObservableList.prototype.removeChangeListener = function(listener) {
        this.dispatcher.off('changed', listener);
        return this;
    }
    
    // add ObservableList to namespace.
    cardmaker.ObservableList = ObservableList;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
