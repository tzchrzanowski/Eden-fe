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

    const handleSlide = ()=>{
        setIsSliding(!isSliding);
    }

    const onClickChain = () => {
        handleSlide();
        setTimeout(() => {
            addPackageCallback(node.nodePosition, node.level)
        }, 500);
    }

    let slideClass = '';
    if (isSliding == true && node.nodePosition == 'right') {
        slideClass =  'slide-right';
    }

    if (isSliding == true && node.nodePosition == 'left') {
        slideClass = 'slide-left';
    }
    // const slideClass = isSliding && node.nodePosition == '' ? 'slide-left' : 'slide-right';
    // const slideClass = (): string => {
    //     let slideDirection = '';
    //     if (isSliding) {
    //         slideDirection += (node.nodePosition == 'left') ? 'slide-left' : 'slide-right';
    //     }
    //     return slideDirection;
    // }

    return (
        <>
            <div className={`root-node ${slideClass}`}>
                <p>{node.name}</p>
                Lv: {node.level}
                <p>{node.caption}</p>
                <button onClick={onClickChain}>Add package</button>
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
