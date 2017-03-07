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
        }
        init(canvas);
    }

    // inherit from cardmaker.DrawableContainer.
    Stage.prototype = Object.create(cardmaker.DrawableContainer.prototype);
    Stage.prototype.constructor = Stage;

    // add Stage to namespace.
    cardmaker.Stage = Stage;

})(this, this.document, this.cardmaker = this.cardmaker || {});
