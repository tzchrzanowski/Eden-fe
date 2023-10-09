import React from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import BinaryTree, {TreeNodeInterface } from "./binary-tree/BinaryTree";
import {
    singleNodeTreeCenter,
    sevenNodesThree,
    threeNodesThree,
} from "./treeMocks";

import {
    singleNodeTreeCenterWithPath,
    threeNodesThreeWithPath,
    sevenNodesThreeWithPath,
} from "./TreeMocksWithPath";

export function Network() {

    return (
        <div className={"networkWrapper"}>
            <TopNavigation />
            <div className={"network-page-content"}>
                {/*<BinaryTree rootNode={singleNodeTreeCenter} />*/}
                {/*<BinaryTree rootNode={threeNodesThree} />*/}
                {/*<BinaryTree rootNode={sevenNodesThree} />*/}

                {/*<BinaryTree rootNodeWithPath={threeNodesThreeWithPath} />*/}
                <BinaryTree rootNodeWithPath={singleNodeTreeCenterWithPath} />
            </div>
        </div>
    )
}
export default Network;
