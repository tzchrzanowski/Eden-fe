import React from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import BinaryTree, {TreeNodeInterface } from "./binary-tree/BinaryTree";
export function Network() {

    const rootNode: TreeNodeInterface = {
        name: 'Root',
        caption: 'The Root Node',
        leftNode: {
            name: 'Left Node',
            caption: 'A Left Child Node',
            leftNode: null,
            rightNode: null,
        },
        rightNode: {
            name: 'Right Node',
            caption: 'A Right Child Node',
            leftNode: null,
            rightNode: null,
        },
    };

    return (
        <div className={"pageWrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <p>Network Page</p>
                <BinaryTree rootNode={rootNode} />
            </div>
        </div>
    )
}
export default Network;
