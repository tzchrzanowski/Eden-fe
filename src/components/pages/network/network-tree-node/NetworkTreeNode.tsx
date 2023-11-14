import React, {ReactNode} from "react";
import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import "./NetworkTreeNode.css";
import {Arrow} from "../arrow/Arrow";

interface NetworkTreeNodeProps {
    addPackageCallback: (nodePosition: string, level: number, path: string[])=> void,
    renderNodeRecursiveCallback: (node: BinaryTreeNodeInterface) => ReactNode,
    node: BinaryTreeNodeInterface,
    setSidebarAddNewUserOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
    setParentNodeId: React.Dispatch<React.SetStateAction<number>>;
}

export function NetworkTreeNode({node, renderNodeRecursiveCallback, addPackageCallback, setSidebarAddNewUserOpenCallback, setParentNodeId}: NetworkTreeNodeProps) {
    const [isSliding, setIsSliding] = React.useState(false);
    const [isTopView, setIsTopView] = React.useState<Boolean>();
    const [slideClass, setSlideClass] = React.useState<string>("");

    /* Constructor: */
    React.useEffect(()=>{
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
    });


    /*
    * TODO: node.path is not defined in NetworkBinaryTree or backend
    * */
    const addTopSlidingNodes = () => {
        setIsSliding(!isSliding);
        setTimeout(() => {
            if (node.nodePosition && node.nodeLevel && node.path) {
                addPackageCallback(node.nodePosition, node.nodeLevel, node.path);
            }
        }, 500);
    }

    /*
    * TODO: node.path is not defined in NetworkBinaryTree or backend
    * */
    const addBottomNodes = () => {
        if (node && node.nodePosition && node.nodeLevel && node.path) {
            addPackageCallback(node.nodePosition, node.nodeLevel, node.path);
        }
    }

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
        /*
        * TODO: remove, Sliding is not needed for real adding new user / new package
        * */
        // if (isTopView) {
        //     addTopSlidingNodes();
        // } else {
        //     addBottomNodes();
        // }

        if (node.user.left_child < 0 || node.user.right_child < 0) {
            /*
            * Set parent node id that is used by
            * Sidebar form to create potentially new node"
            * */
            console.log("clicked node id:", node.user.id);
            setParentNodeId(node.user.id);
            setSidebarAddNewUserOpenCallback(true);
        }
    }

    return (
        <>
            <div className={`root-node-wrapper ${slideClass}`}>
                <div className={"node-caption"}>{node.user.username}</div>
                <img className={"node-caption"} src={node.user.profile_picture_url} height={"60px"} width={"auto"}/>
                <div className={"node-caption"}>Lv: {node.nodeLevel}</div>
                <div className={"node-caption"}>{node.user.first_name}</div>
                <button className={"node-caption"} onClick={()=>handleAddPackageButtonClick()}>Add package</button>
            </div>
            <div className={`children-nodes-wrapper ${slideClass}`}>
                {node.left !== null &&
                    <div className={"child-node-container"}>
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
