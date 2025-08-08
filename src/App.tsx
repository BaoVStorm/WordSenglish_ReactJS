import BasicExample from '@/components/temp';

// Redux hooks
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { increment } from './redux/slices/counterSlices';

function App() {
    const dispatch = useAppDispatch();
    const count = useAppSelector((state) => state.counter.value);

    return (
        <>
            <div className="card">
                <button onClick={() => dispatch(increment())}>count is {count}</button>

                <BasicExample />
            </div>
        </>
    );
}

export default App;
