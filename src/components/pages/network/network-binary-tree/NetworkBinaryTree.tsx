import React from 'react';
import {BinaryTreeNodeInterface, ParentNodeInfo} from "object-types/user-interfaces";
import "./NetworkBinaryTree.css";
import NetworkTreeNode from "../network-tree-node/NetworkTreeNode";

interface NetworkBinaryTreeProps {
    rootNode: BinaryTreeNodeInterface | null;
    setSidebarAddNewUserOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
    setParentNodeInfo: React.Dispatch<React.SetStateAction<ParentNodeInfo>>;
}

function assignNodeAttributes(node: BinaryTreeNodeInterface | null, level: number, position: string, path: string[]): BinaryTreeNodeInterface | null{
    if (node === null) { return null; }
    switch(position) {
        case "root":
            node.path = ["C"];
            break;
        case "left":
            node.path = [...path, "L"];
            break;
        case "right":
            node.path = [...path, "R"];
            break;
        default:
            node.path = [];
            break;
    }

    node.nodeLevel = level;
    node.nodePosition = position;
    assignNodeAttributes(node.left, level + 1, "left", node.path);
    assignNodeAttributes(node.right, level + 1, "right", node.path);
    return node;
}

export function NetworkBinaryTree({rootNode, setSidebarAddNewUserOpenCallback, setParentNodeInfo} : NetworkBinaryTreeProps) {
    const [treeWithExtraAttributes, setTreeWithExtraAttributes] = React.useState<BinaryTreeNodeInterface | null>(null);

    /*
    * Populates user network object on component init,
    * and re-renders component if new object network object is passed in
    * */
    React.useEffect(()=>{
        setTreeWithExtraAttributes(assignNodeAttributes(rootNode, 0, "root", []))
    }, [treeWithExtraAttributes]);


    /*
    * Checking which class names should given node have based on its nodeLevel
    * */
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

    /*
    * Add new node package.
    * Should send api request to add new package
    * */
    const addPackage = (nodePosition: string, nodeLevel: number, nodePath: string[])=> {
        // TODO: sends api post request to generate new package in that place
        console.log("node path: ", nodePath);
        console.log("nodePosition: ", nodePosition , " nodeLevel: ", nodeLevel);
    };

     /*
     * Renders root node and then recursively renders each children node from tree
     * includes node path parameter:
     * */
    const renderNode = (node: BinaryTreeNodeInterface) => {
        if (!node) return null;

        let treeWrapperClass = "-1";
        if (node.nodeLevel) {
            treeWrapperClass = getTreeLevelClass(node.nodeLevel);
        }
        return (
            <div className={`tree-wrapper ${treeWrapperClass}`}>
                <NetworkTreeNode
                    setSidebarAddNewUserOpenCallback={setSidebarAddNewUserOpenCallback}
                    setParentNodeInfo={setParentNodeInfo}
                    addPackageCallback={addPackage}
                    node={node}
                    renderNodeRecursiveCallback={renderNode}
                />
            </div>
        )
    }

    return (
        <div>
            {
                (treeWithExtraAttributes && treeWithExtraAttributes.id > -1) ?
                    renderNode(treeWithExtraAttributes)
                    :
                    (<div className={"tree-wrapper"}>No network</div>)
            }
        </div>
    )
}

export default NetworkBinaryTree;
