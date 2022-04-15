module.exports = (prototies: Target) => {    
    prototies.prototype.proxyState = {}
    prototies.prototype.callbacks = []
    prototies.prototype.flushCallbacks = () => {

    }
}