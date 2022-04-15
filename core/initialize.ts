import { InitializeWarehouse, Get, Set, Watch, Readonly} from './packages'

@InitializeWarehouse
class initStore {

    public target; config; initialize: Target = 0
    constructor(target: Target, config: Configure) {
        this.target = target;
        this.config = config
    }

    @Readonly
    @Get
    getState(...[,,]) {}
    
    @Readonly
    @Set
    setState(...[,,]){}

    @Readonly
    @Watch
    watch(...[,,,]){}
}

module.exports = (target: Target, config: Configure) => {
    return new initStore(target, config)
}