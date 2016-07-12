(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Layer represents a single image, shape or other object on the canvas.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Layer(src, text) {
        /**
         * A reference to this object.
         *
         * @typedef {Layer}
         * @private
         */
        var self = this;
        
        /**
         * The image source.
         *
         * @type {String}
         * @public
         */
        self.src = '';
        
        /**
         * The layer text.
         *
         * @type {String}
         * @public
         */
        self.text = '';
        
        /**
         * Initialize the Layer.
         *
         * @param {String} src the image source.
         * @param {String} text the text to display.
         * @private
         */
        function init(src, text) {
            self.src  = (typeof src === 'string') ? src : '';
            self.text = (typeof text === 'string') ? text : '';
        }
        init(src, text);
    }
    
    /**
     * Return an {@link HTMLElement} that represents this layer.
     *
     * @return {HTMLElement} the element to display to the user.
     * @public
     */
    Layer.prototype.toHtml = function() {    
        var image = document.createElement('img');
        image.src = this.src;
        image.style.maxWidth = '100%';
        image.style.height = 'auto';
        image.style.width = 'auto';
        
        // thumbnail
        var leftCol = document.createElement('div');
        leftCol.className = 'column col-image';
        leftCol.appendChild(image);
        // text
        var rightCol = document.createElement('div');
        rightCol.className = 'column col-text';
        rightCol.appendChild(document.createTextNode(this.text));
        // row
        var row = document.createElement('div');
        row.className = 'row';
        row.appendChild(leftCol);
        row.appendChild(rightCol);
        // item
        var item = document.createElement('div');
        item.className = 'list-item layer-item';
        item.appendChild(row);
        
        return item;
    }
    
    /**
     * The LayerPanel displays the layers present on the canvas. A layer may hold an image, shape or any other object that the canvas can draw.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function LayerPanel(element) {
        /**
         * A reference to this object.
         *
         * @typedef {LayerPanel}
         * @private
         */
        var self = this;
        
        self.list = null;
        
        /**
         * Initialize the LayerPanel.
         *
         * @param {HTMLElement} element the HTML element.
         * @throws {TypeError} if the specified argument is not an HTMLElement.
         * @private
         */
        function init(element) {
            if (!(element instanceof window.HTMLElement)) {
                throw new TypeError('LayerPanel expects an HTMLElement.');
            }
            
            var layers = document.createElement('div');
                layers.className = 'layer-list'; 
            
            // call parent constructor.
            cardmaker.Panel.call(self, element.appendChild(layers));
            
            self.list = new cardmaker.SortableList(new cardmaker.ObservableList(layers));
        }
        init(element);
    }
    
    // inherit from cardmaker.Panel.
    LayerPanel.prototype = Object.create(cardmaker.Panel.prototype);
    LayerPanel.prototype.constructor = LayerPanel;

    /**
     * Set the canvas to which this panel will be attached.
     *
     * @param {cardmaker.Canvas} canvas the canvas to which this panel will be attached.
     * @throws {TypeError} if the specified argument is not a canvas.
     */
    LayerPanel.prototype.setCanvas = function(canvas) {
        var oldCanvas = this.getCanvas();
        if (oldCanvas instanceof cardmaker.Canvas) {
            oldCanvas.fileManager.off('upload-finished', this.onUploadFinished);
        }
        
        // call parent method.
        cardmaker.Panel.prototype.setCanvas.call(this, canvas);
        
        var canvas = this.getCanvas();
        if (canvas instanceof cardmaker.Canvas) {
            canvas.fileManager.on('upload-finished', this.onUploadFinished.bind(this));
        }
    }
    
    /**
     * Create a new layer for the newly created drawable.
     *
     * @param {ProgressEvent} event object containing details about this event.
     */
    LayerPanel.prototype.onUploadFinished = function(event) {
        var number = (this.list.size() + 1);
        var text   = cardmaker.StringUtil.format('Layer {0}', number);
        var layer  = new Layer(event.target.result, text);

        this.list.insert(0, layer.toHtml());
    }

    // add LayerPanel to namespace.
    cardmaker.LayerPanel = LayerPanel;
    
})(this, this.document, this.cardmaker = this.cardmaker || {});
