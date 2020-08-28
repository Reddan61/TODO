import React from "react";
import css from "./Folders.module.css"
import FoldersItems from "../foldersItems/foldersItems";

const Folders = () => {
    return <div className={css.folders}>
        <div className={css.folders__items}>
            <FoldersItems/>
            <FoldersItems/>
        </div>
        <div className={css.folders__menu}>
            <button>Добавить папку</button>
        </div>
    </div>
};


export default Folders;