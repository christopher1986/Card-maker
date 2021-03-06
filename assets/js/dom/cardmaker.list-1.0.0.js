(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The List class provides an object oriented interface for block-level element containing other elements.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function List(element) {
        /**
         * A reference to this object.
         *
         * @typedef {List}
         * @private
         */
        var self = this;
        
        /**
         * The element to which children are appended.
         *
         * @type {window.Node}
         * @private
         */
        var parent = null;

        /** 
         * Returns the element that represents this list.
         *
         * @return {window.Node} the element that represents this list.
         * @public
         */
        self.getParent = function() {
            return parent;
        }        
        
        /**
         * Initialize the List.
         *
         * @param {window.Node} element the HTML element that represents this list.
         * @throws {TypeError} if the specified argument is not an HTMLElement.
         * @private
         */
        function init(element) {        
            // call parent constructor.
            cardmaker.MVCObject.call(self);

            if (!(element instanceof window.Node)) {
                throw new TypeError('ObservableList expects a Node object.');
            }
            
            parent = element;
        }
        init(element);
    }
    
    /**
     * Append the specified node to the end of the list.
     *
     * @param {window.Node} node - the node to append.
     * @return {Boolean} true if the node was appended, otherwise false.
     * @public
     */
    List.prototype.add = function(node) {
        var allowed = (node instanceof window.Node);
        if (allowed) {
            this.getParent().appendChild(node);
        }
        
        return allowed;
    }

    /**
     * Append the collection of nodes to the end of the list.
     *
     * @param {window.Node[]} nodes - the collection of nodes to append.
     * @return {Boolean} true if at least one node was appended, otherwise false.
     * @public
     */    
    List.prototype.addAll = function(nodes) {
        var oldSize = this.size();
        if (cardmaker.ArrayUtil.isArray(nodes)) {
            var index, size;
            for (index = 0, size = nodes.length; index < size; index++) {
                this.add(nodes[index]);
            }
        }
        
        return (oldSize < this.size());
    }
    
    /**
     * Remove the node at the specified position from this list.
     *
     * @param {Number} index - the index of the node to be removed.
     * @return {window.Node|null} the node that was removed, or null if no node was found.
     * @public
     */    
    List.prototype.removeByIndex = function(index) {
        var child = null;
        var parent = this.getParent();
        if (parent) {
            var children = parent.children;
            if (index >= 0 && index < children.length) {
                 child = parent.removeChild(children[index]);
            }
        }
    
        return child;
    }
    
    /**
     * Remove if present the specified node from this list.
     *
     * @param {window.Node} node - the node to remove.
     * @return {Boolean} true if the node was removed, otherwise false.
     * @public
     */
    List.prototype.remove = function(node) {      
        return (this.getParent().removeChild(node) !== null);
    }
    
    /**
     * Remove one or more nodes contained by the collection from this list.
     *
     * @param {window.Node[]} nodes - the collection of nodes to remove.
     * @return {Boolean} true if at least one node was removed, otherwise false.
     * @public
     */
    List.prototype.removeAll = function(nodes) {
        var oldSize = this.getParent().children.length;
        if (cardmaker.ArrayUtil.isArray(nodes)) {
            var index, size;
            for (index = 0, size = nodes.length; index < size; index++) {
                this.remove(nodes[index]);
            }
        }
        
        return (oldSize < this.getParent().children.length);
    }
    
    /**
     * Insert an node at the specified index.
     *
     * @param {Number} index - the index at which to insert the node.
     * @param {window.Node} node - the node to insert.
     * @return {Boolean} true if the node was inserted, otherwise false.
     * @public
     */
    List.prototype.insert = function(index, node) {
        var inserted = false;
        if (cardmaker.NumberUtil.isNumeric(index)) {
            var children = this.getParent().children;
            if (index >= children.length) {
                return this.add(node);
            }
            
            index = (index > 0) ? index : 0;
            inserted = (this.getParent().insertBefore(node, children[index]) !== null);
        }
        
        return inserted;
    }

    /**
     * Tests whether the specified is contained within this list.
     *
     * @param {window.Node} node - the node whose presence will be tested.
     * @return {Boolean} true if the node exists within this list, otherwise false.
     * @public
     */
    List.prototype.contains = function(node) {
        return (this.indexOf(node) !== -1);
    }
    
    /**
     * Returns the index of the first occurrence of the specified node in this list.
     *
     * @param {window.Node} node - the node to search for.
     * @return {Number} the index associated with the node, or -1 on failure.
     * @public
     */
    List.prototype.indexOf = function(node) {
        var parent = this.getParent();
        if (parent) {
            var children = parent.children;
            var index, size;
            for (index = 0, size = children.length; index < size; index++) {
                if (children[index] === node) {
                    return index;
                }
            }
        }
        
        return -1;
    }
    
    /**
     * Returns the index of the last occurrence of the specified node in this list.
     *
     * @param {window.Node} node - the node to search for.
     * @return {Number} the index associated with the node, or -1 on failure.
     * @public
     */
    List.prototype.lastIndexOf = function(node) {
        var parent = this.getParent();
        if (parent) {
            var children = parent.children;
            var index;
            for (index = children.length; index > 0; index--) {
                if (children[index] === node) {
                    return index;
                }
            }
        }
        
        return -1;
    }
    
    /**
     * Returns true if this list is empty.
     *
     * @return {Boolean} true if the list is empty, otherwise false.
     * @public
     */
    List.prototype.isEmpty = function() {
        var parent = this.getParent();
        return (parent && parent.children.length === 0);
    }
    
    /**
     * Remove all nodes contained by this list.
     *
     * @public
     */
    List.prototype.clear = function() {
        var parent = this.getParent();
        if (parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    
    /**
     * Returns the number of nodes contained within this list.
     *
     * @return {Number} the number of nodes contained within this list.
     * @public
     */
    List.prototype.size = function() {
        var parent = this.getParent();
        return (parent) ? parent.children.length : 0;
    }
    
    /**
     * Returns an array containing all nodes contained within this list.
     *
     * @return {window.Node[]} a collection of nodes contained within this list.
     * @public
     */
    List.prototype.toArray = function() {
        var parent = this.getParent();
        return (parent) ? cardmaker.ArrayUtil.copy(parent.children) : [];
    }
    
    // add List to namespace.
    cardmaker.List = List;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
