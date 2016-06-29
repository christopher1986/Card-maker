(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The SortableList decorates a {@link cardmaker.List} object and allows child elements to be sortable.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
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
        this.getDecoratee().isEmpty();
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
    
    // add SortableList to namespace.
    cardmaker.SortableList = SortableList;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
