export default class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.buckets.length;
  }

  set(key, value) {
    let index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let pair of this.buckets[index]) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }
    this.buckets[index].push({ key, value });

    if (this.entries().length > this.capacity * this.loadFactor) {
      this.capacity *= 2;
      let newArray = new Array(this.capacity);
      newArray = [...this.buckets];
      this.buckets = newArray;
    }
  }

  get(key) {
    let index = this.hash(key);
    if (!this.buckets[index]) {
      return null;
    }

    for (let pair of this.buckets[index]) {
      if (pair.key === key) {
        return pair.value;
      }
    }

    return null;
  }

  has(key) {
    let index = this.hash(key);
    if (this.buckets[index]) {
      for (let pair of this.buckets[index]) {
        if (pair.key === key) {
          return true;
        }
      }
    }

    return false;
  }

  remove(key) {
    let index = this.hash(key);
    if (this.buckets[index]) {
      this.buckets[index] = null;
      return true;
    }

    return false;
  }

  length() {
    let count = 0;
    for (let entry of this.buckets) {
      if (entry) {
        count++;
      }
    }

    return count;
  }

  clear() {
    this.buckets.clear();
  }

  keys() {
    let keys = [];
    for (let entry of this.buckets) {
      if (!entry) {
        continue;
      }

      for (let pair of entry) {
        keys.push(pair.key);
      }
    }

    return keys;
  }

  values() {
    let values = [];
    for (let entry of this.buckets) {
      if (!entry) {
        continue;
      }

      for (let pair of entry) {
        values.push(pair.value);
      }
    }

    return values;
  }

  entries() {
    let entries = [];
    for (let entry of this.buckets) {
      if (!entry) {
        continue;
      }

      for (let pair of entry) {
        entries.push([pair.key, pair.value]);
      }
    }

    return entries;
  }
}
