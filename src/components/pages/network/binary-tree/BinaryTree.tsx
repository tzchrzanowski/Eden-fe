import React from 'react';
import './BinaryTree.css';
import {Arrow} from "../arrow/Arrow";

export interface TreeNodeInterface {
    level: number;
    name: string;
    caption? : string;
    leftNode: TreeNodeInterface | null;
    rightNode: TreeNodeInterface | null;
    nodePosition: string,
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
    nodePosition: "center",
    level: 0,
}

export function BinaryTree({rootNode} : BinaryTreeProps) {
    const [tree, setTree] = React.useState<TreeNodeInterface | null>(rootNode);
    const [treeUpdated, setTreeUpdated] = React.useState(false);

    React.useEffect(()=>{
        console.log("Tree updated");
    }, [treeUpdated]);

    const renderNode = (node: TreeNodeInterface | null) => {
        if (!node) return null;

        return (
            <div className={"tree-wrapper"}>
                <div className={"root-node"}>
                    <p>{node.name}</p>
                    Lv: {node.level}
                    <p>{node.caption}</p>
                    <button onClick={()=>addPackage(node.nodePosition, node.level)}>Add package</button>
                </div>
                <div className={"children-nodes-wrapper"}>
                    {node.leftNode !== null &&
                        <div className={"child-node-container"}>
                            <Arrow direction={"left"}/>
                            <div className={"left-child-node"}>{renderNode(node.leftNode)}</div>
                        </div>
                    }
                    {node.rightNode !== null &&
                        <div className={"child-node-container"}>
                            <Arrow direction={"right"}/>
                            <div className={"right-child-node"}>{renderNode(node.rightNode)}</div>
                        </div>
                    }
                </div>
            </div>
        )
    }

    const createNewPackage = (nodePosition: string, nodeLevel: number) => {
        const newTreeNodes = [
            {
                name: 'Left Child',
                caption: '100 box',
                leftNode: null,
                rightNode: null,
                nodePosition: "left",
                level: nodeLevel + 1,
            },
            {
                name: 'Right Child',
                caption: '100 box',
                leftNode: null,
                rightNode: null,
                nodePosition: "right",
                level: nodeLevel + 1,
            }
        ];

        const newTree = setTree((prevState) => {
                const newTree = prevState;
                if(newTree !== null) {
                    if(nodePosition == "left") {
                        if (newTree.leftNode !== null) {
                            if (newTree.leftNode.leftNode == null) {
                                newTree.leftNode.leftNode = newTreeNodes[0];
                            }
                            if (newTree.leftNode.rightNode == null) {
                                newTree.leftNode.rightNode = newTreeNodes[1];
                            }
                        }
                    }
                    if(nodePosition == "right") {
                        if (newTree.rightNode !== null) {
                            if (newTree.rightNode.leftNode == null) {
                                newTree.rightNode.leftNode = newTreeNodes[0];
                            }
                            if (newTree.rightNode.rightNode == null) {
                                newTree.rightNode.rightNode = newTreeNodes[1];
                            }
                        }
                    }
                }
                return newTree;
        });
        setTreeUpdated(!treeUpdated);
    }

    const addPackage = (nodePosition: string, nodeLevel: number)=> {
        createNewPackage(nodePosition, nodeLevel);
    }

    return(
        <div>
            {renderNode(tree)}
        </div>
    );
}

export default BinaryTree;
