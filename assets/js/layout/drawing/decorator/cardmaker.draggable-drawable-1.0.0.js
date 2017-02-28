(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The DraggableDrawable allows a drawable object to become draggable.
     *
     * This class provides additional functionality to a drawable object without
     * sub-classing it and is considered to be a much easier approach when new
     * features are needed to an object without altering the existing base code.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function DraggableDrawable(drawable) {
        /**
         * A reference to this object.
         *
         * @typedef {DraggableDrawable}
         * @private
         */
        var self = this;

        /**
         * Initialize the DraggableDrawable.
         *
         * @param {cardmaker.Drawable} drawable The drawable to decorate.
         */
        function init(drawable) {
            // call parent constructor.
            cardmaker.DrawableDecorator.call(self, drawable);
        }
        init(drawable);
    }

    // inherit from cardmaker.DrawableDecorator.
    DraggableDrawable.prototype = Object.create(cardmaker.DrawableDecorator.prototype);
    DraggableDrawable.prototype.constructor = DraggableDrawable;

    /**
     * Drag the drawable.
     */
    DraggableDrawable.prototype.drag = function() {
        console.log('Start dragging..');
    }

    // add DraggableDrawable to namespace.
    cardmaker.DraggableDrawable = DraggableDrawable;

})(this, this.document, this.cardmaker = this.cardmaker || {});
