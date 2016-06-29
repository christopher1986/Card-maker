(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Sortable class allows a client to sort a list of elements.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link http://www.cssscript.com/demo/native-html5-drag-and-drop-sortable-js/}
     */
    function Sortable(selector) {
        /**
         * A reference to this object.
         *
         * @typedef {Sortable}
         * @private
         */
        var self = this;
        
        /**
         * A collection of sortable elements.
         *
         * @type {HTMLElement[]}
         * @public
         */
        self.sortables = [];
        
        /**
         * The element that is being dragged.
         *
         * @type {HTMLElement}
         * @public
         */
        self.dragElement = null;
        
        /**
         * Initialize Sortable object.
         *
         * @param {string} selector the query selector.
         */
        function init(selector) {
            var sortables = [];
            if (typeof selector === 'string') {
                sortables = sortables.slice.call(document.querySelectorAll(selector));
            }

            var index, size;
            for (index = 0, size = sortables.length; index < size; index++) {
                self.allowSort(sortables[index]);
            }
        }
        init(selector);
    }
    
    /**
     * Tests whether the specified element is sortable.
     *
     * @param {Element} element the element to test wheter it is sortable.
     * @return {Boolean} true if the element is sortable, otherwise false.
     */
    Sortable.prototype.isSortable = function(element) {
        var sortable = false;
        if (this.isAllowed(element)) {
            sortable = (element.getAttribute('data-sortable') === 'true');
        }
        
        return sortable;
    }
    
    /**
     * Tests whether the specified element can be used as sortable element.
     *
     * @param {*} element the element whose type will be tested.
     * @return {Boolean} true if the element can be made sortable, otherwise false.
     * @public
     */
    Sortable.prototype.isAllowed = function(element) {
        return (element instanceof window.Element);
    }

    /**
     * Allow the specified element to be sortable.
     *
     * @param {HTMLElement} element the element to make sortable.
     */
    Sortable.prototype.enableSort = function(element) {
        var self = this;
        element.setAttribute('draggable', 'true');
        element.addEventListener('dragstart', function(event) {
            self.onDragStart(event, this);
        });
        element.addEventListener('dragenter', function() {
            self.onDragEnter(this);
        });
        element.addEventListener('dragover', function(event) {
            self.onDragOver(event, this);
        });
        element.addEventListener('dragleave', function() {
            self.onDragLeave(this);
        });
        element.addEventListener('drop', function(event) {
            self.onDrop(event, this);
        });
        element.addEventListener('dragend', function() {
            self.onDragEnd(this);
        });
    }
    
    Sortable.prototype.onDragStart = function(event, element) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', element.innerHTML);

        this.dragElement = element;
        element.classList.add('moving');
    }
    
    Sortable.prototype.onDragOver = function(event, element) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        event.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    Sortable.prototype.onDragEnter = function(element) {
        element.classList.add('over');
    }
    
    Sortable.prototype.onDragLeave = function(element) {
        element.classList.remove('over');
    }
    
    Sortable.prototype.onDrop = function(event, element) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if (this.dragElement && this.dragElement != element) {
        
            this.dragElement.innerHTML = element.innerHTML;
            element.innerHTML = event.dataTransfer.getData('text/html');
        }

        return false;
    }
    
    Sortable.prototype.onDragEnd = function(element) {
        element.style.opacity = '1';
        
        var index, size, sortable;
        for (index = 0, size = this.sortables.length; index < size; index++) {
            sortable = this.sortables[index];
            sortable.classList.remove('over', 'moving');
        }
    }
    
    // add Sortable to namespace.
    cardmaker.Sortable = Sortable;

})(this, this.document, this.cardmaker = this.cardmaker || {});
