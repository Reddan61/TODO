import React, {useState} from "react";
import css from "./Tasks.module.css";
import TaskItem from "../taskItems/taskItem";


const Tasks = () => {
    let [textAreaValue,ChangeValueTextArea] = useState('');
    let [textInputValue,ChangeValueInput] = useState('');
    
    let textAreaChange = (e:any) => {
            if(e.target.scrollHeight < 130) {
                e.target.style.height = 76 + 'px';
                e.target.style.height = e.target.scrollHeight + 'px';
                ChangeValueTextArea(e.target.value);
            }
    };

    return <div className={css.tasks}>
        <div className={css.tasks__body}>
            <div className={css.tasks__items}>
                <TaskItem/>
                <TaskItem/>
                <TaskItem/>
                <TaskItem/>
                <TaskItem/>

            </div>
            <div className={css.footer}>
                <div className={css.footer__title}>
                    <span>
                        Тема:
                    </span><br />
                    <input type="text" value = {textInputValue} onChange={(e) => {
                        ChangeValueInput(e.target.value)
                    }}/>
                </div>
                <div className={css.footer__text}>
                    <span>
                        Текст:
                    </span><br />
                    <textarea onChange={(e) => textAreaChange(e)} value={textAreaValue}/>
                </div>
                <button>
                    Сохранить
                </button>
            </div>
        </div>
    </div>
};


export default Tasks;