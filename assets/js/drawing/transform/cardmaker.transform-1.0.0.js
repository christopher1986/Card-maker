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
    
    Transform.prototype.translate(tx, ty) {
    
    }
    
    Transform.prototype.scale(sx, sy) {
    
    }
    
    Transform.prototype.rotate(degrees) {
    
    }
    
    /**
     * Set each matrix property to a value that causes no transformation.
     * These matrices are also known as a unit or identity matrix.
     *
     * @return void
     * @public
     */
    Transform.prototype.identity() {
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
