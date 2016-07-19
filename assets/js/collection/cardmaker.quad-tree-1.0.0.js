(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * 
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function QuadTree(stage, args) {
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
         * @typedef {cardmaker.Node}
         * @private
         */
        self.root = null;
        
        /**
         * The options as a collection of key-value pairs.
         *
         * @type {Object}
         * @private
         */
        self.options = {
            'max_children': 4,
            'max_depth': 4
        };
        
        /**
         * Initialize a new QuadTree.
         *
         * @param {cardmaker.Stage} stage the stage containing the drawable objects.
         * @param {Object} args (optional) the options for this quadtree.
         * @throws {TypeError} if the first argument is not a {@link cardmaker.Stage} object.
         * @private
         */
        function init(stage, args) {
            if (!(stage instanceof cardmaker.Stage)) {
                throw new TypeError('QuadTree expects a cardmaker.Stage object.');
            }

            self.root = stage;
            self.options = (cardmaker.ObjectUtil.isPlainObject(args)) ? cardmaker.ObjectUtil.merge(self.options, args) : self.options;
        }
        init(stage, args);
    }
    
    // add QuadTree to namespace.
    cardmaker.QuadTree = QuadTree;

})(this, this.document, this.cardmaker = this.cardmaker || {});
