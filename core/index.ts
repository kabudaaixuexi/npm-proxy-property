const creatStore = require('./initialize')

export default (
    target: Target,
    config:Configure = {
        usePersisted: false,
        useDecorator: false
    }
) => creatStore(target, config)