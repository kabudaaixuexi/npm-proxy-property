
import Counter  from '../core/index'

beforeAll(()=>{
    console.log('开始进行jest测试')
})

// describe("关于每个功能或某个组件的单元测试",()=>{
//     // 不同用例的单元测试
//     test('测试counter中addOne方法',()=>{
//         // Counter.test();
//         expect(Counter.test()).toBe('111')
//     })
// })
// describe('异步操作测试',  () => {
//     function foo(callback: Function) {
//         console.log('foo...')
//         setTimeout(() => {
//             callback && callback();
//         }, 1000)
//     }
//     it('异步测试', (done) => {
//         function bar() {
//             console.log('bar..')
//             done();
//         }
//         foo(bar);
//     });
// });

describe('测试__', () => {
    test('测试__Observable', ()=>{
        const s = Counter({
            initdata: {
                name: 'ningrui '
            }
        },{
            usePersisted: false
        })
        s.setState({casc:'aaa'})
        s.watch('casc', (ne: any, old: any) => {
            console.log('第一个监听', ne, old);
        }, false)
        s.watch('casc', (ne: any, old: any) => {
            console.log('第二个监听', ne, old);
        }, false)
        s.watch('initdata', (ne: any, old: any) => {
            console.log(ne, old);
        }, false)
        s.setState({casc:'bbb'})
        s.setState({initdata:'aaa'})
        console.log(s.getState('casc'));
        console.log(s.getState('initdata'));
        
    })
})
