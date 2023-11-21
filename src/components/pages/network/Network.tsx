import React, { useContext } from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import UserContext from 'context/UserContext';
import {getUserNetwork} from "../../../data/getRequests";
import {ParentNodeInfo} from 'object-types/user-interfaces';
import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import NetworkBinaryTree from "./network-binary-tree/NetworkBinaryTree";
import SidebarAddNewUser from "./sidebar-add-new-user/SidebarAddNewUser";

export function Network() {
    const [fetchedUserNetwork, setFetchedUserNetwork] = React.useState<BinaryTreeNodeInterface | null>(null);
    const contextValue = useContext(UserContext);
    const [rerenderNetworkFlag, setRerenderNetworkFlag] = React.useState<boolean>(false);
    const [rerenderNetworkChildrenFlag, setRerenderNetworkChildrenFlag] = React.useState<boolean>(false);
    const [listOfSubNetworks, setListOfSubNetworks] = React.useState<BinaryTreeNodeInterface[]>([]);
    /*
    * Sidebar related states:
    * */
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);
    const [parentNodeInfo, setParentNodeInfo] = React.useState<ParentNodeInfo>({parentId: -1, parentUsername: "placeholder"});

    React.useEffect(()=>{
        fetchData();
    }, [rerenderNetworkFlag, contextValue]);

    const fetchData = async () => {
        const userId = Number(contextValue?.state?.user?.user_id) || 0;
        const fetchedUsers = await getUserNetwork(userId);
        setFetchedUserNetwork(fetchedUsers)
        setRerenderNetworkChildrenFlag((prevState:boolean) => !prevState);
    }

    const displaySubNetworkTree = async (subNodeId: number) => {
        const fetchedUsers = await getUserNetwork(subNodeId);
        const subTreesListNewList  = [...listOfSubNetworks, fetchedUsers];
        setListOfSubNetworks(subTreesListNewList);
        setRerenderNetworkChildrenFlag((prevState:boolean) => !prevState);
    }

    const handleDisplaySubNetworkButton = (subNodeId: number) => {
        displaySubNetworkTree(subNodeId);
    }

    React.useEffect(()=> {
    }, [listOfSubNetworks]);

    return (<>
        <div className={"networkWrapper"}>
            <TopNavigation />
            <SidebarAddNewUser
                isOpen={isSidebarOpen}
                setSidebarAddNewUserOpenCallback={setSidebarOpen}
                parentNodeInfo={parentNodeInfo}
                rerenderCallback={setRerenderNetworkFlag}
            />
            <div className={"network-page-content"}>
                {
                    (fetchedUserNetwork !== null) &&
                    (<NetworkBinaryTree
                        subTreeDisplayCallback={handleDisplaySubNetworkButton}
                        setSidebarAddNewUserOpenCallback={setSidebarOpen}
                        setParentNodeInfo={setParentNodeInfo}
                        rootNode={fetchedUserNetwork}
                        rerenderNetworkFlag={rerenderNetworkChildrenFlag}
                    />)
                }
            </div>
        </div>

        {/* list of sub network-trees below: */}
        {
            (listOfSubNetworks.length > 0) &&
            listOfSubNetworks.map((tree, id) => {
                return (
                    <div className={"networkWrapper"} key={id}>
                        <TopNavigation />
                        <SidebarAddNewUser
                            isOpen={isSidebarOpen}
                            setSidebarAddNewUserOpenCallback={setSidebarOpen}
                            parentNodeInfo={parentNodeInfo}
                            rerenderCallback={setRerenderNetworkFlag}
                        />
                        <div className={"network-page-content"}>
                            {
                                (tree !== null) &&
                                (<NetworkBinaryTree
                                    subTreeDisplayCallback={handleDisplaySubNetworkButton}
                                    setSidebarAddNewUserOpenCallback={setSidebarOpen}
                                    setParentNodeInfo={setParentNodeInfo}
                                    rootNode={tree}
                                    rerenderNetworkFlag={rerenderNetworkChildrenFlag}
                                />)
                            }
                        </div>
                    </div>
                );
            })
        }

    </>);
}
export default Network;
