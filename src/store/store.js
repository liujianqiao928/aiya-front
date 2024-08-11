import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// 示例 Reducer
const exampleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EXAMPLE_ACTION':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

// 合并多个 Reducer
const rootReducer = combineReducers({
    example: exampleReducer,
    // 其他 reducer 可以继续添加
});

// 创建 Redux Store
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // 使用 thunk 中间件并集成 Redux DevTools
);

export default store;
