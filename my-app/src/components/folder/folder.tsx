import React, {useState} from "react";
import css from "./folder.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import FolderItem from "../folderItem/folderItem";
import {
    addNewSubFolderThunk,
    deleteFolderThunk,
    setFolderIdForDeleteSubFoldersThunk
} from "../redux/Reducer";

const Folder: React.FC<mapStateToPropsType & otherPropsType & mapDispatchToPropsType> = (props) => {
    const [isOpen, ChangeOpen] = useState(false);
    const [isOpenSettings, ChangeOpenSettings] = useState(false);
    const [isAddingNewSubFolder, setAddingNewSubFolder] = useState(false);
    const [inputText, setInputText] = useState("");

    return <div onLoad={() => {
        if (props.folder!.Subfolders === null) {
            props.setFolderIdForDeleteSubFoldersThunk(null);
        }
    }} className={`${css.folder} ${props.isDeletingFolders ? css.folder_delete : ''}`} onClick={() => {
        if (props.isDeletingFolders) {
            props.deleteFolderThunk(props.folder!.id)
        }
    }}>
        <div className={`${css.folder__name} ${props.isDeletingFolders ? css.folder__name_delete : ''}`}>
            <div onClick={() => {
                ChangeOpen(!isOpen);
            }} className={isOpen ? css.folder__plus_active : css.folder__plus}>
            </div>
            <span>{props.folder!.name}
            </span>
            <div className={css.folder__settings} onClick={() => {
                ChangeOpen(true);
                ChangeOpenSettings(!isOpenSettings)
            }}>
                <span>
                </span>
            </div>
        </div>
        {isOpenSettings && <div className={css.settings__list}>
            <ul>
                <li onClick={() => {
                    ChangeOpen(true);
                    ChangeOpenSettings(false);
                    setAddingNewSubFolder(true);
                }}>Добавить
                </li>

                {props.ChangedFolderIdForDeleteSubFolders === props.folder!.id && props.folder!.Subfolders !== null ?
                    <li
                        onClick={() => {
                            ChangeOpen(true);
                            ChangeOpenSettings(false);
                            props.setFolderIdForDeleteSubFoldersThunk(null);
                        }
                        }
                    >
                        Отмена
                    </li> : <li onClick={() => {
                        ChangeOpen(true);
                        props.setFolderIdForDeleteSubFoldersThunk(props.folder!.id);
                        ChangeOpenSettings(false);
                    }
                    }>Удалить</li>}

            </ul>
        </div>}

        {isOpen && <div className={css.folder__items}>

            {props.folder!.Subfolders && props.folder!.Subfolders.map((el, index) => <FolderItem SubFolder={el}
                                                                                                 id={props.folder!.id}
                                                                                                 key={el.id + index}/>)}
        </div>}

        {isAddingNewSubFolder && <input autoFocus onChange={
            (e) => {
                setInputText(e.target.value)
            }
        } value={inputText} onBlur={() => {
            if (inputText !== '') {
                setAddingNewSubFolder(false);
                props.addNewSubFolderThunk(props.folder!.id, inputText);
                setInputText('');
            } else {
                setAddingNewSubFolder(false);
            }
        }}/>}
    </div>
};

let mapStateToProps = (state: StateType) => {
    return {
        ChangedFolderIdForDeleteSubFolders: state.FolderPage.ChangedFolderIdForDeleteSubFolders,
        isDeletingFolders: state.FolderPage.isDeletingFolders
    }
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type otherPropsType = {
    folder: {
        id: number,
        name: string,
        Subfolders: Array<{
            id: number
            name: string
        }> | null
    } | null
}
type mapDispatchToPropsType = {
    addNewSubFolderThunk: (id: number, name: string) => void,
    setFolderIdForDeleteSubFoldersThunk: (idFolder: number | null) => void
    deleteFolderThunk: (idFolder: number | null) => void
}
export default React.memo(compose(
    connect(mapStateToProps, {addNewSubFolderThunk, setFolderIdForDeleteSubFoldersThunk, deleteFolderThunk})
)(Folder));