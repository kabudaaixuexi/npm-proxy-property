import { InitializeWarehouse, Get, Set, Watch, Readonly} from './packages'
@InitializeWarehouse
export class initStore {

    public target;proxyState; config; initialize: Target = 0
    constructor(target: Target, config: Configure) {
        this.target = target;
        this.proxyState = target
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

    testInitialize() {
        this.initialize ++
    }
}