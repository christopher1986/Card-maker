(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Node represents a quadrant within the quadtree and it contains elements whose bounds fit within the boundary of the node.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374}
     * @see {@link http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/} 
     */
    function Node(bounds, depth, options) {
        /**
         * A reference to this object.
         *
         * @typedef {Node}
         * @private
         */
        var self = this;
        
        /**
         * The options as a collection of key-value pairs.
         *
         * @type {Object}
         * @private
         */
        self.options = {
            'maxChildren': 4,
            'maxDepth': 4
        };
        
        /**
         * The depth of this node within the quadtree.
         *
         * @type {Number}
         * @private
         */
        self.depth = 0;
        
        /**
         * The boundaries of this node within the quadtree.
         *
         * @typedef {cardmaker.Bounds}
         * @private
         */
        self.bounds = null;
        
        /**
         * The four nodes into which this node is divided.
         *
         * @typedef {Node[]}
         * @private
         */
        self.quadrants = [];
        
        /**
         * The elements contained by this node. 
         *
         * @type {Array}
         * @private
         */
        self.children = [];
        
        /**
         * Initialize the Node.
         *
         * @param {cardmaker.Bounds} bounds - the dimension and location of this node.
         * @param {Number} depth - the depth of this node within the quadtree.
         * @param {Object} args - (optional) the options for this node.
         * @throws {TypeError} if the first argument is not a {@link cardmaker.Bounds} object.
         */
        function init(bounds, depth, args) {
            if (!(bounds instanceof cardmaker.Bounds)) {
                throw new TypeError('QuadTree expects a cardmaker.Bounds object.');
            }
        
            self.bounds  = bounds;
            self.depth   = (cardmaker.NumberUtil.isInt(depth)) ? depth : 0;
            self.options = (cardmaker.ObjectUtil.isPlainObject(args)) ? cardmaker.ObjectUtil.merge(self.options, args) : self.options;
        }
        init(bounds, depth, options);
    }
    
    /**
     * Insert the specified element into this node.
     *
     * The element to insert must have a {@link #getBounds()} method and the return type of this
     * method should be a {@link cardmaker.Bounds} object.
     *
     * @param {*} element - the element to insert into this node.
     * @return {Boolean} true if the specified was inserted, otherwise false.
     * @see {@link Node.isAllowed(element)}
     * @public
     */
    Node.prototype.insert = function(element) {
        var inserted = false;
        if (this.isAllowed(element)) {
            // insert into a quadrant.
            if (this.hasQuadrants()) {
                var nodeIndex = this.getIndex(element);
                if (nodeIndex !== -1) {
                    return this.quadrants[nodeIndex].insert(element);
                }
                
                // element doesn't fit into a quadrant.
                return this.children.push(element);
            }
            
            // insert into this node.
            var inserted = this.children.push(element);
            // determine whether to subdivide.
            if (this.children.length > this.options.maxChildren && this.depth < this.options.maxDepth) {
                this.subdivide();
                
                var childIndex, nodeIndex;
                for (childIndex = (this.children.length - 1); childIndex > 0; childIndex--) {
                    nodeIndex = this.getIndex(this.children[childIndex]);
                    if (nodeIndex !== -1 && this.quadrants[nodeIndex].insert(element)) {
                        this.children.splice(childIndex, 1);
                    }
                }
            }
        }

        return inserted;
    }
    
    /**
     * Returns a collection of elements that can collide with the specified element.
     *
     * The specified element must have a {@link #getBounds()} method and the return type of this
     * method should be a {@link cardmaker.Bounds} object.
     * 
     * @param {*} element - the element for which to retrieve elements with which it can collide.
     * @param {Array} collidables - (optional) a collection of elements with which the element can collide.
     * @return {Array} a collection of elements with which the element can collide.
     */
    Node.prototype.retrieve = function(element, collidables) {
        collidables = (cardmaker.ArrayUtil.isArray(collidables)) ? collidables : [];
        if (this.isAllowed(element)) {
            if (this.hasQuadrants()) {
                var index = this.getIndex(element);
                if (index !== 0) {
                    return this.quadrants[index].retrieve(element, collidables);
                }
            }

            // append elements to array.
            collidables = collidables.concat(this.children);
        }
        
        return collidables;
    }
    
    /**
     * Remove all children and quadrants from this node. The node will be empty after this call returns.
     *
     * @public
     */
    Node.prototype.clear = function() {
        cardmaker.ArrayUtil.clear(this.children);

        while (this.quadrants.length) {
            this.quadrants.pop().clear();
        }
    }
    
    /**
     * Divide this node into four quadrants.
     *
     * This method shouldn't be invoked directly, because the {@link Node#insert(element)} contains the
     * logic that determines when this node should be subdivided into four quadrants.
     *
     * @private
     */
    Node.prototype.subdivide = function() {
        var depth  = this.depth + 1
        var minX   = this.bounds.getMinX();
        var minY   = this.bounds.getMinY();
        var width  = Math.floor(this.bounds.getWidth() / 2);
        var height = Math.floor(this.bounds.getHeight() / 2);
        
        this.quadrants[Node.TOP_LEFT]     = new Node(new cardmaker.Bounds(minX, minY, width, height), depth, this.options);
        this.quadrants[Node.TOP_RIGHT]    = new Node(new cardmaker.Bounds(minX + width, minY, width, height), depth, this.options);
        this.quadrants[Node.BOTTOM_LEFT]  = new Node(new cardmaker.Bounds(minX, minY + height, width, height), depth, this.options);
        this.quadrants[Node.BOTTOM_RIGHT] = new Node(new cardmaker.Bounds(minX + width, minY + height, width, height), depth, this.options);
    }
    
    /**
     * Returns the index of the quadrant to which the specified element belongs.
     *
     * element - the element whose boundary to test.
     * @return {Number} the index of the quadrant found for the specified element, or -1 on failure.
     * @private
     */
    Node.prototype.getIndex = function(element) {
        var bounds = element.getBounds();
        if (this.hasQuadrants()) {
            var index, size, quadrant;
            for (index = 0, size = this.quadrants.length; index < size; index++) {
                quadrant = this.quadrants[index];
                if (quadrant.bounds.containsBounds(bounds)) {
                    return index;
                }
            }
        }
        
        return -1;
    }
    
    /**
     * Returns true if this node has been subdivided into four quadrants.
     *
     * @return {Boolean} true if this node has four quadrants, otherwise false.
     * @private
     */
    Node.prototype.hasQuadrants = function() {
        return (this.quadrants.length === 4);
    }
    
    /**
     * Tests whether the specified element has a {@link #getBounds()} method.
     *
     * @param {*} element - the element to test.
     * @return {Boolean} true if the specified element has a boundary, otherwise false.
     * @private
     */
    Node.prototype.isAllowed = function(element) {
        return (typeof element.getBounds === 'function' && element.getBounds() instanceof cardmaker.Bounds);
    }
    
    /**
     * Index of the top left quadrant.
     *
     * @type {Number}
     * @public
     * @static
     */
    Node.TOP_LEFT = 0;
    
    /**
     * Index of the top right quadrant.
     *
     * @type {Number}
     * @public
     * @static
     */
    Node.TOP_RIGHT = 1;
    
    /**
     * Index of the bottom left quadrant.
     *
     * @type {Number}
     * @public
     * @static
     */
    Node.BOTTOM_LEFT = 2;
    
    /**
     * Index of the bottom right quadrant.
     *
     * @type {Number}
     * @public
     * @static
     */
    Node.BOTTOM_RIGHT = 3;
    
    /**
     * The QuadTree is a tree data structure with exactly four children. These children are also known as regions or quadrants.
     * These quadrants may consist of zero or more elements whose bounds fit within the boundary of the quadrant.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374}
     * @see {@link http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/} 
     */
    function QuadTree(bounds, args) {
        /**
         * A reference to this object.
         *
         * @typedef {cardmaker.QuadTree}
         * @private
         */
        var self = this;
        
        /**
         * The root node of this quadtree.
         *
         * @typedef {Node}
         * @private
         */
        self.root = null;
        
        /**
         * Initialize a new QuadTree.
         *
         * @param {cardmaker.Bounds} bounds - the boundaries of the quadtree.
         * @param {Object} args - (optional) the options for this quadtree.
         * @see {@link Node#init(bounds, depth, options)}
         * @private
         */
        function init(bounds, args) {
            self.root = new Node(bounds, 0, args);
        }
        init(bounds, args);
    }
    
    /**
     * Insert the specified element into this node.
     *
     * The element to insert must have a {@link #getBounds()} method and the return type of this
     * method should be a {@link cardmaker.Bounds} object. 
     *
     * @param {*} element - the element to insert into this node.
     * @return {Boolean} true if the specified was inserted, otherwise false.
     * @see {@link Node.isAllowed(element)}
     * @public
     */
    QuadTree.prototype.insert = function(element) {
        return this.root.insert(element);
    }
    
    /**
     * Insert a collection of elements into this node.
     *
     * The elements to insert must have a {@link #getBounds()} method and the return type of this
     * method should be a {@link cardmaker.Bounds} object. 
     *
     * @param {Array} elements - the elements to insert into this node.
     * @return {Boolean} true if at least one element was inserted, otherwise false.
     * @see {@link Node.isAllowed(element)}
     * @public
     */
    QuadTree.prototype.insertAll = function(elements) {
        elements = (cardmaker.ArrayUtil.isArray(elements)) ? elements : arguments;
        
        var inserted = false;
        var index, size;
        for (index = 0, size = elements.length; index < size; index++) {
            inserted = (this.root.insert(elements[index]) || inserted);
        }
        
        return inserted;
    }
    
    /**
     * Returns a collection of elements that can collide with the specified element.
     *
     * The specified element must have a {@link #getBounds()} method and the return type of this
     * method should be a {@link cardmaker.Bounds} object.
     *
     * @param {*} element - the element for which to retrieve elements with which it can collide.
     * @return {Array} a collection of elements with which the specified element can collide.
     */
    QuadTree.prototype.retrieve = function(element) {
        return cardmaker.ArrayUtil.copy(this.root.retrieve(element));
    }
    
    /**
     * Remove all quadrants from this quadtree. The quadtree will be empty after this call returns.
     *
     * @public 
     */
    QuadTree.prototype.clear = function() {
        this.root.clear();
    }
    
    // add QuadTree to namespace.
    cardmaker.QuadTree = QuadTree;

})(this, this.document, this.cardmaker = this.cardmaker || {});
