(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The ChangeEvent contains information about changed that occurred to a list.
     *
     * @author Chris Harris <c.haris@hotmail.com>
     * @version 1.0.0
     * @since 1.1.0
     */
    function ChangeEvent(type, list) {
        /**
         * A reference to this object.
         *
         * @typedef {ChangeEvent}
         * @private
         */
        var self = this;
        
        /**
         * The list that has changed.
         *
         * @type {cardmaker.List}
         * @public
         */
        self.list = null;
        
        /**
         * Initialize the ChangeEvent.
         *
         * @param {String} the event type.
         * @param {cardmaker.List} the list that has changed.
         * @private
         */
        function init(type, list) {
            // call parent constructor.
            cardmaker.Event.call(self, type);
            
            self.list = (list instanceof cardmaker.List) ? list : null;
        }
        init(type, list);
    }
    
    // inherit from cardmaker.Event. 
    ChangeEvent.prototype = Object.create(cardmaker.Event.prototype);
    ChangeEvent.prototype.constructor = ChangeEvent;

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
         * An observer instance.
         *
         * @type {MutationObserver}
         * @public
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver}
         */
        self.observer = null;
        
        /**
         * Initialize the ObservableList.
         *
         * @param {Node} element the HTML element that represents this list.
         * @param {Object} options (optional) the {@link MutationObserver} options.
         * @private
         */
        function init(element, options) {
            // call parent constructor.
            cardmaker.List.call(self, element);

            var defaults = {
                attributes: true, 
                childList: true, 
                characterData: true
            };
            options = Object.merge(defaults, options);

            self.observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        console.log('Nodes added');                    
                    }
                    if (mutation.removedNodes.length) {
                        console.log('Nodes removed');
                    }
                });
            });
            self.observer.observe(self.getParent(), options);
        }
        init(element, options);
    }
    
    // inherit from cardmaker.List.
    ObservableList.prototype = Object.create(cardmaker.List.prototype);
    ObservableList.prototype.constructor = ObservableList;
    
    ObservableList.prototype.onChanged = function(callback) {
        
    }
    
    // add ObservableList to namespace.
    cardmaker.ObservableList = ObservableList;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
