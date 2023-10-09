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


interface BinaryTreePropsWithPath {
    rootNodeWithPath: TreeNodeInterfaceWithPath | null;
}

export function BinaryTree({rootNodeWithPath} : BinaryTreePropsWithPath) {
    const [treeWithPath, setTreeWithPath] = React.useState<TreeNodeInterfaceWithPath | null>(rootNodeWithPath);
    const [treeUpdated, setTreeUpdated] = React.useState(false);

    React.useEffect(()=>{
        console.log("Tree updated");
    }, [treeUpdated]);

    /*
    * Renders root node and then recursively renders each children node from tree
    * includes node path parameter:
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
                    console.log("symbol : ", newTree?.path);
                    const posOnePath = (nodePath[1] === 'L') ? 'leftNode' : 'rightNode';
                    console.log('posOnePath: ', posOnePath);
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

    const addPackage = (nodePosition: string, nodeLevel: number, nodePath: string[])=> {
        createNewPackageInPath(nodePosition, nodeLevel, nodePath);
    };

    return(
        <div>
            {renderNodeUsingPath(treeWithPath)}
        </div>
    );
}

export default BinaryTree;
