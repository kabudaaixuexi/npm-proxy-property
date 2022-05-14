import { initStore } from './initialize'

export default (
    target: Target,
    config:Configure = {
        usePersisted: false,
        useDecorator: false
    }
) => new initStore(target, config)