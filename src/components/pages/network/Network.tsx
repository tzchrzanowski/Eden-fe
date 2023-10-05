import React from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import BinaryTree, {TreeNodeInterface } from "./binary-tree/BinaryTree";

export function Network() {
    const rootNode: TreeNodeInterface = {
        name: 'Bartek',
        caption: 'The boss',
        leftNode: {
            name: 'left package',
            caption: '100 box',
            leftNode: null,
            rightNode: null,
        },
        rightNode: {
            name: 'Right package',
            caption: '100 box',
            leftNode: null,
            rightNode: null,
        },
    };

    return (
        <div className={"networkWrapper"}>
            <TopNavigation />
            <div className={"network-page-content"}>
                <BinaryTree rootNode={rootNode} />
            </div>
        </div>
    )
}
export default Network;
