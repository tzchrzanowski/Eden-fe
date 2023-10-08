import React, {ReactNode} from 'react';
import './TreeNode.css';
import {TreeNodeInterface} from '../binary-tree/BinaryTree';
import {Arrow} from "../arrow/Arrow";

interface TreeNodeProps {
    addPackageCallback: (nodePosition: string, level: number)=> void,
    renderNodeRecursiveCallback: (node: TreeNodeInterface | null) => ReactNode,
    node: TreeNodeInterface,
}

export function TreeNode({node, renderNodeRecursiveCallback, addPackageCallback }: TreeNodeProps) {
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
        setIsTopView([0, 1 ].includes(node.level));
        setSlideClass(getSlidingClass);


        if (node.level == 1 && (node.leftNode !== null || node.rightNode !== null)) {
            isTopView ?? setIsSliding(true);
        }
    });

    const addTopSlidingNodes = () => {
        setIsSliding(!isSliding);
        setTimeout(() => {
            addPackageCallback(node.nodePosition, node.level)
        }, 500);
    }

    const addBottomNodes = () => {
        addPackageCallback(node.nodePosition, node.level)
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
                <p>{node.name}</p>
                Lv: {node.level}
                <p>{node.caption}</p>
                <button onClick={isTopView ? addTopSlidingNodes : addBottomNodes}>Add package</button>
            </div>
            <div className={`children-nodes-wrapper ${slideClass}`}>
                {node.leftNode !== null &&
                    <div className={"child-node-container"}>
                        <Arrow direction={"left"}/>
                        <div className={"left-child-node"}>{renderNodeRecursiveCallback(node.leftNode)}</div>
                    </div>
                }
                {node.rightNode !== null &&
                    <div className={"child-node-container"}>
                        <Arrow direction={"right"}/>
                        <div className={"right-child-node"}>{renderNodeRecursiveCallback(node.rightNode)}</div>
                    </div>
                }
            </div>
        </>
    );
}

export default TreeNode;
