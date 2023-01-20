/*
Make the Group class from the previous exercise iterable. Refer to the section
about the iterator interface earlier in the chapter if you aren’t clear on the
exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return the
iterator created by calling the Symbol.iterator method on the array. That would
work, but it defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified during
iteration.
*/

class Group {
  constructor() {
    this.group = [];
  }

  [Symbol.iterator]() {
    return new GroupIterator(this.group);
  }

  static from(arr) {
    const group = new Group;
    for (const i of arr) {
      group.add(i);
    }

    return group;
  }

  has(n) {
    let result = false;
    for (const i of this.group) {
      if (n === i) {
        result = true;
        break
      }
    }

    return result;
  }

  add(n) {
    if (!this.has(n)) {
      this.group.push(n);
    }
  }

  delete(n) {
    if (this.has(n)) {
      let filtered = this.group.filter(function (value, index, arr) {
        return value != n;
      });

      this.group = filtered;
    }
  }
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index <= this.group.length - 1) {
      let result = { value: this.group[this.index], done: false };

      this.index++;

      return result;
    }

    return { done: true };
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
