(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The Stage class is the top level container for {@link cardmaker.Drawable} objects.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Stage(canvas) {
        /**
         * A reference to this object.
         *
         * @typedef {Stage}
         * @private
         */
        var self = this;

        /**
         * The canvas onto which the stage is drawn.
         *
         * @typedef {cardmaker.Canvas}
         * @private
         */
        self.canvas;

        /**
         * Initialize the Stage.
         *
         * @param {cardmaker.Canvas} canvas The canvas onto which the stage is drawn.
         */
        function init(canvas) {
            if (!(canvas instanceof cardmaker.Canvas)) {
                throw new TypeError('Stage expects a cardmaker.Canvas object.');
            }

            // call parent constructor.
            cardmaker.DrawableContainer.call(self);

            self.canvas = canvas;
            self.canvas.addEventListener('click', function(e) {
                var rect = this.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;

                self.pick(new cardmaker.Point(x, y));
            });
        }
        init(canvas);
    }

    // inherit from cardmaker.DrawableContainer.
    Stage.prototype = Object.create(cardmaker.DrawableContainer.prototype);
    Stage.prototype.constructor = Stage;

    /**
     * Returns if present the top-most drawable that contains the given coordinates.
     *
     * @return {cardmaker.Point} The location (x,y) in a two-dimensional coordinate space.
     * @return {cardmaker.Drawable|null} The drawable at the given location, or null on failure.
     * @see {@link http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element#answer-5932203}
     */
    Stage.prototype.pick = function(point) {
        console.log(point);
    }

    // add Stage to namespace.
    cardmaker.Stage = Stage;

})(this, this.document, this.cardmaker = this.cardmaker || {});
