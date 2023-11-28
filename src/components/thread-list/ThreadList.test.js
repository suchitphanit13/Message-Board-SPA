import {screen, render} from "@testing-library/react";
import {ThreadList} from "./ThreadList";

test(
    'should render a Thread comp for each item in the list prop',
    () => {
        const _useSelector = ((fn) => fn({
            threadList: [1, 2, 3, 4]
        }))
        const _Thread = () => {
            return <div>MOCK</div>
        }
        render(<ThreadList _useSelector={_useSelector} _Thread={_Thread}/>)
        const threadComps = screen.getAllByText('MOCK')
        expect(threadComps.length).toBe(4)
    }
)

test(
    'should pass correct Thread prop to each thread comp',
    () => {
        const _useSelector = ((fn) => fn({
            threadList: [1]
        }))
        let threadProp;
        const _Thread = ({thread}) => {
            threadProp = thread;
            return <div>MOCK</div>
        }
        render(<ThreadList _useSelector={_useSelector} _Thread={_Thread}/>)
        expect(threadProp).toBe(1)
    }
)

test(
    'should sort threads by  ascending date property',
    () => {
        const date1 = new Date('01/15/2021')
        const date2 = new Date('06/15/2022')
        const date3 = new Date('03/07/2020')
        const _useSelector = ((fn) => fn({
            threadList: [{date: date1}, {date: date2}, {date: date3}]
        }))
        let sortList = []
        const _Thread = ({thread}) => {
            sortList.push(thread.date)
            return <div>MOCK</div>
        }
        render(<ThreadList _useSelector={_useSelector} _Thread={_Thread}/>)
        expect(sortList).toStrictEqual([date3, date1, date2])
    }
)


