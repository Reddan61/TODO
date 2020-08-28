import {ActionsTypes, ThunkActionType} from "./store";

const CHANGEISSETTINGS = "CHANGE_IS_SETTINGS";


let initialState = {
  isSettings:false
};

type initialStateType = typeof initialState;
type actionsType = ActionsTypes<typeof actions>

export const FolderReducer = (state = initialState,action:actionsType):initialStateType => {
    switch (action.type) {
        case "CHANGE_IS_SETTINGS":
            return {
                ...state,
                isSettings: action.bool?action.bool:!state.isSettings
            };
        default:
            return state;
    }
};


const actions = {
    changeIsSettingsAC: (bool?:boolean) => ({type:CHANGEISSETTINGS, bool})
};



export const changeIsSettingsThunk = (bool?:boolean): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.changeIsSettingsAC());
    }
};