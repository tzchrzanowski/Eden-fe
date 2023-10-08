import React from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import BinaryTree, {TreeNodeInterface } from "./binary-tree/BinaryTree";

export function Network() {

    const singleNodeTreeCenter: TreeNodeInterface = {
        name: 'Bartek',
        caption: 'caption',
        nodePosition: 'center',
        level: 0,
        leftNode: null,
        rightNode: null,
    }

    const singleNodeLevelTwoLeftAlpha: TreeNodeInterface = {
        name: 'Andrew',
        caption: 'Package Alpha',
        nodePosition: 'left',
        level: 2,
        leftNode: null,
        rightNode: null,
    }

    const singleNodeLevelTwoRightAlpha: TreeNodeInterface = {
        name: 'Stew',
        caption: 'Package Alpha',
        nodePosition: 'right',
        level: 2,
        leftNode: null,
        rightNode: null,
    }

    const singleNodeLevelTwoLeftBeta: TreeNodeInterface = {
        name: 'Andrew',
        caption: 'Package Beta',
        nodePosition: 'left',
        level: 2,
        leftNode: null,
        rightNode: null,
    }

    const singleNodeLevelTwoRightBeta: TreeNodeInterface = {
        name: 'Stew',
        caption: 'Package Beta',
        nodePosition: 'right',
        level: 2,
        leftNode: null,
        rightNode: null,
    }

    const sevenNodesThree: TreeNodeInterface = {
        name: 'Bartek',
        caption: 'The boss',
        nodePosition: 'center',
        level: 0,
        leftNode: {
            level: 1,
            name: 'left package',
            caption: '100 box',
            leftNode: singleNodeLevelTwoLeftAlpha,
            rightNode: singleNodeLevelTwoRightAlpha,
            nodePosition: "left",
        },
        rightNode: {
            level: 1,
            name: 'Right package',
            caption: '100 box',
            leftNode: singleNodeLevelTwoLeftBeta,
            rightNode: singleNodeLevelTwoRightBeta,
            nodePosition: "right",
        },
    };

    const threeNodesThree: TreeNodeInterface = {
        name: 'Bartek',
        caption: 'The boss',
        nodePosition: 'center',
        level: 0,
        leftNode: {
            level: 1,
            name: 'left package',
            caption: '100 box',
            leftNode: null,
            rightNode: null,
            nodePosition: "left",
        },
        rightNode: {
            level: 1,
            name: 'Right package',
            caption: '100 box',
            leftNode: null,
            rightNode: null,
            nodePosition: "right",
        },
    };

    return (
        <div className={"networkWrapper"}>
            <TopNavigation />
            <div className={"network-page-content"}>
                {/*<BinaryTree rootNode={singleNodeTreeCenter} />*/}
                {/*<BinaryTree rootNode={threeNodesThree} />*/}
                <BinaryTree rootNode={sevenNodesThree} />
            </div>
        </div>
    )
}
export default Network;
