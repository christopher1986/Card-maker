(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The CollisionDetector uses a 2D collision detection algorithm. The time required to detect all possible collisions
     * is minimized by using a quadtree which reduces the number of collision checks this detector must perform.
     * 
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function CollisionDetector(bounds, args) {
        /**
         * A reference to this object.
         *
         * @typedef {cardmaker.CollisionDetector}
         * @private
         */
        var self = this;
        
        /**
         * The quadtree to minimize the number of collision checks.
         *
         * @typedef {cardmaker.QuadTree}
         * @private
         */
        self.tree = null;
        
        /**
         * Initialize the CollisionDetector.
         *
         * @param {cardmaker.Bounds} bounds - the boundaries of the canvas.
         * @param {Object} args - (optional) the options to use by the underlying quadtree.
         */
        function init(bounds, args) {
            var options = cardmaker.ObjectUtil.merge(args, { 'maxChildren': 4, 'maxDepth': 4 });
            self.tree = new cardmaker.QuadTree(bounds, options);
        }
        init(bounds, args);
    }
    
    /**
     * Returns a collection of elements that can collide with the specified element.
     *
     * @param {*} element - the element whose collision to test.
     * @param {Array} elements - the elements to check against.
     * @return {Array} a collection of elements with which the element can collide.
     */
    CollisionDetector.prototype.collidesWith = function(element, elements) {
        this.tree.clear();
        if (cardmaker.Array.isArray(elements)) {
            var index, size;
            for (index = 0, size = elements.length; index < size; index++) {
                this.tree.insert(elements[index]);   
            }
        }
        
        return this.tree.retrieve(element);
    }

})(this, this.document, this.cardmaker = this.cardmaker || {});
