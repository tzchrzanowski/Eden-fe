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
import {UserBinaryTree} from 'object-types/user-interfaces';
import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import NetworkBinaryTree from "./network-binary-tree/NetworkBinaryTree";


export function Network() {
    const [fetchedUserNetwork, setFetchedUserNetwork] = React.useState<BinaryTreeNodeInterface | null>(null);
    const contextValue = useContext(UserContext);

    React.useEffect(()=>{
        async function fetchData() {
            const userId = Number(contextValue?.state?.user?.user_id) || 0;
            const fetchedUsers = await getUserNetwork(userId);
            console.log("fetchedUsers data: ", fetchedUsers);
            setFetchedUserNetwork(fetchedUsers)
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
            <NetworkBinaryTree rootNode={fetchedUserNetwork} />
        </div>
    )
}
export default Network;
