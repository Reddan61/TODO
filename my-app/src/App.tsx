import React, {useEffect, useState} from 'react';
import css from "./App.module.css";
import Folders from "./components/folders/Folders";
import Tasks from "./components/tasks/Tasks";
import {compose} from 'redux';
import {connect} from "react-redux";
import {addNewFolderThunk, getFoldersThunk, getTasksThunk} from "./components/redux/Reducer";
import {StateType} from "./components/redux/store";

function App(props:mapStateToPropsType & mapDispatchToPropsType) {
    let [isGotFolders,SetFolders] = useState(false);
    useEffect(  () => {
        props.getFoldersThunk();
        props.getTasksThunk();
        SetFolders(true);
    }, []);
    if(!isGotFolders) {
        return <div>loading</div>
    }
    return (
        <div className={css.container}>
            <div className={css.container__wrapped}>
                <Folders/>
                <Tasks/>
            </div>
        </div>
    );
}

let mapStateToProps = (state:StateType) => {
    return {

    }
};
type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    getFoldersThunk:() => void,
    getTasksThunk: () => void
}

export default compose(
    connect(mapStateToProps, {addNewFolderThunk, getFoldersThunk,getTasksThunk})
)(App);
