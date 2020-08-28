import React, {useState} from "react";
import css from "./foldersItems.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import {changeIsSettingsThunk} from "../redux/FolderReducer";

const FoldersItems:React.FC<mapStateToPropsType & otherPropsType> = (props) => {
    const [isOpen, ChangeOpen] = useState(false);
    const [isOpenSettings, ChangeOpenSettings] = useState(false);
    return <div className={css.folder} >
        <div className={css.folder__name} >
            <div onClick={() => {
                ChangeOpen(!isOpen);
            }} className={isOpen?css.folder__plus_active:css.folder__plus}>
            </div>
            <span>ТЕМА ЛИСТА</span>
            <div className={css.folder__settings} onClick={() => {
                ChangeOpenSettings(!isOpenSettings)
            }}>
                <span></span>
            </div>
                {isOpenSettings && <ul className={css.settings__list}>
                    <li>Добавить</li>
                    <li>Удалить</li>
                </ul>}
        </div>

        {isOpen && <ul>
            <li>ПодТема</li>
            <li>ПодТема</li>
            <li>ПодТема</li>
        </ul>}
    </div>
};

let mapStateToProps = (state:StateType) => {
    return {
        isSettings:state.FolderPage.isSettings
    }
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type otherPropsType = {

}

export default compose(
    connect(mapStateToProps, {})
)(FoldersItems);