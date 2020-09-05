import {applyMiddleware, combineReducers, createStore, Action} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {Reducer} from "./Reducer";

let reducers = combineReducers({
    FolderPage:Reducer
});


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
window.store = store;




//thunk
export type ThunkActionType<AT extends Action,R = Promise<void>>
    = ThunkAction<R, ()=>StateType, unknown, AT>;


//action
export type ActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never



//state
type RootReducerType = typeof reducers;//Вернет новый стейт
export type StateType = ReturnType<RootReducerType>

export default store;
