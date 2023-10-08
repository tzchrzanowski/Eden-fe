import React from 'react';
import './BinaryTree.css';
import TreeNode from "../tree-node/TreeNode";

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

// function TreeNode() {
//     return (
//         <div>
//             Node
//         </div>);
// }
//
// const nodeMock: TreeNodeInterface = {
//     name: "Bartek",
//     caption: "is boss",
//     leftNode: null,
//     rightNode: null,
//     nodePosition: "center",
//     level: 0,
// }

export function BinaryTree({rootNode} : BinaryTreeProps) {
    const [tree, setTree] = React.useState<TreeNodeInterface | null>(rootNode);
    const [treeUpdated, setTreeUpdated] = React.useState(false);

    React.useEffect(()=>{
        console.log("Tree updated");
    }, [treeUpdated]);

    /*
    * Renders root node and then recursively renders each children node from tree:
    * */
    const renderNode = (node: TreeNodeInterface | null) => {
        if (!node) return null;
        const treeWrapperClass = ([0,1,2].includes(node.level)) ? 'top-tree' : 'bottom-tree';
        return (
            <div className={`tree-wrapper ${treeWrapperClass}`}>
                <TreeNode addPackageCallback={addPackage} node={node} renderNodeRecursiveCallback={renderNode}/>
            </div>
        )
    }

    // const recursiveCheck = (level: number, node: TreeNodeInterface) => {
    //     while (level > 0) {
    //         level -=1;
    //         if (node.leftNode != null && node.rightNode != null) {
    //             return recursiveCheck(level, node.leftNode);
    //         }
    //         if (node.leftNode != null && node.rightNode == null) {
    //             return node.rightNode;
    //         }
    //     }
    // }

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

        setTree((prevState) => {
            const newTree = prevState;
            if(newTree !== null) {
                switch (nodePosition) {
                    /* handle top of the tree if is alone: */
                    case 'center':
                        if (newTree.leftNode == null) {
                            newTree.leftNode = newTreeNodes[0];
                        }
                        if (newTree.rightNode == null) {
                            newTree.rightNode = newTreeNodes[1];
                        }
                        break;
                    /* add left node */
                    case 'left':
                        if (newTree.leftNode !== null) {
                            if (newTree.leftNode.leftNode == null) {
                                newTree.leftNode.leftNode = newTreeNodes[0];
                            }
                            if (newTree.leftNode.rightNode == null) {
                                newTree.leftNode.rightNode = newTreeNodes[1];
                            }
                            /* if left node on level 2 has value: */
                            else if (newTree.leftNode.leftNode !== null) {
                                if (newTree.leftNode.leftNode.leftNode == null) {
                                    newTree.leftNode.leftNode.leftNode = newTreeNodes[0];
                                }
                                if (newTree.leftNode.leftNode.rightNode == null) {
                                    newTree.leftNode.leftNode.rightNode = newTreeNodes[1];
                                }
                            }
                        }
                        break;
                    /* add right node */
                    case 'right':
                        if (newTree.rightNode !== null) {
                            if (newTree.rightNode.leftNode == null) {
                                newTree.rightNode.leftNode = newTreeNodes[0];
                            }
                            if (newTree.rightNode.rightNode == null) {
                                newTree.rightNode.rightNode = newTreeNodes[1];
                            }
                            /* if right node on level 2 has value: */
                            else if (newTree.rightNode.leftNode !== null) {
                                if (newTree.rightNode.leftNode.leftNode == null) {
                                    newTree.rightNode.leftNode.leftNode = newTreeNodes[0];
                                }
                                if (newTree.rightNode.leftNode.rightNode == null) {
                                    newTree.rightNode.leftNode.rightNode = newTreeNodes[1];
                                }
                            }
                        }
                        break;
                };
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
