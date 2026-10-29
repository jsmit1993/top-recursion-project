class HashMap {
    constructor(capacity = 16, load_factor = 0.75) {
        this.load_factor = load_factor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity).fill(nul).map(() => []);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i<key.length; i++) {
            hashCode = primeNumber * hashCode +key.charCodeAt(i);
        }
    }

    checkIndex(index) {
        if (index < 0 || index > this.buckets.length) {
            throw new Error("Trying to access out of bounds");
        }
    }

    set(key, value) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][0] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size > this.capacity * this.load_factor) {
            this.grow();
        }
    }
    get(key) {
        const index = this.hash(key);
        this. checkIndex(index);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }
    has(key) {
        return this.get(key) !== null;
    }
    remove(key) {
        const index = this.hash(key);
        this.checkIndex(index);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }
    length() {
        return this.size;
    }
    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
    keys() {
        const keysArray = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                keysArray.push(pair[0]);
            }
        }
        return keysArray;
    }
    values() {
        const valuesArray = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                valuesArray.push(pair[1]);
            }
        }
        return valuesArray;
    }
    entries() {
        const entriesArray = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                entriesArray.push([pair.slice()]);
            }
        }
        return entriesArray;
    }
    grow() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (const bucket of oldBuckets) {
            for (const pair of bucket) {
                this.set(pair[0], pair[1]);
            }
        }
    }
}