(function(window, document, cardmaker, undefined) {
    
    /**
     * The Matrix class is a transformation matrix that includes functions for translation (x and y reposition),
     * rotation, scaling and skewing. Together these four transformations are known as affine transformations. 
     *
     * A matrix that allows affine transformations can be illustrated through a 3 x 3 matrix and is surrounded
     * by two brackets. The properties of this matrix that influence the transformation are described by:
     *
     *   a c tx
     * [ b d ty ]
     *   0 0 1
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations}
     */
    function Matrix() {
        /**
         * A reference to this object.
         *
         * @typedef {Transform}
         * @private
         */
        var self = this;

        /**
         * The horizontal scaling value.
         *
         * @type {Number}
         * @public
         */        
        self.a = 1;

        /**
         * The horizontal skewing value.
         *
         * @type {Number}
         * @public
         */        
        self.b = 0;

        /**
         * The vertical skewing value.
         *
         * @type {Number}
         * @public
         */        
        self.c = 0;

        /**
         * The vertical scaling value.
         *
         * @type {Number}
         * @public
         */        
        self.d = 1;

        /**
         * The horizontal moving value.
         *
         * @type {Number}
         * @public
         */        
        self.tx = 0;
        
        /**
         * The vertical moving value.
         *
         * @type {Number}
         * @public
         */
        self.ty = 0;
    }
    
    /**
     * Applies a movement to the transformation matrix.
     *
     * @param {Number} tx the horizontal movement value.
     * @param {Number} ty the vertical movement value.
     * @link {@see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#Translating}
     * @public
     */
    Matrix.prototype.translate(tx, ty) {
        self.tx = tx;
        self.ty = ty;
    }
    
    /**
     * Applies a scale to the transformation matrix.
     *
     * @param {Number} sx the horizontal scaling value.
     * @param {NUmber} sy the vertical scaling value.
     * @link {@see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#Scaling}
     * @public
     */
    Matrix.prototype.scale(sx, sy) {
        self.a = sx;
        self.d = sy;
    }
    
    /**
     * Applies a rototation to the transformation matrix.
     *
     * The angle by which to rotate the transformation matrix is expressed in radians, not degress. So if necessary 
     * use the {@link cardmaker.Converter#degreesToRadians} method to convert an angle in degrees into radians.
     *
     * @param {Number} radians the angle in 
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#Rotating}
     * @public
     */
    Matrix.prototype.rotate(radians) {        
        var sin = Math.sin(radians);
        var cos = Math.cos(radians);
    
        self.a = cos;
        self.b = sin;
        self.c = -sin;
        self.d = cos;
    }
    
    /**
     * Set each matrix property to a value that causes no transformation.
     * These matrices are also known as a unit or identity matrix.
     *
     * @return void
     * @public
     */
    Matrix.prototype.identity() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.tx = 0
    }
    
    // add Transform to namespace.
    cardmaker.Transform = Transform;

})(this, this.document, this.cardmaker = this.cardmaker || {});
