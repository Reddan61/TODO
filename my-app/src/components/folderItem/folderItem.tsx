import React from "react";
import css from "./FolderItem.module.css"
import {compose} from "redux";
import { connect } from "react-redux";
import {StateType} from "../redux/store";
import {setChangedFolderIdThunk} from "../redux/FolderReducer";


const FolderItem:React.FC<otherPropsType & mapStateToDispatchType> = (props) => {
    return <div className={css.folderItem}>
        <div className={css.folderItem__body}>
            <div
                style={{backgroundColor: `rgb(${Math.ceil(Math.random() * (255 - 0) + 0)},${Math.random() * (255 - 0) + 0},${Math.random() * (255 - 0) + 0})`}}
                className={css.folderItem__circle}>
            </div>
            <div className={css.folderItem__title} onClick={() => {
                props.setChangedFolderIdThunk(props.id,props.SubFolder.id)
            }}>
                {props.SubFolder.name}
            </div>
        </div>
    </div>
};


type otherPropsType = {
    id : number,
    SubFolder: {
        id:number
        name:string
    }
}

let mapStateToProps = (state:StateType) => {
    return {

    }
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapStateToDispatchType = {
    setChangedFolderIdThunk:(idFolder:number,idSubFolder:number) => void
}
export default React.memo(compose(
    connect(mapStateToProps, {setChangedFolderIdThunk})
)(FolderItem));


