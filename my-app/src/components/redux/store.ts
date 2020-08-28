import {applyMiddleware, combineReducers, createStore, Action} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {FolderReducer} from "./FolderReducer";

let reducers = combineReducers({
    FolderPage:FolderReducer
});

const store = createStore(reducers,applyMiddleware(thunk));


// @ts-ignore
window.store = store;

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
