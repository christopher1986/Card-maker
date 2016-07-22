(function(window, document, cardmaker, undefined) {
    "use strict";
    
    /**
     * The Lock is an access control mechanism for resources or operations.
     *
     * @author Chris Harris <c.harris@hotmail.com>
     * @version 1.0.0
     * @since 1.0.0
     */
    function Lock(locked) {
        /**
         * A reference to this object.
         *
         * @typedef {Lock}
         * @private
         */
        var self = this;
        
        /**
         * The lock state.
         *
         * @type {Boolean}
         * @public
         */
        self.locked = false;
        
        /**
         * Initialize the Lock.
         *
         * @param {Boolean} locked - the initial lock state.
         * @private
         */
        function init(locked) {
            self.locked = (typeof locked === 'boolean') ? locked : false;
        }
        init(locked);
    }
    
    /**
     * Acquires the lock.
     *
     * @public
     */
    Lock.prototype.lock = function() {
        this.locked = true;
    }
    
    /**
     * Acquire the lock only if is free at the time of invocation.
     *
     * @return {Boolean} true if the lock was acquired, otherwise false.
     */
    Lock.prototype.tryLock = function() {
        var acquirable = (this.isLocked() === false);
        if (acquirable) {
            this.lock();
        }
        
        return acquirable;
    }
        
    /**
     * Release the lock.
     *
     * @public
     */
    Lock.prototype.unlock = function() {
        this.locked = false;
    }
    
    /**
     * Returns true if the lock is active.
     *
     * @return {Boolean} true if the lock is active, otherwise false.
     * @public
     */
    Lock.prototype.isLocked = function() {
        return (this.locked === true);
    }
    
    // add Lock to namespace.
    cardmaker.Lock = Lock;

})(this, this.document, this.cardmaker = this.cardmaker || {});
