
console.log("2");

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// Application State IAppState
interface IAppState {
    TodoReducer
}
//requiring all reducers
import { TodoReducer } from './reducer/todo';

//requiring all epics
import { TodoEpic } from './epic/todo';

//combine epic
const rootEpic = combineEpics(
    TodoEpic.addTodo,
    TodoEpic.getTodos,
    TodoEpic.getTodosCancel,
    TodoEpic.markArchived,
    TodoEpic.deleteTodo,
);
//combine reducers
const rootReducer = combineReducers<IAppState>({
    TodoReducer
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store
export let store = createStoreWithMiddleware(rootReducer)
