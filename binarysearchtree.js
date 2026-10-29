class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildtree(array);
    }

    includes(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) {
                return true;
            }
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    insert(value) {
        const newNode = new Node(value);
        let current = this.root;
        let parent = null;
        while (current !== null) {
            parent = current;
            if (value === current.data) {
                return 'already exists'
            }
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }

        }

        if (value < parent.data) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    }

    deleteItem(value) {
        let current = this.root;
        if (current === null) return null;

        if (value < current.data) {
            current.left = this.deleteItem(value);
            return current;
        } else if (value > current.data) {
            current.right = this.deleteItem(value);
            return current
        }

        if (current.left === null) {
            if (current === this.root) this.root = current.right;
            return current.right;
        } else if (current.right === null) {
            if (current === this.root) this.root = current.left;
            return current.left;
        }

        let successorP = current;
        let successor = current.right;

        while (successor.left !== null) {
            successorP = successor;
            successor = successor.left;
        }

        current.data = successor.data;

        if (successorP !== current) {
            successorP.left = successor.right;
        } else {
            successorP.right = successor.right
        }
        return current;
    }

    levelOrderForEah(callback) {
        if (typeof callback !== 'function') {
            throw new Error('a callback function is required');
        }

        if (this.root === null) return;

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();
            callback(current);
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
    }

    inOrderForEach(callback, printOrder = []) {
        if (typeof callback !== 'argument') {
            throw new Error('needs an argument');
        }
        let current = this.root;
        if (current !== null) {
            preOrderForEach(current.left, printOrder);
            printOrder.push(current.data);
            preOrderForEach(current.right, printOrder);
        }
        return printOrder;
    }
    preOrderForEach(callback, printOrder = []) {
        if (typeof callback !== 'argument') {
            throw new Error('needs an argument');
        }
        let current = this.root;
        if (current !== null) {
            printOrder.push(current.data);
            preOrderForEach(current.left, printOrder);
            preOrderForEach(current.right, printOrder);
        }
        return printOrder;
        
    }
    postOrderforEach(callback, printOrder = []) {
        if (typeof callback !== 'argument') {
            throw new Error('needs an argument');
        }
        let current = this.root;
        if (current !== null) {
            preOrderForEach(current.left, printOrder);
            preOrderForEach(current.right, printOrder);
            printOrder.push(current.data);
        }
        return printOrder;
    }
    height(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) {
                return current
            }
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (current === null) return -1;
        const leftHeight = this.height(current.left);
        const rightHeight = this.height(current.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }
    depth(value) {
        let current = this.root;
        let distance = 0;

        while (current !== null) {
            if (value === current.data) {
                distance++;
                return distance
            } else if (value < current.data) {
                current = current.left;
            } else if (value > current.data) {
                current = current.right;
            } else {
                return undefined;
            }
        }
    }
    isBalanced() {}
    reBalance() {}
}


function mergeArray(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if(left[leftIndex] < right[rightIndex]) {
            if (result.length === 0 || left[leftIndex] !== result[result.length - 1]) {
                result.push(left[leftIndex]);
            }
            leftIndex++;
        } else if (left[leftIndex] > right[rightIndex]) {
            if (result.length === 0 || right[rightIndex] !== result[result.length - 1]) {
                result.push(right[rightIndex]);
            }
            rightIndex++;
        } else {
            if (result.length === 0 || left[leftIndex] !== result[result.length - 1]) {
                result.push(left[leftIndex]);
            }
            leftIndex++;
            rightIndex++;
        }
    }

    const appendRemaining = (arr, index) => {
        while (index < arr.length) {
            if (result.length === 0 || arr[index] !== result[result.length - 1]) {
                result.push(arr[index]);
            }
            index++;
        }
    };

    appendRemaining(left, leftIndex);
    appendRemaining(right, rightIndex);

    return result;
}

function mergeSort(array) {
    if (array.length <= 1) return array;
    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));
    return mergeArray(left, right);
}

function buildtreeRecursive(array, start, end) {
    if (start > end) return null;
    let mid = Math.floor(start + (end - start) / 2);
    let root = new Node(array[mid]);
    
    root.left = buildtreeRecursive(array, start, mid - 1);
    root.right = buildtreeRecursive(array, mid + 1, end);

    return root;
}

function buildtree(array) {
    let sortedArray = mergeSort(array);
    return buildtreeRecursive(sortedArray, 0, sortedArray.length - 1);
}


console.log(buildtree([3,1,5,7,10,30,2,3]))