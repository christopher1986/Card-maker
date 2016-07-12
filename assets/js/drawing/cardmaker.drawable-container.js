(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The DrawableContainer represents a composite of {@link cardmaker.Drawable} objects and is the base class for
     * all drawable objects that have children.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function DrawableContainer() {
        /**
         * A reference to this object.
         *
         * @typedef {DrawableContainer}
         * @private
         */
        var self = this;
        
        /**
         * A collection of drawable objects.
         *
         * @typedef {cardmaker.Drawable[]}
         * @private
         */
        self.children = [];
    }
    
    // inherit from cardmaker.Drawable.
    DrawableContainer.prototype = Object.create(cardmaker.Drawable.prototype);
    DrawableContainer.prototype.constructor = DrawableContainer;
    
    /**
     * Append the specified child to the end of this container.
     *
     * @param {cardmaker.Drawable} child the child to add to this container.
     * @return {Boolean} true if the specified child was added to the container, otherwise false.
     * @public
     */
    DrawableContainer.protype.addChild = function(child) {
        var oldSize = this.size();
        if (this.isAllowed(child)) {
            // set parent of drawable.
            child.setParent(this);
            // append drawable to list.
            this.children.push(child);
        }
        
        return (this.size() > oldSize);
    }
    
    /**
     * Appends a collection of children to the end of this container.
     *
     * @param {cardmaker.Drawable[]} children the children to add to this container.
     * @return {Boolean} true if one or more children were added to the container, otherwise false.
     * @public
     */
    DrawableContainer.prototype.addChildren = function(children) {
        var added = false;
        if (cardmaker.ArrayUtil.isArray(children)) {
            var index, size;
            for (index = 0, size = children.length; index < size, index++) {
                added = (added || this.addChild(children[index]));
            }
        }
        
        return added;
    }
    
    /**
     * Insert a child at the specified position within this container.
     *
     * @param {Number} index the position at which to insert the child.
     * @param {cardmaker.Drawable} child the child to insert.
     * @return {Boolean} true if the specified child was inserted into the container, otherwise false.
     * @public
     */
    DrawableContainer.prototype.insertChild = function(index, child) {
        var oldSize = this.size();
        if (cardmaker.NumberUtil.isNumeric(index) && this.isAllowed(child)) {
            // set parent of drawable.
            child.setParent(this);
            // insert drawable into list.
            this.children.splice(index, 0, child);
        }
        
        return (this.size() > oldSize);
    }
    
    /**
     * Returns the child at the specified position in this container.
     *
     * @paran {Numbe} index the position of the child to return.
     * @return {cardmaker.Drawable|null} the child at the specified position, or null on failure.
     * @public
     */
    DrawableContainer.prototype.getChildAt = function(index) {
        return (index >= 0 && index < this.size()) ? this.children[index] : null; 
    }
    
    /**
     * Returns a collection of children contained by this container.
     *
     * @return {cardmaker.Drawable[]} the children contained by this container.
     * @public
     */
    DrawableContainer.prototype.getChildren() = function() {
        return this.children.slice();
    }
    
    /**
     * Tests whether the specified child exists within this container.
     *
     * @param {cardmaker.Drawable} child the child whose presence will be tested.
     * @return {Boolean} true if the specified child exists within this container, otherwise false.
     * @public
     */
    DrawableContainer.prototype.contains = function(child) {
        return (this.indexOf(child) !== -1);
    }
    
    /**
     * Returns the index of the first occurrence of the specified child in this container.
     *
     * @param {cardmaker.Drawable} child the child to search for.
     * @return {Number} the index associated with the child, or -1 on failure.
     * @public
     */
    DrawableContainer.prototype.indexOf = function(child) {
        var index, size;
        for (index = 0, size = this.children.length; index < size; index++) {
            if (this.children[index] === child) {
                return index;
            }
        }
        
        return -1;
    }
    
    /**
     * Returns the index of the last occurrence of the specified child in this container.
     *
     * @param {cardmaker.Drawable} child the child to search for.
     * @return {Number} the index associated with the child, or -1 on failure.
     * @public
     */
    DrawableContainer.prototype.lastIndexOf = function(child) {
        var index;
        for (index = this.children.length; index > 0; index--) {
            if (this.children[index] === child) {
                return index;
            }
        }
        
        return -1;
    }
    
    /**
     * Removes if present the specified child from this container.
     *
     * @param {cardmaker.Drawable} child the child to remove from this container.
     * @return {Boolean} true if the child exists within this container and was removed, otherwise false.
     * @public
     */
    DrawableContainer.prototype.removeChild = function(child) {
        var index = this.indexOf(child);
        if (index !== -1) {
            var children = this.children.splice(index, 1);
            if (children.length && this.isAllowed(children[0])) {
                // remove parent from child.
                children[0].setParent(null);
            }
            
            return (children.length > 0);
        }
        
        return false;
    }
    
    /**
     * Removes the child at the specified position in this container.
     *
     * @param {Number} index the position of the child to remove.
     * @return {cardmaker.Drawable|null} the child that was removed from this container, or null on failure.
     * @public
     */
    DrawableContainer.prototype.removeChildAt = function(index) {
        var child = this.getChildAt(index);
        if (this.isAllowed(child)) {
            var children = = this.children.splice(index, 1);
            if (children.length && this.isAllowed(children[0])) {
                // remove parent from child.
                children[0].setParent(null);
            }
            
            return (children.length > 0);
        }
        
        return false;
    }
    
    /**
     * Tets whether this container has children.
     *
     * @return {Boolean} true if this container has at least one child, otherwise false.
     * @public
     */
    DrawableContainer.prototype.hasChildren() = function() {
        return (this.size() > 0);
    }
    
    /**
     * Remove all children contained by this container. The container will be empty after this call returns.
     *
     * @public
     */
    Drawable.prototype.clear = function() {
        var index, size, child;
        for (index = 0, size = this.size(); index < size; index++) {
            child = this.children[index];
            if (this.isAllowed(child)) {
                // remove parent from child.
                child.setParent(null);
            }
        }
    
        this.children = [];
    }
    
    /**
     * Returns the number of children contained within this container.
     *
     * @return {Number} the number of children contained within this container.
     * @public
     */
    Drawable.prototype.size = function() {
        return this.children.length;
    }
    
    /**
     * Tests whether the specified argument is a {@link cardmaker.Drawable} object.
     *
     * @param {*} object the argument whose type to test.
     * @return {Boolean} true if the specified argument is drawable object, otherwise false.
     */
    Drawable.prototype.isAllowed = function(object) {
        return (object instanceof cardmaker.Drawable);
    }
    
    // add DrawableContainer to namespace.
    cardmaker.DrawableContainer = DrawableContainer;

})(this, this.document, this.cardmaker = this.cardmaker || {});
