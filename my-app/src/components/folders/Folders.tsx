import React from "react";
import css from "./Folders.module.css"
import FoldersItems from "../foldersItems/foldersItems";

const Folders = () => {
    return <div className={css.folders}>
        <FoldersItems />
    </div>
};


export default Folders;