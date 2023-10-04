import React from 'react';
import './BinaryTree.css';

export interface TreeNodeInterface {
    name: string;
    caption? : string;
    leftNode: TreeNodeInterface | null;
    rightNode: TreeNodeInterface | null;
}

interface BinaryTreeProps {
    rootNode: TreeNodeInterface | null;
}

function TreeNode() {
    return (
        <div>
            Node
        </div>);
}

const nodeMock: TreeNodeInterface = {
    name: "Bartek",
    caption: "is boss",
    leftNode: null,
    rightNode: null,
}


export function BinaryTree({rootNode} : BinaryTreeProps) {
    const renderNode = (node: TreeNodeInterface | null) => {
        if (!node) return null;

        return (
            <div className={"tree-wrapper"}>
                <div className={"root-node"}>
                    <p>{node.name}</p>
                    <p>{node.caption}</p>
                </div>
                <div className={"children-nodes-wrapper"}>
                    <div className={"left-child-node"}>{renderNode(node.leftNode)}</div>
                    <div className={"right-child-node"}>{renderNode(node.rightNode)}</div>
                </div>
            </div>
        )
    }
    return(
        <div>
            {renderNode(rootNode)}
        </div>
    );
}

export default BinaryTree;
