import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { gitReducer } from './reducer/git';
import { AuthReducer } from './reducer/auth';
import { TodoReducer } from './reducer/data';
import { EmployeeReducer } from './reducer/employeeList';
import { ProductReducer } from './reducer/product';

import { AuthEpic } from './epic/auth';
import { gitEpic } from './epic/git';
import { TodoEpic } from './epic/data';
import { EmployeeEpic } from './epic/employeeList';
import { ProductEpic } from './epic/product';


//combine epic
const rootEpic = combineEpics(
    gitEpic.getUserData,
    AuthEpic.signup,
    AuthEpic.writeUser,
    AuthEpic.login,
    AuthEpic.isLogin,
    AuthEpic.logout,
    AuthEpic.getProfile,
    AuthEpic.getProfileCancel,

    TodoEpic.addTodo,
    TodoEpic.getTodos,
    TodoEpic.getTodosCancel,
    TodoEpic.updateTodo,
    TodoEpic.deleteTodo,

    EmployeeEpic.getEmployees,
    EmployeeEpic.getEmployeesCancel,
    EmployeeEpic.addEmployee,
    EmployeeEpic.updateEmployee,
    EmployeeEpic.deleteEmployee,

    ProductEpic.addProduct,
    ProductEpic.updateProduct,
    ProductEpic.deleteProduct,
    ProductEpic.getProducts,
    ProductEpic.getProductsCancel,
);
//combine reducers
const rootReducer = combineReducers({
    gitReducer,
    AuthReducer,
    TodoReducer,
    EmployeeReducer,
    ProductReducer
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store
export let store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)