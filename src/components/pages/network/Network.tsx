import React, { useContext } from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import BinaryTree, {TreeNodeInterface } from "./binary-tree/BinaryTree";
import UserContext from 'context/UserContext';

import {
    singleNodeTreeCenterWithPath,
    threeNodesThreeWithPath,
    sevenNodesThreeWithPath,
} from "./TreeMocksWithPath";

export function Network() {
    const contextValue = useContext(UserContext);

    React.useEffect(()=>{
        if (contextValue &&
            contextValue.state &&
            contextValue.state.user &&
            contextValue.state.user.username &&
            contextValue.state.user.role_id
        ) {
            console.log(contextValue.state.user.username);
            console.log(contextValue.state.user.role_id);
        }
    }, []);

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
