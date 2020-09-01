import React from "react";
import css from "./FolderItem.module.css"


const FolderItem = () => {
    return <div className={css.folderItem}>
        <div className={css.folderItem__body}>
            <div
                style={{backgroundColor: `rgb(${Math.ceil(Math.random() * (255 - 0) + 0)},${Math.random() * (255 - 0) + 0},${Math.random() * (255 - 0) + 0})`}}
                className={css.folderItem__circle}>
            </div>
            <div className={css.folderItem__title}>
                Под тема
            </div>
        </div>
    </div>
};


export default React.memo(FolderItem);


