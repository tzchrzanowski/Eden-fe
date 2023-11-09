import React from 'react';
import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import "./NetworkBinaryTree.css";

interface NetworkBinaryTreeProps {
    rootNode: BinaryTreeNodeInterface | null;
}

function assignNodeLevels(node: BinaryTreeNodeInterface | null, level: number): BinaryTreeNodeInterface | null{
    if (node === null) { return null; }

    node.nodeLevel = level;
    assignNodeLevels(node.left, level + 1);
    assignNodeLevels(node.right, level + 1);
    return node;
}

export function BinaryTree({rootNode} : NetworkBinaryTreeProps) {
    const [treeWithAddedDepth, setTreeWithAddedDepth] = React.useState<BinaryTreeNodeInterface | null>(null);

    React.useEffect(()=>{
        setTreeWithAddedDepth(assignNodeLevels(rootNode, 0))
    }, []);

    return (<div className={"binary-tree-wrapper"}>
        network binary tree
        {
            (rootNode !== null) && rootNode.id
        }
        <br/>
        {
            (treeWithAddedDepth !== null) &&
            (<div>
                <span>{treeWithAddedDepth.id}</span>
                <br/>
                <span>{treeWithAddedDepth.nodeLevel}</span>
            </div>)
        }
    </div>)
}

export default BinaryTree;
