import React from 'react';
import './BinaryTree.css';
import TreeNode from "../tree-node/TreeNode";
import {TreeNodeInterfaceWithPath} from "../TreeMocksWithPath";

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

interface BinaryTreePropsWithPath {
    rootNodeWithPath: TreeNodeInterfaceWithPath | null;
}

// export function BinaryTree({rootNode} : BinaryTreeProps) {
export function BinaryTree({rootNodeWithPath} : BinaryTreePropsWithPath) {
    // const [tree, setTree] = React.useState<TreeNodeInterface | null>(rootNode);
    const [treeWithPath, setTreeWithPath] = React.useState<TreeNodeInterfaceWithPath | null>(rootNodeWithPath);
    const [treeUpdated, setTreeUpdated] = React.useState(false);

    React.useEffect(()=>{
        console.log("Tree updated");
    }, [treeUpdated]);

    /*
    * Renders root node and then recursively renders each children node from tree:
    * */
    // const renderNode = (node: TreeNodeInterface | null) => {
    //     if (!node) return null;
    //     const treeWrapperClass = getTreeLevelClass(node.level);
    //     return (
    //         <div className={`tree-wrapper ${treeWrapperClass}`}>
    //             <TreeNode
    //                 addPackageCallback={addPackage}
    //                 node={node}
    //                 renderNodeRecursiveCallback={renderNode}
    //             />
    //         </div>
    //     )
    // }

    /*
    * Renders root node and then recursively renders each children node from tree
    * includes node path paramter:
    * */
    const renderNodeUsingPath = (node: TreeNodeInterfaceWithPath | null) => {
        if (!node) return null;
        const treeWrapperClass = getTreeLevelClass(node.level);
        return (
            <div className={`tree-wrapper ${treeWrapperClass}`}>
                <TreeNode
                    addPackageCallback={addPackage}
                    node={node}
                    renderNodeRecursiveCallback={renderNodeUsingPath}
                />
            </div>
        )
    }

    const getTreeLevelClass = (nodeLevel: number): string => {
        [0,1,2].includes(nodeLevel)
        switch (nodeLevel) {
            case 0 || 1:
                return 'top-tree';
                break;
            case 2:
                return 'middle-tree';
                break;
            case 3:
                return 'bottom-tree';
                break;
            default:
                return '';
        }
    }

    const createNewPackageInPath = (clickedNodePosition: string, nodeLevel: number, nodePath: string[] ) => {
        // let newTree = treeWithPath;
        //
        // switch (nodePath.length) {
        //     case 0:
        //         // add node on left or right in position 1 | TOP tree
        //         if (newTree?.leftNode === null) {
        //             newTree.leftNode = setOneNode(newTree, 'left');
        //         }
        //         if (newTree?.rightNode === null) {
        //             newTree.rightNode = setOneNode(newTree, 'right');
        //         }
        //         break;
        //     case 1:
        //         // add node on left or right in position 2 | MIDDLE tree
        //         break;
        //     case 2:
        //         // add node on left or right in position 3 | LOW tree
        //         break;
        //     case 3:
        //         // add node on left or right in position 4
        //         break;
        // }
        // setTreeWithPath(newTree);
        console.log('clicked node position: ', clickedNodePosition);
        setTreeWithPath((prevState) => {
            let newTree = prevState;
            const finalNodeSide = (clickedNodePosition === 'left') ? 'leftNode' : 'rightNode';
            switch (nodePath.length) {
                case 0:
                    // add node on left or right in position 1 | TOP tree
                    if (newTree?.leftNode === null) {
                        newTree.leftNode = setOneNode(newTree, 'left');
                    }
                    if (newTree?.rightNode === null) {
                        newTree.rightNode = setOneNode(newTree, 'right');
                    }
                    break;
                case 1:
                    // add node on left or right in position 2 | MIDDLE tree
                    if (newTree && newTree?.hasOwnProperty(finalNodeSide) && newTree[finalNodeSide]) {
                        // @ts-ignore
                        newTree[finalNodeSide].leftNode = setOneNode(newTree[finalNodeSide], 'left');
                        // @ts-ignore
                        newTree[finalNodeSide].rightNode = setOneNode(newTree[finalNodeSide], 'right');
                    }
                    break;
                case 2:
                    // add node on left or right in position 3 | LOW tree
                    const posOnePath = (newTree?.path[1] === 'L') ? 'leftNode' : 'rightNode';
                    console.log('posOnePath: ', newTree?.path);
                    if (newTree && newTree?.hasOwnProperty(posOnePath) && newTree[posOnePath]?.hasOwnProperty(finalNodeSide)) {
                        // @ts-ignore
                        console.log(newTree[posOnePath][finalNodeSide]);
                        // @ts-ignore
                        newTree[posOnePath][finalNodeSide].leftNode = setOneNode(newTree[posOnePath][finalNodeSide], 'left');
                        // @ts-ignore
                        newTree[posOnePath][finalNodeSide].rightNode = setOneNode(newTree[posOnePath][finalNodeSide], 'right');
                    }
                    break;
                case 3:
                    // add node on left or right in position 4
                    break;
            }
            console.log("newTree: ", newTree);
            return newTree;
        });

        setTreeUpdated(!treeUpdated);
    }

    const setOneNode = (parentNode: TreeNodeInterfaceWithPath, side: string): TreeNodeInterfaceWithPath => {
        const currentNodeLevel = parentNode.level + 1;
        const currentNodePath = [...parentNode.path];
        let newPathElement = '';
        switch (parentNode.nodePosition) {
            case 'center':
                newPathElement = 'C';
                break;
            case 'left':
                newPathElement = 'L';
                break;
            case 'right':
                newPathElement = 'R';
                break;
        }
        currentNodePath.push(newPathElement);

        const newTreeNode: TreeNodeInterfaceWithPath = {
            name: `${side} level ${currentNodeLevel}`,
            caption: '100 box',
            leftNode: null,
            rightNode: null,
            nodePosition: side,
            level: currentNodeLevel,
            path: currentNodePath,
        };
        return newTreeNode;
    };

    // const createNewPackage = (nodePosition: string, nodeLevel: number) => {
    //     const newTreeNodes = [
    //         {
    //             name: 'Left Child',
    //             caption: '100 box',
    //             leftNode: null,
    //             rightNode: null,
    //             nodePosition: "left",
    //             level: nodeLevel + 1,
    //         },
    //         {
    //             name: 'Right Child',
    //             caption: '100 box',
    //             leftNode: null,
    //             rightNode: null,
    //             nodePosition: "right",
    //             level: nodeLevel + 1,
    //         }
    //     ];
    //
    //     setTree((prevState) => {
    //         const newTree = prevState;
    //         if(newTree !== null) {
    //             switch (nodePosition) {
    //                 /* handle top of the tree if is alone: */
    //                 case 'center':
    //                     // if (newTree.leftNode == null) {
    //                     //     newTree.leftNode = newTreeNodes[0];
    //                     // }
    //                     // if (newTree.rightNode == null) {
    //                     //     newTree.rightNode = newTreeNodes[1];
    //                     // }
    //                     // break;
    //                     if(newTree["leftNode"] == null) {
    //                         newTree["leftNode"] = newTreeNodes[0];
    //                     }
    //                     if(newTree["rightNode"] == null) {
    //                         newTree["rightNode"] = newTreeNodes[1];
    //                     }
    //                     break;
    //                 /* add left node */
    //                 case 'left':
    //                     if (newTree.leftNode !== null) {
    //                         if (newTree.leftNode.leftNode == null) {
    //                             newTree.leftNode.leftNode = newTreeNodes[0];
    //                         }
    //                         if (newTree.leftNode.rightNode == null) {
    //                             newTree.leftNode.rightNode = newTreeNodes[1];
    //                         }
    //                         /* if left node on level 2 has value: */
    //                         else if (newTree.leftNode.leftNode !== null) {
    //                             if (newTree.leftNode.leftNode.leftNode == null) {
    //                                 newTree.leftNode.leftNode.leftNode = newTreeNodes[0];
    //                             }
    //                             if (newTree.leftNode.leftNode.rightNode == null) {
    //                                 newTree.leftNode.leftNode.rightNode = newTreeNodes[1];
    //                             }
    //                         }
    //                     }
    //                     break;
    //                 /* add right node */
    //                 case 'right':
    //                     if (newTree.rightNode !== null) {
    //                         if (newTree.rightNode.leftNode == null) {
    //                             newTree.rightNode.leftNode = newTreeNodes[0];
    //                         }
    //                         if (newTree.rightNode.rightNode == null) {
    //                             newTree.rightNode.rightNode = newTreeNodes[1];
    //                         }
    //                         /* if right node on level 2 has value: */
    //                         else if (newTree.rightNode.leftNode !== null) {
    //                             if (newTree.rightNode.leftNode.leftNode == null) {
    //                                 newTree.rightNode.leftNode.leftNode = newTreeNodes[0];
    //                             }
    //                             if (newTree.rightNode.leftNode.rightNode == null) {
    //                                 newTree.rightNode.leftNode.rightNode = newTreeNodes[1];
    //                             }
    //                         }
    //                     }
    //                     break;
    //             };
    //         }
    //         return newTree;
    //     });
    //     setTreeUpdated(!treeUpdated);
    // }

    const addPackage = (nodePosition: string, nodeLevel: number, nodePath: string[])=> {
        // createNewPackage(nodePosition, nodeLevel);
        createNewPackageInPath(nodePosition, nodeLevel, nodePath);
    };

    return(
        <div>
            {/*{renderNode(tree)}*/}
            {renderNodeUsingPath(treeWithPath)}
        </div>
    );
}

export default BinaryTree;
