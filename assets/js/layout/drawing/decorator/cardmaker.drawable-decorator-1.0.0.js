(function(window, document, cardmaker, undefined) {
    "use strict";

    /**
     * The DrawableDecorator acts as a base decorator from which concrete decorators can inherit.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     * @see {@link https://www.joezimjs.com/javascript/javascript-design-patterns-decorator/}
     */
    function DrawableDecorator(drawable) {
        /**
         * A reference to this object.
         *
         * @typedef {DrawableDecorator}
         * @private
         */
        var self = this;

        /**
         * The drawable to decorate.
         *
         * @typedef {cardmaker.Drawable}
         * @private
         */
        self.drawable;

        /**
         * Initialize the DrawableDecorator.
         *
         * @param {cardmaker.Drawable} drawable The drawable to decorate.
         */
        function init(drawable) {
            if (!(drawable instanceof cardmaker.Drawable)) {
                throw new TypeError('DrawableDecorator expects a cardmaker.Drawable object.');
            }

            // call parent constructor.
            cardmaker.Drawable.call(self);

            self.drawable = drawable;
        }
        init(drawable);
    }

    // inherit from cardmaker.Drawable.
    DrawableDecorator.prototype = Object.create(cardmaker.Drawable.prototype);
    DrawableDecorator.prototype.constructor = DrawableDecorator;

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.draw = function(canvas) {
        this.drawable.draw(canvas);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.onDraw = function(canvas) {
        this.drawable.onDraw(canvas);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.invalidate = function() {
        this.drawable.invalidate();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.isValid = function() {
        return this.drawable.isValid();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.setParent = function(parent) {
        this.drawable.setParent(parent);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.getParent = function() {
        return this.drawable.getParent();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.getBounds = function() {
        return this.drawable.getBounds();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.getLocalBounds = function() {
        return this.drawable.getLocalBounds();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.setX = function(x) {
        this.drawable.setX(x);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.getX = function() {
        return this.drawable.getX();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.setY = function(y) {
        this.drawable.setY(y);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.getY = function() {
        return this.drawable.getY();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.setWidth = function(width) {
        this.drawable.setWidth(width);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.getWidth = function() {
        return this.drawable.getWidth();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.setHeight = function(height) {
        this.drawable.setHeight(height);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.getHeight = function() {
        return this.drawable.getHeight();
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.localToGlobal = function(point) {
        return this.drawable.localToGlobal(point);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.globalToLocal = function(point) {
        return this.drawable.globalToLocal(point);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.onPropertyChange = function(event) {
        this.drawable.onPropertyChange(event);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.dispatch = function(event) {
        this.drawawble.dispatch(this.dispatcher, args);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.on = function(event, handler, priority, once) {
        return this.drawable.on(event, handler, priority, once);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.one = function(event, handler, priority) {
        return this.drawable.one(event, handler, priority);
    }

    /**
     * @inheritdoc
     */
    DrawableDecorator.prototype.off = function(event, handler) {
        return this.drawable.off(event, handler);
    }

    // add DrawableDecorator to namespace.
    cardmaker.DrawableDecorator = DrawableDecorator;

})(this, this.document, this.cardmaker = this.cardmaker || {});
