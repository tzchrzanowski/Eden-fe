import {BinaryTreeNodeInterface} from "object-types/user-interfaces";
import "./NetworkBinaryTree.css";

interface NetworkBinaryTreeProps {
    rootNode: BinaryTreeNodeInterface | null;
}

export function BinaryTree({rootNode} : NetworkBinaryTreeProps) {

    return (<div className={"binary-tree-wrapper"}>
        network binary tree
        {
            (rootNode !== null) && rootNode.id
        }
    </div>)
}

export default BinaryTree;
