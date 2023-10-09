import {TreeNodeInterface} from "./binary-tree/BinaryTree";



export interface TreeNodeInterfaceWithPath extends TreeNodeInterface {
    leftNode: TreeNodeInterfaceWithPath | null;
    rightNode: TreeNodeInterfaceWithPath | null;
    path: string[];
}

export const singleNodeTreeCenterWithPath: TreeNodeInterfaceWithPath = {
    name: 'Bartek',
    caption: 'caption',
    nodePosition: 'center',
    level: 0,
    leftNode: null,
    rightNode: null,
    path: [],
}

export const singleNodeLevelTwoLeftAlphaWithPath: TreeNodeInterfaceWithPath = {
    name: 'Andrew',
    caption: 'Package Alpha',
    nodePosition: 'left',
    level: 2,
    leftNode: null,
    rightNode: null,
    path: ['C','L'],
}

export const singleNodeLevelTwoRightAlphaWithPath: TreeNodeInterfaceWithPath = {
    name: 'Stew',
    caption: 'Package Alpha',
    nodePosition: 'right',
    level: 2,
    leftNode: null,
    rightNode: null,
    path: ['C','L'],
}

export const singleNodeLevelTwoLeftBetaWithPath: TreeNodeInterfaceWithPath = {
    name: 'Steven',
    caption: 'Package Beta',
    nodePosition: 'left',
    level: 2,
    leftNode: null,
    rightNode: null,
    path: ['C','R']
}

export const singleNodeLevelTwoRightBetaWithPath: TreeNodeInterfaceWithPath = {
    name: 'Richard',
    caption: 'Package Beta',
    nodePosition: 'right',
    level: 2,
    leftNode: null,
    rightNode: null,
    path: ['C','R']
}

export const sevenNodesThreeWithPath: TreeNodeInterfaceWithPath = {
    name: 'Bartek',
    caption: 'The boss',
    nodePosition: 'center',
    level: 0,
    path: [],
    leftNode: {
        level: 1,
        name: 'left package',
        caption: '100 box',
        leftNode: singleNodeLevelTwoLeftAlphaWithPath,
        rightNode: singleNodeLevelTwoRightAlphaWithPath,
        nodePosition: "left",
        path: ['C','L'],
    },
    rightNode: {
        level: 1,
        name: 'Right package',
        caption: '100 box',
        leftNode: singleNodeLevelTwoLeftBetaWithPath,
        rightNode: singleNodeLevelTwoRightBetaWithPath,
        nodePosition: "right",
        path: ['C','R'],
    },
};

export const threeNodesThreeWithPath: TreeNodeInterfaceWithPath = {
    name: 'Bartek',
    caption: 'The boss',
    nodePosition: 'center',
    level: 0,
    path: [],
    leftNode: {
        level: 1,
        name: 'left package',
        caption: '100 box',
        leftNode: null,
        rightNode: null,
        nodePosition: "left",
        path: ['C'],
    },
    rightNode: {
        level: 1,
        name: 'Right package',
        caption: '100 box',
        leftNode: null,
        rightNode: null,
        nodePosition: "right",
        path:['C']
    },
};
