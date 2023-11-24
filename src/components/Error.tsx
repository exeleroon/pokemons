import React from 'react';
import {NavLink} from "react-router-dom";

interface IError {
    error: {
        data: string;
        status: string;
        error: string;
        originalStatus: number;
    }
}

const Error: React.FC<IError | any> = ({error}) => {
    if ("error" in error && error) {
        let errMsg = null;

        if (error.data) {
            errMsg = error.data;
        }

        if (error.error) {
            console.warn(error.error);
        }
        return (
            <div className={'error'}>
                <NavLink className={'btn btn-secondary mb-4'} to={'/'}>
                    Back to homepage
                </NavLink>
                <div>{errMsg}</div>
            </div>
        )
    }
    return (
        <div className={'error'}>
            Something went wrong
        </div>
    );
};

export default Error;