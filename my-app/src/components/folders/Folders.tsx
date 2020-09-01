import React from "react";
import css from "./Folders.module.css"
import Folder from "../folder/folder";

const Folders = () => {
    return <div className={css.folders}>
        <div className={css.folders__items}>
            <Folder/>
            <Folder/>
        </div>
        <div className={css.folders__menu}>
            <button>Добавить папку</button>
        </div>
    </div>
};


export default Folders;