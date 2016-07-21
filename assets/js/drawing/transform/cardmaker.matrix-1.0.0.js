(function(window, document, cardmaker, undefined) {
    
    /**
     * The TransformChangedEvent contains information about changes made to a transformation matrix.
     *
     * @author Chris Harris <c.haris@hotmail.com>
     * @version 1.0.0
     * @since 1.1.0
     */
    function TransformChangedEvent(type, context) {
        /**
         * A reference to this object.
         *
         * @typedef {TransformEvent}
         * @private
         */
        var self = this;

        /**
         * The transformation context.
         *
         * @type {Number}
         * @public
         */
        self.context = 0x00;
        
        /**
         * Initialize the TransformEvent.
         *
         * @param {String} type - the event type.
         * @param {Number} context - the transformation context.
         * @private 
         */
        function init(type, context) {
            // call parent constructor.
            cardmaker.Event.call(self, type);
            
            self.context = (cardmaker.NumberUtil.isInt(context)) ? context : 0x00;
        }
        init(type, context);
    }
    
    // inherit from cardmaker.Event. 
    TransformChangedEvent.prototype = Object.create(cardmaker.Event.prototype);
    TransformChangedEvent.prototype.constructor = TransformChangedEvent;
    
    /**
     * A constant that defines the 'translate' context.
     *
     * @type {Number}
     * @constant
     * @public
     */
    TransformChangedEvent.MATRIX_TRANSLATE = 0x01;
    
    /**
     * A constant that defines the 'scale' context.
     *
     * @type {Number}
     * @constant
     * @public
     */
    TransformChangedEvent.MATRIX_SCALE = 0x02;
    
    /**
     * A constant that defines the 'skew' context.
     *
     * @type {Number}
     * @constant
     * @public
     */
    TransformChangedEvent.MATRIX_SKEW = 0x04;
    
    /**
     * A constant that defines the 'rotate' context.
     *
     * @type {Number}
     * @constant
     * @public
     */
    TransformChangedEvent.MATRIX_ROTATE = 0x08;
    
    /**
     * A constant that defines the 'identity' context.
     *
     * @type {Number}
     * @constant
     * @public
     */
    TransformChangedEvent.MATRIX_IDENTITY = 0x10;
    
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
         * @typedef {cardmaker.Matrix}
         * @private
         */
        var self = this;

        /**
         * The EventDispatcher.
         *
         * @typedef {EventDispatcher}
         * @public
         */
        self.dispatcher = new cardmaker.EventDispatcher();

        /**
         * The horizontal scaling value.
         *
         * @type {Number}
         * @private
         */        
        self.a = 1;

        /**
         * The horizontal skewing value.
         *
         * @type {Number}
         * @private
         */        
        self.b = 0;

        /**
         * The vertical skewing value.
         *
         * @type {Number}
         * @private
         */        
        self.c = 0;

        /**
         * The vertical scaling value.
         *
         * @type {Number}
         * @private
         */        
        self.d = 1;

        /**
         * The horizontal moving value.
         *
         * @type {Number}
         * @private
         */        
        self.tx = 0;
        
        /**
         * The vertical moving value.
         *
         * @type {Number}
         * @private
         */
        self.ty = 0;
    }
    
    /**
     * Applies a movement to the matrix.
     *
     * @param {Number} tx - (optional) the horizontal movement value.
     * @param {Number} ty - (optional) the vertical movement value.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#Translating}
     * @public
     */
    Matrix.prototype.translate = function(tx, ty) {
        this.tx = (cardmaker.NumberUtil.isNumeric(tx)) ? tx : this.tx;
        this.ty = (cardmaker.NumberUtil.isNumeric(ty)) ? ty : this.ty;
        
        this.dispatch(new TransformChangedEvent('changed', TransformChangedEvent.MATRIX_TRANSLATE));
    }
    
    /**
     * Applies a scale to the matrix.
     *
     * @param {Number} sx - (optional) the horizontal scaling value.
     * @param {NUmber} sy - (optional) the vertical scaling value.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#Scaling}
     * @public
     */
    Matrix.prototype.scale = function(sx, sy) {
        this.a = (cardmaker.NumberUtil.isNumeric(sx)) ? sx : this.a;
        this.d = (cardmaker.NumberUtil.isNumeric(sy)) ? sy : this.d;
        
        this.dispatch(new TransformChangedEvent('changed', TransformChangedEvent.MATRIX_SCALE));
    }
    
    /**
     * Applies a skew to the matrix.
     *
     * @param {Number} sx - (optional) the horizontal skew value.
     * @param {NUmber} sy - (optional) the vertical skew value.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#Transforms}
     * @public
     */
    Matrix.prototype.skew = function(sx, sy) {
        this.b = (cardmaker.NumberUtil.isNumeric(sx)) ? sx : this.b;
        this.c = (cardmaker.NumberUtil.isNumeric(sy)) ? sy : this.c;
        
        this.dispatch(new TransformChangedEvent('changed', TransformChangedEvent.MATRIX_SKEW));
    }
    
    /**
     * Applies a rototation to the matrix.
     *
     * The angle by which to rotate the transformation matrix is expressed in radians, not degrees. So if necessary 
     * use the {@link cardmaker.Converter#degreesToRadians} method to convert an angle in degrees into radians.
     *
     * @param {Number} radians - the angle in radians.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#Rotating}
     * @public
     */
    Matrix.prototype.rotate = function(radians) {     
        var sin = Math.sin(radians);
        var cos = Math.cos(radians);
    
        this.a = cos;
        this.b = sin;
        this.c = -sin;
        this.d = cos;
        
        this.dispatch(new TransformChangedEvent('changed', TransformChangedEvent.MATRIX_ROTATE));
    }
    
    /**
     * Set each matrix property to a value that causes no transformation.
     * Such a matrix is also known as a unit or identity matrix.
     *
     * @public
     */
    Matrix.prototype.identity = function() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        
        this.dispatch(new TransformChangedEvent('changed', TransformChangedEvent.MATRIX_IDENTITY));
    }
    
    /**
     * Returns true if the matrix represents an identity matrix.
     *
     * @return {Boolean} true if the matrix is an identity matrix, otherwise false.
     */
    Matrix.prototype.isIdentity = function () {
        return (this.a === 1 && this.b === 0 && this.c == 0 &&
                this.d === 1 && this.tx === 0 && this.ty === 0);
    }
    
    /**
     * Dispatch event for the specified callee.
     *
     * @param {Event|string} event - Event object or string containing the event type.
     * @param {...*} additional paramaters to pass along to the event handler.
     */
    Matrix.prototype.dispatch = function(event) {
        var args = cardmaker.ArrayUtil.copy(arguments);
            args.unshift(this);

        this.dispatcher.dispatch.apply(this.dispatcher, args);
    } 
    
    /**
     * Add the specified change listener to the matrix.
     *
     * @param {Callback} listener - the listener to add.
     * @return {cardmaker.Matrix} provides a fluent interface which allows multiple handlers to be attached.
     * @public
     */
    Matrix.prototype.addChangeListener = function(listener) {
        this.dispatcher.on('changed', listener);
        return this;
    }
    
    /**
     * Remove the specified change listener from the matrix.
     *
     * @param {Callback} listener - the listener to remove.
     * @return {cardmaker.Matrix} provides a fluent interface which allows multiple handlers to be detached.
     * @public
     */
    Matrix.prototype.removeChangeListener = function(listener) {
        this.dispatcher.off('changed', listener);
        return this;
    }
    
    // add Matrix to namespace.
    cardmaker.Matrix = Matrix;

})(this, this.document, this.cardmaker = this.cardmaker || {});
