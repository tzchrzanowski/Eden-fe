import React, {ReactNode} from "react";
import {BinaryTreeNodeInterface, ParentNodeInfo} from "object-types/user-interfaces";
import "./NetworkTreeNode.css";
import {Arrow} from "../arrow/Arrow";
import { clearPhotoUrl } from 'helpers/Helpers';
import networkIcon from "resources/side-nav-icons/network-icon.svg";

interface NetworkTreeNodeProps {
    renderNodeRecursiveCallback: (node: BinaryTreeNodeInterface) => ReactNode,
    node: BinaryTreeNodeInterface,
    setSidebarAddNewUserOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
    setParentNodeInfo: React.Dispatch<React.SetStateAction<ParentNodeInfo>>;
    rerenderNetworkFlag: boolean;
    subTreeDisplayCallback: (id: number) => void;
}

export function NetworkTreeNode({node, renderNodeRecursiveCallback, setSidebarAddNewUserOpenCallback, setParentNodeInfo, rerenderNetworkFlag, subTreeDisplayCallback}: NetworkTreeNodeProps) {
    const [isSliding, setIsSliding] = React.useState(true);
    const [isTopView, setIsTopView] = React.useState<Boolean>();
    const [slideClass, setSlideClass] = React.useState<string>("");
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

    /* Constructor: */
    React.useEffect(()=>{
        /*
        * Set the flag that decides if button to add new packages should be disabled for given node:
        * */
        if (node.user.left_child < 0 || node.user.right_child < 0) {
            setIsDisabled(false)
        }

        /*
        * if node.level is tier 0 or 1, then node belongs to top view, else its low view,
        * top view has sliding and wider display
        * bottom view is more tight and no sliding
        * */
        if (node.nodeLevel) {
            setIsTopView([0, 1 ].includes(node.nodeLevel));
        }
        setSlideClass(getSlidingClass);

        /* slide initially if tree already has tier 1 node setup with children: */
        if (node.nodeLevel == 1 && (node.left !== null || node.right !== null)) {
            if (isTopView) {
                setIsSliding(true);
            }
        }
    }, [rerenderNetworkFlag]);

    const getSlidingClass = (): string => {
        if(isTopView) {
            if (isSliding == true && node.nodePosition == 'right') {
                return 'slide-right';
            }
            if (isSliding == true && node.nodePosition == 'left') {
                return 'slide-left';
            }
        }
        return '';
    };

    const handleAddPackageButtonClick = (): void => {
        if (node.user.left_child < 0 || node.user.right_child < 0) {
            /*
            * Set parent node id that is used by
            * Sidebar form to create potentially new node"
            * */
            setParentNodeInfo({parentId: node.user.id, parentUsername: node.user.username});
            setSidebarAddNewUserOpenCallback(true);
        }
    }

    const getSingleChildNodeClass = (): string => {
        if (node.right === null ) {
            const childNodeLevel = node.left?.nodeLevel;
            switch (childNodeLevel) {
                case 1:
                    return "only-left-child-top-tree";
                    break;
                case 2:
                    return "only-left-child-middle-tree";
                    break;
                case 3:
                    return "only-left-child-bottom-tree";
                    break;
                default:
                    return "";
                    break;
                }

        }
        return "";
    }

    return (
        <>
            <div className={`root-node-wrapper ${slideClass}`}>
                <div className={"fb fb-row align-items-center "}>
                    <div className={"node-caption"}>{node.user.username}</div>
                    <div className={"fb align-items-center pointer ml-1 pl-1"} onClick={()=>subTreeDisplayCallback(node.user.id)}>
                        <img className={"w-3 onHoverButton"} src={networkIcon} alt={"network"} />
                    </div>
                </div>
                <img className={"node-caption"} src={clearPhotoUrl(node.user.profile_picture_url)} height={"60px"} width={"auto"}/>
                <div className={"node-caption"}>Package: {node.user.packageType}</div>
                <div className={"node-caption"}>{node.user.first_name}</div>
                <button disabled={isDisabled} className={"node-caption"} onClick={()=>handleAddPackageButtonClick()}>Add package</button>
            </div>
            <div className={`children-nodes-wrapper ${slideClass}`}>
                {node.left !== null &&
                    <div className={`child-node-container ${getSingleChildNodeClass()}`}>
                        <Arrow direction={"left"}/>
                        <div className={"left-child-node"}>{renderNodeRecursiveCallback(node.left)}</div>
                    </div>
                }
                {node.right !== null &&
                    <div className={"child-node-container"}>
                        <Arrow direction={"right"}/>
                        <div className={"right-child-node"}>{renderNodeRecursiveCallback(node.right)}</div>
                    </div>
                }
            </div>
        </>
    );
}

export default NetworkTreeNode;
