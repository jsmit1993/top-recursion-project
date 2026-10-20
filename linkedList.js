class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.headNode = null; 
        this.length = 0;      
    }
    
    append(value) {
        const newNode = new Node(value);
        if (!this.headNode) {
            this.headNode = newNode;
        } else {
            let current = this.headNode;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.headNode;
        this.headNode = newNode;
        this.length++;
    }

    size() {
        return this.length;
    }

    head() {
        return this.headNode || undefined;
    }

    tail() {
        if (!this.headNode) return undefined;
        let current = this.headNode;
        while (current.next) {
            current = current.next; 
        }
        return current;
    }

    at(index) {
        if (index < 0 || this.length <= index) return undefined; 

        let current = this.headNode;
        let count = 0;
        while (count < index) {
            current = current.next;
            count++;
        }
        return current;
    }

    
    pop() {
        if (!this.headNode) return undefined; 
        
        let current = this.headNode;
        
        if (!current.next) { 
            this.headNode = null;
            this.length--;
            return current;
        }
        
        
        let previous = null;
        while (current.next) {
            previous = current;
            current = current.next;
        }
        
        previous.next = null; 
        this.length--;
        return current; 
    }

    toString() {
        if (!this.headNode) return "null";
        
        let result = "";
        let current = this.headNode;
        
        while (current) {
            result += `( ${current.value} ) -> `;
            current = current.next;
        }
        
        result += "null";
        return result;
    }
}


const myList = new LinkedList;

myList.append('apple');
myList.append('cat');
myList.append('house');

console.log(myList.toString());