/*
Write a class called Group (since Set is already taken). Like Set, it has add,
delete, and has methods. Its constructor creates an empty group, add adds a
value to the group (but only if it isn’t already a member), delete removes its
argument from the group (if it was a member), and has returns a Boolean value
indicating whether its argument is a member of the group.

Use the === operator, or something equivalent such as indexOf, to determine
whether two values are the same.

Give the class a static from method that takes an iterable object as argument
and creates a group that contains all the values produced by iterating over it.
*/

class Group {
  constructor() {
    this.group = [];
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
      let filtered = this.group.filter(function(value, index, arr){
        value != n;
      });

      this.group = filtered;
    }
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
