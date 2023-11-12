import React, {ReactNode} from "react";
import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import "./NetworkTreeNode.css";
import {Arrow} from "../arrow/Arrow";

interface NetworkTreeNodeProps {
    addPackageCallback: (nodePosition: string, level: number, path: string[])=> void,
    renderNodeRecursiveCallback: (node: BinaryTreeNodeInterface) => ReactNode,
    node: BinaryTreeNodeInterface,
}

export function NetworkTreeNode({node, renderNodeRecursiveCallback, addPackageCallback }: NetworkTreeNodeProps) {
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
        if (node.nodePosition && node.nodeLevel && node.path) {
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

    return (
        <>
            <div className={`root-node ${slideClass}`}>
                <p>{node.user.username}</p>
                Lv: {node.nodeLevel}
                <p>{node.user.first_name}</p>
                <button onClick={isTopView ? addTopSlidingNodes : addBottomNodes}>Add package</button>
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
