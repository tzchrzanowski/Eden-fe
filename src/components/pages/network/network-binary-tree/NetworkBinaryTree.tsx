import React from 'react';
import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import "./NetworkBinaryTree.css";

interface NetworkBinaryTreeProps {
    rootNode: BinaryTreeNodeInterface | null;
}

function assignNodeAttributes(node: BinaryTreeNodeInterface | null, level: number, position: string): BinaryTreeNodeInterface | null{
    if (node === null) { return null; }
    node.nodeLevel = level;
    node.nodePosition = position;
    assignNodeAttributes(node.left, level + 1, "left");
    assignNodeAttributes(node.right, level + 1, "right");
    return node;
}

export function BinaryTree({rootNode} : NetworkBinaryTreeProps) {
    const [treeWithExtraAttributes, setTreeWithExtraAttributes] = React.useState<BinaryTreeNodeInterface | null>(null);

    React.useEffect(()=>{
        setTreeWithExtraAttributes(assignNodeAttributes(rootNode, 0, "root"))
    }, []);

    return (<div className={"binary-tree-wrapper"}>
        <span>network binary tree
        {
            (rootNode !== null) && rootNode.id
        }</span>
        <br/>
        {
            (treeWithExtraAttributes !== null) &&
            (<div>
                <span>{treeWithExtraAttributes.id}</span>
                <br/>
                <span>{treeWithExtraAttributes.nodeLevel}</span>
                <br/>
                <span>{treeWithExtraAttributes.nodePosition}</span>
            </div>)
        }
    </div>)
}

export default BinaryTree;
