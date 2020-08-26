import React, {useState} from "react";
import css from "./foldersItems.module.css";

const FoldersItems = () => {
    const [isOpen, ChangeOpen] = useState(false);

    return <div className={css.folder} >
        <div className={css.folder__name} onClick={() => {
            ChangeOpen(!isOpen);
        }}>
            <div className={isOpen?css.folder__arrow_active:css.folder__arrow}>
            </div>
            <span>ТЕМА ЛИСТА</span>
            <div className={css.folder__settings}>
                <span></span>
            </div>
        </div>
        {isOpen && <ul>
            <li>ПодТема</li>
            <li>ПодТема</li>
            <li>ПодТема</li>
        </ul>}
    </div>
};


export default FoldersItems;