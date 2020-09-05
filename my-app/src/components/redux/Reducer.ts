import {ActionsTypes, ThunkActionType} from "./store";
import {act} from "react-dom/test-utils";

const ADDNEWFOLDER = "ADD_NEW_FOLDER";
const GETFOLDERS = "GET_FOLDERS";
const GETTASKS = "GET_TASKS";
const SETFOLDERS = "SET_FOLDERS";
const SETTASKS = "SET_TASKS";
const ADDNEWSUBFOLDER = "ADD_NEW_SUBFOLDER";
const ADDNEWTASK = "ADD_NEW_TASK";
const ChangeFolderId = "CHANGE_FOLDER_ID";
const deleteSubFolder = "DELETE_SUBFOLDER";
const ChangeFolderIdForDeleteSubFolders = "CHANGE_FOLDER_ID_FOR_DELETE_SUBFOLDERS";
const deleteFolder = "DELETE_FOLDER";
const setDeletingFolders = "SET_DELETING_FOLDERS";

let initialState = {
    isDeletingFolders: false,
    ChangedFolderId: null as null | number,
    ChangedSubFolderId: null as null | number,
    folders: null as FoldersType | null,
    tasks: null as tasksType | null,
    ChangedFolderIdForDeleteSubFolders: null as null | number
};

type initialStateType = typeof initialState;
type actionsType = ActionsTypes<typeof actions>

export const Reducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case "ADD_NEW_FOLDER":
            return {
                ...state,
                folders: state.folders !== null ? [...state.folders!, {
                    id: state.folders[state.folders!.length - 1].id + 1,
                    name: action.payload.name,
                    Subfolders: null
                }] : [{
                    id: 0,
                    name: action.payload.name,
                    Subfolders: null
                }]

            };
        case "GET_FOLDERS":
            return {
                ...state,
                folders: action.payload.folders
            };
        case "GET_TASKS":
            return {
                ...state,
                tasks: action.payload.tasks
            };
        case "SET_FOLDERS":
            localStorage.setItem("folders", JSON.stringify(state.folders));
            return {...state};
        case "SET_TASKS":
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
            return {...state};
        case "ADD_NEW_SUBFOLDER":
            return {
                ...state,
                folders: state.folders!.map(el => {
                    if (el.id === action.payload.id) {
                        if (el.Subfolders) {
                            el.Subfolders = [...el.Subfolders, {
                                id: el.Subfolders.length + 1,
                                name: action.payload.name,
                            }]
                        } else {
                            el.Subfolders = [{id: 0, name: action.payload.name}]
                        }
                    }
                    return el
                })
            };
        case "ADD_NEW_TASK":
            return {
                ...state,
                tasks: state.tasks ? [...state.tasks, {
                    title: action.payload.title,
                    text: action.payload.text,
                    idFolder: state.ChangedFolderId!,
                    idSubFolder: state.ChangedSubFolderId!
                }] : [{
                    title: action.payload.title,
                    text: action.payload.text,
                    idFolder: state.ChangedFolderId!,
                    idSubFolder: state.ChangedSubFolderId!
                }]
            };
        case "CHANGE_FOLDER_ID":
            return {
                ...state,
                ChangedFolderId: action.payload.idFolder,
                ChangedSubFolderId: action.payload.idSubFolder
            };
        case "DELETE_SUBFOLDER":
            let isEmptyChangedSubFolderOfFolder = false;
            let Folders: FoldersType = state.folders!.map(el => {
                if (el.id === state.ChangedFolderIdForDeleteSubFolders) {
                    let newSubFolders = Object.assign({}, el);
                    newSubFolders.Subfolders = el.Subfolders!.filter(el => {
                        return el.id !== action.payload.idSubFolder
                    });
                    if (newSubFolders.Subfolders.length === 0) {
                        isEmptyChangedSubFolderOfFolder = true;
                        newSubFolders.Subfolders = null;
                    }
                    return newSubFolders;
                }
                return el
            });

            return {
                ...state,
                folders: Folders,
                ChangedSubFolderId: state.ChangedSubFolderId === action.payload.idSubFolder ? null : state.ChangedSubFolderId,
                tasks: state.tasks !== null ? state.tasks!.filter(el => {
                    return el.idSubFolder !== action.payload.idSubFolder
                }) : state.tasks,
                ChangedFolderIdForDeleteSubFolders: isEmptyChangedSubFolderOfFolder ? null : state.ChangedFolderIdForDeleteSubFolders
            };
        case "DELETE_FOLDER":
            let newFolders: null | FoldersType = state.folders!.filter(el => {
                return el.id !== action.payload.idFolder
            });
            if (newFolders.length === 0) {
                newFolders = null;
            }
            return {
                ...state,
                folders: newFolders,
                tasks: state.tasks !== null ? state.tasks.filter(el => {
                    return el.idFolder !== action.payload.idFolder
                }) : state.tasks,
                ChangedFolderId: state.ChangedFolderId === action.payload.idFolder ? null : state.ChangedFolderId,
                ChangedSubFolderId: null
            };
        case "CHANGE_FOLDER_ID_FOR_DELETE_SUBFOLDERS":
            return {
                ...state,
                ChangedFolderIdForDeleteSubFolders: action.payload.idFolder
            };
        case "SET_DELETING_FOLDERS":
            return {
                ...state,
                isDeletingFolders: !state.isDeletingFolders
            };
        default:
            return state;
    }
};


