import React from 'react';
import "./Arrow.css";

interface ArrowInterface {
    direction: string;
}

export function Arrow({direction} : ArrowInterface) {
    return (
        <>
            {(direction === 'left') && <>
                <div className={"arrow-line arrow-line-left"}></div>
                <div className={"arrow-head  arrow-head-left"}></div>
            </>}
            {(direction === 'right') && <>
                <div className={"arrow-line arrow-line-right"}></div>
                <div className={"arrow-head arrow-head-right"}></div>
            </>}
        </>
    )
}
