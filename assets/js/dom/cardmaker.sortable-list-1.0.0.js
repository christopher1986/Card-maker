(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The SortableList decorates a {@link cardmaker.List} object and allows child elements to be sortable.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link http://www.cssscript.com/demo/native-html5-drag-and-drop-sortable-js/}
     */
    function SortableList(list) {
        /**
         * A reference to this object.
         *
         * @typedef {SortableList}
         * @private
         */
        var self = this;
        
        /**
         * The list that is being decorated.
         *
         * @typedef {cardmaker.List}
         * @private
         */
        var decoratee = null;
        
        /**
         * The element that is being dragged.
         *
         * @type {window.Element}
         * @public
         */
        self.draggable = null;
        
        /**
         * Returns the list that is being decorated.
         *
         * @return {cardmaker.List} the underlying list.
         * @public
         */
        self.getDecoratee = function() {
            return decoratee;
        }
        
        /**
         * Initialize the SortableList.
         *
         * @param {cardmaker.List} the list to decorate.
         * @throws {TypeError} if the specified argument is not a {@link cardmaker.List} object.
         * @private
         */
        function init(list) {        
            if (!(list instanceof cardmaker.List)) {
                throw new TypeError('SortableList expects a cardmaker.List object.');
            }

            if (list instanceof cardmaker.ObservableList) {
                list.addChangeListener(self.onListChange.bind(self)); 
            }
            
            decoratee = list;

        }
        init(list);
    }
    
    // inherit from cardmaker.List.
    SortableList.prototype = Object.create(cardmaker.List.prototype);
    SortableList.prototype.constructor = SortableList;
    
    /**
     * Append the specified node to the end of the list.
     *
     * @param {Node} node the node to append.
     * @return {Boolean} true if the node was appended, otherwise false.
     * @public
     */
    SortableList.prototype.add = function(node) {
        return this.getDecoratee().add(node);
    }

    /**
     * Append the collection of nodes to the end of the list.
     *
     * @param {Node[]} nodes the collection of nodes to append.
     * @return {Boolean} true if at least one node was appended, otherwise false.
     * @public
     */    
    SortableList.prototype.addAll = function(nodes) {
        return this.getDecoratee().addAll(nodes);
    }
    
    /**
     * Remove the node at the specified position from this list.
     *
     * @param {Number} index the index of the node to be removed.
     * @return {Node|null} the node that was removed, or null if no node was found.
     * @public
     */    
    SortableList.prototype.removeByIndex = function(index) {
        return this.getDecoratee().removeByIndex(index);
    }
    
    /**
     * Remove if present the specified node from this list.
     *
     * @param {Node} node the node to remove.
     * @return {Boolean} true if the node was removed, otherwise false.
     * @public
     */
    SortableList.prototype.remove = function(node) {      
        return this.getDecoratee().remove(node);
    }
    
    /**
     * Remove one or more nodes contained by the collection from this list.
     *
     * @param {Node[]} nodes the collection of nodes to remove.
     * @return {Boolean} true if at least one node was removed, otherwise false.
     * @public
     */
    SortableList.prototype.removeAll = function(nodes) {
        return this.getDecoratee().removeAll(nodes);
    }
    
    /**
     * Insert an node at the specified index.
     *
     * @param {Number} index the index at which to insert the node.
     * @param {Node} node the node to insert.
     * @return {Boolean} true if the node was inserted, otherwise false.
     * @public
     */
    SortableList.prototype.insert = function(index, node) {
        return this.getDecoratee().insert(index, node);
    }

    /**
     * Tests whether the specified is contained within this list.
     *
     * @param {Node} node the node whose presence will be tested.
     * @return {Boolean} true if the node exists within this list, otherwise false.
     * @public
     */
    SortableList.prototype.contains = function(node) {
        return this.getDecoratee().contains(node);
    }
    
    /**
     * Returns the index of the first occurrence of the specified node in this list.
     *
     * @param {Node} node the node to search for.
     * @return {Number} the index associated with the node, or -1 on failure.
     * @public
     */
    SortableList.prototype.indexOf = function(node) {
        return this.getDecoratee().indexOf(node);
    }
    
    /**
     * Returns the index of the last occurrence of the specified node in this list.
     *
     * @param {Node} node the node to search for.
     * @return {Number} the index associated with the node, or -1 on failure.
     * @public
     */
    SortableList.prototype.lastIndexOf = function(node) {
        return this.getDecoratee().lastIndexOf(node);
    }
    
    /**
     * Returns true if this list is empty.
     *
     * @return {Boolean} true if the list is empty, otherwise false.
     * @public
     */
    SortableList.prototype.isEmpty = function() {
        return this.getDecoratee().isEmpty();
    }
    
    /**
     * Remove all nodes contained by this list.
     *
     * @public
     */
    SortableList.prototype.clear = function() {
        this.getDecoratee().clear();
    }
    
    /**
     * Returns the number of nodes contained within this list.
     *
     * @return {Number} the number of nodes contained within this list.
     * @public
     */
    SortableList.prototype.size = function() {
        return this.getDecoratee().size();
    }
    
    /**
     * Returns an array containing all nodes contained within this list.
     *
     * @return {Node[]} a collection of nodes contained within this list.
     * @public
     */
    SortableList.prototype.toArray = function() {
        return this.getDecoratee().toArray();
    }
    
    /**
     * Tests whether the specified element is sortable.
     *
     * @param {Element} element - the element to test whether it is sortable.
     * @return {Boolean} true if the element is sortable, otherwise false.
     */
    SortableList.prototype.isSortable = function(element) {
        var sortable = false;
        if (this.isAllowed(element)) {
            sortable = (element.getAttribute('data-sortable') === 'true');
        }
        
        return sortable;
    }
    
    /**
     * Tests whether the specified element can be sortable.
     *
     * @param {*} element - the element to test whether it can be sortable.
     * @return {Boolean} true if the element can be sortable, otherwise false.
     * @public
     */
    SortableList.prototype.isAllowed = function(element) {
        return (element instanceof window.Element);
    }
    
    /**
     * Allow the specified element to be sortable.
     *
     * @param {window.Element} element - the element to make sortable.
     * @throws TypeError if the specified argument is not an Element object.
     */
    SortableList.prototype.enableSort = function(element) {
        if (!this.isAllowed(element)) {
            throw new TypeError('SortableList expects a window.Element object.');
        }        
        
        element.addEventListener('dragstart', this.onDragStart.bind(this));
        element.addEventListener('dragenter', this.onDragEnter.bind(this));
        element.addEventListener('dragover', this.onDragOver.bind(this));
        element.addEventListener('dragleave', this.onDragLeave.bind(this));
        element.addEventListener('drop', this.onDrop.bind(this));
        element.addEventListener('dragend', this.onDragEnd.bind(this));
        
        element.setAttribute('data-sortable', 'true');
        element.setAttribute('draggable', 'true');
    }
    
    SortableList.prototype.disableSort = function(element) {
        if (!this.isAllowed(element)) {
            throw new TypeError('SortableList expects a window.Element object.');
        }
        
        element.removeEventListener('dragstart', this.onDragStart);
        element.removeEventListener('dragenter', this.onDragEnter);
        element.removeEventListener('dragover', this.onDragOver);
        element.removeEventListener('dragleave', this.onDragLeave);
        element.removeEventListener('drop', this.onDrop);
        element.removeEventListener('dragend', this.onDragEnd);
        
        element.removeAttribute('data-sortable');
        element.removeAttribute('draggable');
    }
    
    SortableList.prototype.onDragStart = function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        this.draggable = event.currentTarget;
        
        event.currentTarget.classList.add('moving');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.currentTarget.innerHTML);
    }
    
    SortableList.prototype.onDragOver = function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        event.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    SortableList.prototype.onDragEnter = function(event) {
        event.currentTarget.classList.add('over');
    }
    
    SortableList.prototype.onDragLeave = function(event) {
        event.currentTarget.classList.remove('over');
    }
    
    SortableList.prototype.onDrop = function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        var target = event.currentTarget;
        var draggable = this.draggable;
        if (draggable && draggable != target) {
            draggable.innerHTML = target.innerHTML;
            target.innerHTML = event.dataTransfer.getData('text/html');
        }

        return false;
    }
    
    SortableList.prototype.onDragEnd = function(event) {
        event.currentTarget.style.opacity = '1';
        var parent = this.getDecoratee().getParent();
        if (parent) {
            var sortables = parent.children;
            var index, size, sortable;
            for (index = 0, size = sortables.length; index < size; index++) {
                sortable = sortables[index];
                sortable.classList.remove('over', 'moving');
            }
        }
    }
    
    /**
     * Change
     *
     *
     */
    SortableList.prototype.onListChange = function(event) {
        if (event.wasAdded()) {
            this.enableSort(event.node);
        } else if (event.wasRemoved()) {
            this.disableSort(event.node);
        }
    }
    
    // add SortableList to namespace.
    cardmaker.SortableList = SortableList;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
