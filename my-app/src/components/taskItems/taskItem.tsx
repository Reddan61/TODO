import React, {useState} from "react";
import css from "./taskItem.module.css"

const TaskItem = () => {
    let [isOpen, ChangeOpen] = useState(false);

    return <div className={css.container}>
        <div className={css.container__topic}>
            <span>ТЕМА ТЕМА ТЕМА ТЕМА ТЕМА</span>
        </div>
        <div className={css.container__text}>
            <span className={`${css.text__area} ${isOpen?css.text__area_active:''}`}>
                текс тексттекс тексттекс тексттекс тексттекс тексттекс тексттекс тексттекс текст
                 текс тексттекс тексттекс тексттекс тексттекс тексттекс тексттекс тексттекс текст
                 текс тексттекс тексттекс тексттекс тексттекс тексттекс тексттекс тексттекс текст
            </span>
            <div className={`${css.container__more} ${isOpen?css.container__more_active:''}` } onClick={() => {
                ChangeOpen(!isOpen)
            }}>
            </div>
        </div>

    </div>
};

export default TaskItem;