const actions = {
    addNewFolderAC: (name: string) => ({type: ADDNEWFOLDER, payload: {name}} as const),
    getFoldersAC: (folders: FoldersType | null) => ({type: GETFOLDERS, payload: {folders}} as const),
    getTasksAC: (tasks: tasksType | null) => ({type: GETTASKS, payload: {tasks}} as const),
    setFoldersAC: () => ({type: SETFOLDERS} as const),
    setTasksAC: () => ({type: SETTASKS} as const),
    setChangedFolderIdAC: (idFolder: number, idSubFolder: number) => ({
        type: ChangeFolderId,
        payload: {idFolder, idSubFolder}
    } as const),
    addNewSubFolderAC: (id: number, name: string) => ({type: ADDNEWSUBFOLDER, payload: {id, name}} as const),
    addNewTaskAC: (title: string, text: string) => ({type: ADDNEWTASK, payload: {text, title}} as const),
    deleteSubFolderAC: (idSubFolder: number) => ({type: deleteSubFolder, payload: {idSubFolder}} as const),
    changeFolderIdForDeleteSubFoldersAC: (idFolder: number | null) => ({
        type: ChangeFolderIdForDeleteSubFolders,
        payload: {idFolder}
    } as const),
    deleteFolderAC: (idFolder: number | null) => ({
        type: deleteFolder,
        payload: {idFolder}
    } as const),
    setDeletingFoldersAC: () => ({type: setDeletingFolders} as const),
};

export const setDeletingFoldersThunk = (): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.setDeletingFoldersAC());
    }
};

export const addNewFolderThunk = (name: string): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.addNewFolderAC(name));
        dispatch(actions.setFoldersAC());
    }
};
export const setChangedFolderIdThunk = (idFolder: number, idSubFolder: number): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.setChangedFolderIdAC(idFolder, idSubFolder));
    }
};

export const addNewSubFolderThunk = (id: number, name: string): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.addNewSubFolderAC(id, name));
        dispatch(actions.setFoldersAC());
    }
};

export const addNewTaskThunk = (title: string, text: string): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.addNewTaskAC(title, text));
        dispatch(actions.setTasksAC());
    }
};

export const setFolderIdForDeleteSubFoldersThunk = (idFolder: number | null): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.changeFolderIdForDeleteSubFoldersAC(idFolder));
    }
};

export const deleteFolderThunk = (idFolder: number | null): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.deleteFolderAC(idFolder));
        dispatch(actions.setFoldersAC());
        dispatch(actions.setTasksAC());
    }
};
export const deleteSubFolderThunk = (idSubFolder: number): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actions.deleteSubFolderAC(idSubFolder));
        dispatch(actions.setFoldersAC());
        dispatch(actions.setTasksAC());
    }
};

export const getFoldersThunk = (): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        let folders = localStorage.getItem('folders');
        if (folders) {
            dispatch(actions.getFoldersAC(JSON.parse(folders)))
        } else {
            dispatch(actions.getFoldersAC(null))
        }

    }
};
export const getTasksThunk = (): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            dispatch(actions.getTasksAC(JSON.parse(tasks)))
        } else {
            dispatch(actions.getTasksAC(null))
        }

    }
};


export type FoldersType = Array<{
    id: number,
    name: string,
    Subfolders: Array<{
        id: number,
        name: string
    }> | null
}>


type tasksType = Array<{
    idSubFolder: number,
    idFolder: number,
    title: string,
    text: string
}> | null