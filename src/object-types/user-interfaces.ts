
/*
* Used for mocked-up binary tree
* */
export interface User {
    role_id: string;
    username: string;
    user_photo: string;
    user_id: string;
}

/*
* Used for mocked-up binary tree
* */
export interface UserBinaryTree {
    email: string,
    first_name: string,
    id: number,
    last_name: string,
    left_child: UserBinaryTree | null,
    right_child: UserBinaryTree | null,
    parent: number,
    profile_picture_url: string,
    username: string,
}

/*
* Used for real binary tree from database:
* */
export interface BinaryTreeNodeInterface {
    id: number;
    left: BinaryTreeNodeInterface | null;
    right: BinaryTreeNodeInterface | null;
    user: UserInterface;
    nodeLevel?: number;
    nodePosition?: string;
    path?: string[];
}

/*
* Used for real binary tree from database:
* */
export interface UserInterface {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    left_child: number;
    right_child: number;
    parent: number;
    profile_picture_url: string;
    username: string;
}

export interface ParentNodeInfo {
    parentId: number,
    parentUsername: string,
}
