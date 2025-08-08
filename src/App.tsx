import BasicExample from '@/components/temp';

// Redux hooks
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { increment } from './redux/slices/counterSlices';

// routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const dispatch = useAppDispatch();
    const count = useAppSelector((state) => state.counter.value);

    return (
        <Router>
                <div className="card">
                    <button onClick={() => dispatch(increment())}>count is {count}</button>

                    <BasicExample />
                </div>
        </Router>
    );
}

export default App;
