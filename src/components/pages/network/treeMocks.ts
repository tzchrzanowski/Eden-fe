import {TreeNodeInterface} from "./binary-tree/BinaryTree";

export const singleNodeTreeCenter: TreeNodeInterface = {
    name: 'Bartek',
    caption: 'caption',
    nodePosition: 'center',
    level: 0,
    leftNode: null,
    rightNode: null,
}

export const singleNodeLevelTwoLeftAlpha: TreeNodeInterface = {
    name: 'Andrew',
    caption: 'Package Alpha',
    nodePosition: 'left',
    level: 2,
    leftNode: null,
    rightNode: null,
}

export const singleNodeLevelTwoRightAlpha: TreeNodeInterface = {
    name: 'Stew',
    caption: 'Package Alpha',
    nodePosition: 'right',
    level: 2,
    leftNode: null,
    rightNode: null,
}

export const singleNodeLevelTwoLeftBeta: TreeNodeInterface = {
    name: 'Steven',
    caption: 'Package Beta',
    nodePosition: 'left',
    level: 2,
    leftNode: null,
    rightNode: null,
}

export const singleNodeLevelTwoRightBeta: TreeNodeInterface = {
    name: 'Richard',
    caption: 'Package Beta',
    nodePosition: 'right',
    level: 2,
    leftNode: null,
    rightNode: null,
}

export const sevenNodesThree: TreeNodeInterface = {
    name: 'Bartek',
    caption: 'The boss',
    nodePosition: 'center',
    level: 0,
    leftNode: {
        level: 1,
        name: 'left package',
        caption: '100 box',
        leftNode: singleNodeLevelTwoLeftAlpha,
        rightNode: singleNodeLevelTwoRightAlpha,
        nodePosition: "left",
    },
    rightNode: {
        level: 1,
        name: 'Right package',
        caption: '100 box',
        leftNode: singleNodeLevelTwoLeftBeta,
        rightNode: singleNodeLevelTwoRightBeta,
        nodePosition: "right",
    },
};

export const threeNodesThree: TreeNodeInterface = {
    name: 'Bartek',
    caption: 'The boss',
    nodePosition: 'center',
    level: 0,
    leftNode: {
        level: 1,
        name: 'left package',
        caption: '100 box',
        leftNode: null,
        rightNode: null,
        nodePosition: "left",
    },
    rightNode: {
        level: 1,
        name: 'Right package',
        caption: '100 box',
        leftNode: null,
        rightNode: null,
        nodePosition: "right",
    },
};
