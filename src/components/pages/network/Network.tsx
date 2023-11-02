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
import {getAllUsers, getUserNetwork} from "../../../data/getRequests";

export function Network() {
    const contextValue = useContext(UserContext);

    React.useEffect(()=>{
        if (contextValue &&
            contextValue.state &&
            contextValue.state.user &&
            contextValue.state.user.username &&
            contextValue.state.user.role_id
        ) {
            console.log("username: ", contextValue.state.user.username,
                " roleId: ", contextValue.state.user.role_id,
                " user id: ", contextValue.state.user.user_id);
        }
        async function fetchData() {
            const userId = Number(contextValue?.state?.user?.user_id) || 0;
            const fetchedUser = await getUserNetwork(userId);
            console.log("fetched user in network: ", fetchedUser);
        }
        fetchData();
    }, []);


    React.useEffect(()=> {
        async function fetchData() {
            const fetchedUser = await getAllUsers();
            console.log("fetched user in network: ", fetchedUser);
        }
        fetchData();
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
