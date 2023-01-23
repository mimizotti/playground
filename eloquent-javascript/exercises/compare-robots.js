const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

/*
Write a function compareRobots that takes two robots (and their starting
memory). It should generate 100 tasks and let each of the robots solve each of
these tasks. When done, it should output the average number of steps each robot
took per task.
*/

function compareRobots(robot1, memory1, robot2, memory2) {
  let robot1Turns= [];
  let robot2Turns = [];

  function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }

  function average(array) {
    return Math.floor(array.reduce((a, b) => a + b) / array.length);
  }

  for (let task = 0; task <= 100; task++) {
    let state = VillageState.random();

    let robot1Turn;
    robot1Turn = runRobot(state, robot1, memory1);
    robot1Turns.push(robot1Turn);

    let robot2Turn;
    robot2Turn = runRobot(state, robot2, memory2);
    robot2Turns.push(robot2Turn);
  }

  [robot1Turns, robot2Turns].map((e, i) => {
    console.log(`Robot ${i+1} took on average ${average(e)} turns`);
  })
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
