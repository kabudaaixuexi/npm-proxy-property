export default (prototies: Target) => {    
    prototies.prototype.proxyState = {}
    prototies.prototype.callbacks = []
    prototies.prototype.flushCallbacks = () => {

    }
}