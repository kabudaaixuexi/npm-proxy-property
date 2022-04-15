import "reflect-metadata";
export declare function observer(target: any): any;
export declare const observable: (target: any, key: any) => void;
export declare const computed: (target: any, key: any, descriptor: any) => void;
export declare function autoRun(fn: Function): void;
