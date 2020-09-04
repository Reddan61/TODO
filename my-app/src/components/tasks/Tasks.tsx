import React, {useState} from "react";
import css from "./Tasks.module.css";
import TaskItem from "../taskItems/taskItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import {addNewTaskThunk} from "../redux/FolderReducer";


const Tasks: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {

    let [textAreaValue, ChangeValueTextArea] = useState('');
    let [textInputValue, ChangeValueInput] = useState('');

    let textAreaChange = (e: any) => {
        if (e.target.scrollHeight < 140) {
            e.target.style.height = 76 + 'px';
            e.target.style.height = e.target.scrollHeight + 'px';
            ChangeValueTextArea(e.target.value);
        }
    };
    if (props.changedFolderId === null) {
        return <div className={css.tasks}>
            <div className={css.tasks__body}>
                <div className={css.tasks__popup}>
                    Выберите папку
                </div>
            </div>
        </div>
    }
    return <div className={css.tasks}>
        <div className={css.tasks__body}>
            <div className={css.tasks__items}>
                {props.taskItems}
            </div>
            <div className={css.footer}>
                <div className={css.footer__title}>
                    <span>
                        Тема:
                    </span><br/>
                    <input type="text" value={textInputValue} onChange={(e) => {
                        ChangeValueInput(e.target.value)
                    }}/>
                </div>
                <div className={css.footer__text}>
                    <span>
                        Текст:
                    </span><br/>
                    <textarea onChange={(e) => textAreaChange(e)} value={textAreaValue}/>
                </div>
                <button onClick={() => {
                    if(textAreaValue !== '' && textInputValue !== ""){
                        props.addNewTaskThunk(textInputValue, textAreaValue);
                        ChangeValueTextArea('');
                        ChangeValueInput('');
                    }
                }
                }>
                    Сохранить
                </button>
            </div>
        </div>
    </div>
};

let mapStateToProps = (state: StateType) => {
    return {
        changedFolderId: state.FolderPage.ChangedFolderId,
        taskItems: state.FolderPage.tasks && state.FolderPage.tasks!.map((el,index) => {
            if(el.idFolder === state.FolderPage.ChangedFolderId) {
                if(el.idSubFolder === state.FolderPage.ChangedSubFolderId) {
                    return <TaskItem key = {el.text + el.title + el.idSubFolder + el.idFolder} task={el} />
                }
            }
        })
    }
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    addNewTaskThunk: (title: string, text: string) => void
}

export default compose(
    connect(mapStateToProps, {addNewTaskThunk})
)(Tasks);