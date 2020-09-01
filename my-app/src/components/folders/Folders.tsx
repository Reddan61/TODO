import React, {useState} from "react";
import css from "./Folders.module.css"
import Folder from "../folder/folder";
import { compose } from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import {addNewFolderThunk} from "../redux/FolderReducer";

const Folders:React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
    let [isAdding,ChangeAdd] = useState(false);
    let [inputText,ChangeTextInput] = useState('');
    return <div className={css.folders}>
        <div className={css.folders__items}>
            {props.folders}
            {isAdding && <input
                value = {inputText}
                autoFocus
                onChange={(e) => ChangeTextInput(e.target.value)}
                onBlur={() => {
                    ChangeAdd(false);
                    props.addNewFolderThunk(inputText);
                    ChangeTextInput('');
                }}
            />}
        </div>
        <div className={css.folders__menu}>
            <button onClick={() => ChangeAdd(true)}>Добавить папку</button>
        </div>
    </div>
};

let mapStateToProps = (state:StateType) => {
    return {
        folders:state.FolderPage.folders && state.FolderPage.folders.map((el,index) => <Folder key = {el.id + index} folder = {el} />)
    }
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    addNewFolderThunk: (name:string) => void
}

export default compose(
    connect(mapStateToProps, {addNewFolderThunk})
)(Folders);