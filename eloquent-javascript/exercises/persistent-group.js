/*
Write a new class PGroup, similar to the Group class, which
stores a set of values. Like Group, it has add, delete, and has methods.

Its add method, however, should return a new PGroup instance with the given
member added and leave the old one unchanged. Similarly, delete creates a new
instance without a given member.

The class should work for values of any type, not just strings. It does not have
to be efficient when used with large amounts of values.

The constructor shouldn’t be part of the class’s interface (though you’ll
definitely want to use it internally). Instead, there is an empty instance,
PGroup.empty, that can be used as a starting value.
*/

class PGroup {
  constructor() {
    this.group = []
  }
  
  static empty = new PGroup;

  add(value) {
    const newGroup = new PGroup;
    newGroup.group = [...this.group, value];
    return newGroup;
  }

  delete(value) {
    const newGroup = new PGroup;
    newGroup.group = [...this.group]
    
    let filtered = newGroup.group.filter(function(e, index, arr) {
      return value != e;
    });
    
    newGroup.group = filtered;
    return newGroup
  }

  has(value) {
    let result = false;
    for (const i of this.group) {
      if (value === i) {
        result = true;
        break
      }
    }
    
    return result;
  }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
