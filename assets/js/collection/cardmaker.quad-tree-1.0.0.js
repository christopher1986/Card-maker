(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     *
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
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
         * The four subnodes into which this node is divided.
         *
         * @typedef {Node[]}
         * @private
         */
        self.nodes = [];
        
        /**
         * The elements contained by this node. 
         *
         * @type {Array}
         * @private
         */
        self.children = [];
        
        /**
         * Initialize a new Node.
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
            self.depth   = (Cardmaker.NumberUtil.isNumeric(depth)) ? Math.floor(depth) : 0;
            self.options = (cardmaker.ObjectUtil.isPlainObject(args)) ? cardmaker.ObjectUtil.merge(self.options, args) : self.options;
        }
        init(bounds, depth, options);
    }
    
    /**
     * 
     *
     */
    Node.prototype.insert = function(element) {
        if (this.isAllowed(element)) {
            throw new TypeError('Node expects an object with a "getBounds" function.');
        }
    }
    
    /**
     * 
     *
     * @throws {TypeError} if the specified element does not define a boundary through a {@link #getBounds()} function.
     */
    Node.prototype.retrieve = function(element) {

    }
    
    /**
     * Remove all children and subnodes from this node. The node will be empty after this call returns.
     *
     * @public 
     */
    Node.prototype.clear = function() {
    
    }
    
    /**
     * Divide this node into four equal subnodes.
     *
     * Don't call this method directly, because a {@link Node} will determine when it should subdivide
     * based on the 'maxChildren' option and the actual number of children it contains.
     *
     * @private
     */
    Node.prototype.subdivide = function() {
        
    }
    
    /**
     * 
     *
     *
     */
    Node.prototype.getIndex = function(bounds) {
        var leftQuadrant = (bounds.getMinX() < (self.bounds.getMinX() + (self.bounds.getWidth() / 2)));
        var topQuadrant  = (bounds.getMinY() < (self.bounds.getMinY() + (self.bounds.getHeight() / 2)));
        
        var index = -1;
        
        
    }
    
    /**
     * Tests whether the specified element has a {@link #getBounds()} function.
     *
     * @param {*} element - the element for which to determine if it has a boundary.
     * @return {Boolean} true if the specified argument has a boundary, otherwise false.
     */
    Node.prototype.isAllowed = function(element) {
        return (typeof element.getBounds === 'function' && element.getBounds() instanceof cardmaker.Bounds);
    }
    
    /**
     * Index of the top left subnode.
     *
     * @public
     * @static
     */
    Node.TOP_LEFT = 0;
    
    /**
     * Index of the top right subnode.
     *
     * @public
     * @static
     */
    Node.TOP_RIGHT = 1;
    
    /**
     * Index of the bottom left subnode.
     *
     * @public
     * @static
     */
    Node.BOTTOM_LEFT = 2;
    
    /**
     * Index of the bottom right subnode.
     *
     * @public
     * @static
     */
    Node.BOTTOM_RIGHT = 3;
    
    /**
     *
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
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
         * @throws {TypeError} if the first argument is not a {@link cardmaker.Bounds} object.
         * @see {@link Node#init(bounds, depth, options)}
         * @private
         */
        function init(bounds, args) {
            if (!(bounds instanceof cardmaker.Stage)) {
                throw new TypeError('QuadTree expects a cardmaker.Stage object.');
            }

            self.root = new Node(bounds, 0, args);
        }
        init(bounds, args);
    }
    
    /**
     * Insert the specified element into the quadtree.
     *
     * @throws {TypeError} if the specified element does not define a boundary through a {@link #getBounds()} function.
     * @public
     */
    QuadTree.prototype.insert = function(element) {
    
    }
    
    /**
     * Returns a collection of elements that could possibly collide with the specified element.
     *
     * @return {Array} a collection of element with which to collide.
     * @throws {TypeError} if the specified element does not define a boundary through a {@link #getBounds()} function.
     * @public
     */
    QuadTree.prototype.retrieve = function(element) {
        
    }
    
    /**
     * Remove all nodes from this quadtree. The quadtree will be empty after this call returns.
     *
     * @public 
     */
    QuadTree.prototype.clear = function() {
    
    }
    
    // add QuadTree to namespace.
    cardmaker.QuadTree = QuadTree;

})(this, this.document, this.cardmaker = this.cardmaker || {});
