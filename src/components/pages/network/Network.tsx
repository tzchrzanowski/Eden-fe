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
import {UserBinaryTree, ParentNodeInfo} from 'object-types/user-interfaces';
import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import NetworkBinaryTree from "./network-binary-tree/NetworkBinaryTree";
import SidebarAddNewUser from "./sidebar-add-new-user/SidebarAddNewUser";

export function Network() {
    const [fetchedUserNetwork, setFetchedUserNetwork] = React.useState<BinaryTreeNodeInterface | null>(null);
    const contextValue = useContext(UserContext);
    const [rerenderNetworkFlag, setRerenderNetworkFlag] = React.useState<boolean>(false);
    const [rerenderNetworkChildrenFlag, setRerenderNetworkChildrenFlag] = React.useState<boolean>(false);
    /*
    * Sidebar related states:
    * */
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);
    const [parentNodeInfo, setParentNodeInfo] = React.useState<ParentNodeInfo>({parentId: -1, parentUsername: "placeholder"});

    React.useEffect(()=>{
        async function fetchData() {
            const userId = Number(contextValue?.state?.user?.user_id) || 0;
            const fetchedUsers = await getUserNetwork(userId);
            setFetchedUserNetwork(fetchedUsers)
            setRerenderNetworkChildrenFlag((prevState:boolean) => !prevState);
        }
        fetchData();
    }, [rerenderNetworkFlag]);

    return (
        <div className={"networkWrapper"}>
            <TopNavigation />
            <SidebarAddNewUser
                isOpen={isSidebarOpen}
                setSidebarAddNewUserOpenCallback={setSidebarOpen}
                parentNodeInfo={parentNodeInfo}
                rerenderCallback={setRerenderNetworkFlag}
            />
            <div className={"network-page-content"}>
                <BinaryTree rootNodeWithPath={singleNodeTreeCenterWithPath} />
                {/*<BinaryTree rootNodeWithPath={threeNodesThreeWithPath} />*/}
                {/*<BinaryTree rootNodeWithPath={sevenNodesThreeWithPath} />*/}
                {
                    (fetchedUserNetwork !== null) &&
                    (<NetworkBinaryTree
                        setSidebarAddNewUserOpenCallback={setSidebarOpen}
                        setParentNodeInfo={setParentNodeInfo}
                        rootNode={fetchedUserNetwork}
                        rerenderNetworkFlag={rerenderNetworkChildrenFlag}
                    />)
                }
            </div>
        </div>
    )
}
export default Network;
