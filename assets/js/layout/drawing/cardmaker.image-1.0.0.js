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
         * A flag that indicates if the image has been loaded.
         *
         * @type {Boolean}
         * @public
         */
        self.loaded = false;
        
        /**
         * Initialize the Image.
         *
         * @param {String} src - the URL of an image.
         * @private
         */
        function init(src) {      
            // call parent constructor.
            cardmaker.Drawable.call(self);
        
            self.image = new window.Image();
            self.image.onload = function(event) {
                self.loaded = true;                
                self.invalidate.call(self);
            };
            self.image.src = src;
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
        if (!this.loaded) {
            return; // still loading image.
        }
        
        // center the image.
        var x = (canvas.width / 2) - (this.image.width / 2);
        var y = (canvas.height / 2) - (this.image.height / 2);
    
        var ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, x, y);
    }
    
    // add Image to namespace.
    cardmaker.Image = Image;

})(this, this.document, this.cardmaker = this.cardmaker || {});
