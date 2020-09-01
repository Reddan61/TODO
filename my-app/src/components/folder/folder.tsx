import React, {useState} from "react";
import css from "./foldersItems.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import FolderItem from "../folderItem/folderItem";
import {addNewSubFolderThunk} from "../redux/FolderReducer";

const Folder: React.FC<mapStateToPropsType & otherPropsType & mapDispatchToPropsType> = (props) => {

    const [isOpen, ChangeOpen] = useState(false);
    const [isOpenSettings, ChangeOpenSettings] = useState(false);
    const [isAddingNewSubFolder, setAddingNewSubFolder] = useState(false);
    const [inputText, setInputText] = useState("");
    debugger
    return <div className={css.folder}>
        <div className={css.folder__name}>
            <div onClick={() => {
                ChangeOpen(!isOpen);
            }} className={isOpen ? css.folder__plus_active : css.folder__plus}>
            </div>
            <span>{props.folder!.name}</span>
            <div className={css.folder__settings} onClick={() => {
                ChangeOpenSettings(!isOpenSettings)
            }}>
                <span></span>
            </div>
            {isOpenSettings && <ul className={css.settings__list}>
                <li onClick={() => {
                    ChangeOpen(true);
                    ChangeOpenSettings(false);
                    setAddingNewSubFolder(true);
                }}>Добавить</li>
                <li>Удалить</li>
            </ul>}

        </div>
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
            setAddingNewSubFolder(false);
            props.addNewSubFolderThunk(props.folder!.id, inputText);
            setInputText('');
        }}/>}
    </div>
};

let mapStateToProps = (state: StateType) => {
    return {}
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
    addNewSubFolderThunk: (id: number, name: string) => void
}
export default compose(
    connect(mapStateToProps, {addNewSubFolderThunk})
)(Folder);