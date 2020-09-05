import React, {useEffect, useState} from "react";
import css from "./Folders.module.css"
import Folder from "../folder/folder";
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import {addNewFolderThunk, setDeletingFoldersThunk} from "../redux/Reducer";

const Folders: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
    let [isAdding, ChangeAdd] = useState(false);
    let [inputText, ChangeTextInput] = useState('');
    return <div className={css.folders}>
        <div className={css.folders__items}>
            {props.folders}
            {isAdding && <input
                value={inputText}
                autoFocus
                onChange={(e) => ChangeTextInput(e.target.value)}
                onBlur={() => {
                    if (inputText !== "") {
                        ChangeAdd(false);
                        props.addNewFolderThunk(inputText);
                        ChangeTextInput('');
                    } else {
                        ChangeAdd(false);
                    }
                }}
            />}
        </div>
        <div className={css.folders__menu}>
            <button className={css.menu__add} onClick={() => ChangeAdd(true)}>Добавить папку</button>
            {props.isDeletingFolders ? <button className={css.menu__delete} onClick={ () => props.setDeletingFoldersThunk()}>Отмена</button> :
                <button className={css.menu__delete} onClick={ () => props.setDeletingFoldersThunk()}>Удалить папку</button>}
            {props.isDeletingFolders && <span>Выберите папку</span>}
        </div>
    </div>
};

let mapStateToProps = (state: StateType) => {
    return {
        folders: state.FolderPage.folders && state.FolderPage.folders.map((el, index) => <Folder key={el.id + index}
                                                                                                 folder={el}/>),
        isDeletingFolders: state.FolderPage.isDeletingFolders
    }
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    addNewFolderThunk: (name: string) => void,
    setDeletingFoldersThunk: () => void
}

export default React.memo(compose(
    connect(mapStateToProps, {addNewFolderThunk,setDeletingFoldersThunk})
)(Folders));