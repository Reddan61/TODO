import React, {useState} from "react";
import css from "./taskItem.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import {deleteTaskThunk} from "../redux/Reducer";

const TaskItem:React.FC<otherPropsType & mapDispatchToPropsType> = (props) => {
    let [isOpen, ChangeOpen] = useState(false);
    return <div className={css.taskItem}>
        <div className={css.taskItem__topic}>
            <div className={css.taskItem__cross} onClick={() => {
                props.deleteTaskThunk(props.task.id);
            }}>
            </div>
            <span>{props.task.title}</span>
        </div>
        <div className={css.taskItem__text}>
            <span className={`${css.text__area} ${isOpen?css.text__area_active:''}`}>
                {props.task.text}
            </span>
            <div className={`${css.taskItem__more} ${isOpen?css.container__more_active:''}` } onClick={() => {
                ChangeOpen(!isOpen)
            }}>
            </div>
        </div>

    </div>
};


type otherPropsType = {
    task: {
        id:number,
        idSubFolder: number,
        idFolder: number,
        title:string,
        text:string
    }
}

let mapStateToProps = (state:StateType) => {
    return {

    }
};

type mapDispatchToPropsType = {
    deleteTaskThunk: (id:number) => void
}




export default compose(
    connect(mapStateToProps,{deleteTaskThunk})
)(TaskItem);