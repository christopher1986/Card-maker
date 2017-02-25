(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The Image class represents an image that can be drawn onto a {@link cardmaker.Canvas} object.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Image(src) {
        /**
         * A reference to this object.
         *
         * @typedef {Image}
         * @private
         */
        var self = this;

        /**
         * The image to draw.
         *
         * @type {window.Image}
         * @public
         */
        self.image = null;

        /**
         * Initialize the Image.
         *
         * @param {String} src - the URL of an image.
         * @private
         */
        function init(image) {
            // call parent constructor.
            cardmaker.Drawable.call(self);

            if (!(image instanceof window.Image)) {
                throw new TypeError('Image expects a window.Image object.');
            }

            self.image = image;
            self.setWidth(image.width);
            self.setHeight(image.height);
            self.setX(0);
            self.setY(0);

            self.invalidate();
        }
        init(src);
    }

    // inherit from cardmaker.Drawable.
    Image.prototype = Object.create(cardmaker.Drawable.prototype);
    Image.prototype.constructor = Image;

    /**
     * Draw the image onto the specified {@link cardmaker.Canvas}.
     *
     * @param {cardmaker.Canvas} canvas - the canvas on which to draw.
     * @public
     */
    Image.prototype.onDraw = function(canvas) {
        var image = this.image;
        var bounds = this.getBounds();

        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, bounds.getMinX(), bounds.getMinY(), bounds.getWidth(), bounds.getHeight());
    }

    // add Image to namespace.
    cardmaker.Image = Image;

})(this, this.document, this.cardmaker = this.cardmaker || {});
