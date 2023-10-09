import React from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import BinaryTree, {TreeNodeInterface } from "./binary-tree/BinaryTree";

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
                <BinaryTree rootNodeWithPath={singleNodeTreeCenterWithPath} />
                {/*<BinaryTree rootNodeWithPath={threeNodesThreeWithPath} />*/}
                {/*<BinaryTree rootNodeWithPath={sevenNodesThreeWithPath} />*/}
            </div>
        </div>
    )
}
export default Network;
