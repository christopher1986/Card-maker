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
    function LayoutRenderer(bounds, args) {
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
         * The canvas containing the drawables to render.
         *
         * @typedef {cardmaker.Canvas}
         * @public
         */
        self.canvas = null;

        /**
         * Initialize the CollisionDetector.
         *
         * @param {cardmaker.Canvas} canvas - the canvas containing the drawables to render.
         * @param {Object} args - (optional) the options to use by the underlying quadtree.
         * @throws {TypeError} if the first argument is not {@link cardmaker.Canvas} object.
         */
        function init(canvas, args) {
            if (!(canvas instanceof cardmaker.Canvas)) {
                throw new TypeError('LayoutRenderer expects a cardmaker.Canvas object.');
            }

            var options = cardmaker.ObjectUtil.merge(args, { 'maxChildren': 4, 'maxDepth': 4 });
            self.canvas = canvas;
            self.tree   = new cardmaker.QuadTree(canvas.getBounds(), options);
        }
        init(bounds, args);
    }

    /**
     * Returns a collection of elements that can collide with the specified element.
     *
     * @publix
     */
    LayoutRenderer.prototype.layout = function() {
        var index, size, drawable;
        for (index = 0, size = this.drawables.length; index < size; index++) {
            drawable = this.drawables[index];
            if (!drawable.isValid()) {
                drawable.draw()
            }
        }
    }

    /**
     * Returns a collection of elements that can collide with the specified element.
     *
     * @public
     */
    LayoutRenderer.prototype.relayout = function() {
        var drawables = this.canvas.drawables;
        var tree = this.tree;

        tree.clear();
        tree.insertAll(drawables);

        var targets, target, source, i, j;
        for (i = 0; i < drawables.length; i++) {
            source = drawables[i];
            targets = tree.retrieve(source);
            for (j = 0; j < targets.length; j++) {
                target = targets[j];
                // compute if the drawables do collide.
                if (source.getBounds().intersects(target.getBounds())) {
                    console.log('collide');
                }
            }
        }
    }

    // add LayoutRenderer to namespace.
    cardmaker.LayoutRenderer = LayoutRenderer;

})(this, this.document, this.cardmaker = this.cardmaker || {});
