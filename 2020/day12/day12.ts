import { Vect } from "../common/Vect.ts";

enum Heading {
  east,
  south,
  west,
  north,
}

enum Action {
  north = "N",
  south = "S",
  east = "E",
  west = "W",
  left = "L",
  right = "R",
  forward = "F",
}

class MovingObject {
  public pos = new Vect();
  public heading = Heading.east;

  turn(degrees: number) {
    const turns = degrees / 90;
    this.heading += turns;

    if (this.heading < 0) {
      this.heading = Heading.north + 1 -
        Math.abs(this.heading % (Heading.north + 1));
    }

    if (this.heading > Heading.north) {
      this.heading = this.heading % (Heading.north + 1);
    }
  }

  performAction(action: Action, amount: number) {
    switch (action) {
      case Action.north: {
        this.pos.y += amount;
        break;
      }
      case Action.south: {
        this.pos.y -= amount;
        break;
      }
      case Action.east: {
        this.pos.x += amount;
        break;
      }
      case Action.west: {
        this.pos.x -= amount;
        break;
      }
    }
  }
}

class Ship1 extends MovingObject {
  performAction(action: Action, amount: number) {
    switch (action) {
      case Action.left: {
        this.turn(-1 * amount);
        break;
      }
      case Action.right: {
        this.turn(amount);
        break;
      }
      case Action.forward: {
        if (this.heading === Heading.north) this.pos.y += amount;
        if (this.heading === Heading.south) this.pos.y -= amount;
        if (this.heading === Heading.east) this.pos.x += amount;
        if (this.heading === Heading.west) this.pos.x -= amount;
        break;
      }
      default: {
        super.performAction(action, amount);
      }
    }
  }
}

class Waypoint extends MovingObject {
  constructor() {
    super();
    this.pos.x = 10;
    this.pos.y = 1;
  }

  performAction(action: Action, amount: number) {
    switch (action) {
      case Action.left: {
        this.pos.rotate(amount);
        break;
      }
      case Action.right: {
        this.pos.rotate(amount * -1);
        break;
      }
      default: {
        super.performAction(action, amount);
      }
    }
  }
}

export class Ship2 extends MovingObject {
  private waypoint = new Waypoint();

  performAction(action: Action, amount: number) {
    if (action === Action.forward) {
      const traj = new Vect(this.waypoint.pos.x, this.waypoint.pos.y);
      traj.multiply(amount);
      this.pos.add(traj);
    } else {
      this.waypoint.performAction(action, amount);
    }
  }
}

export const followInstructions = (
  instructions: string[],
  ship = new Ship1(),
) => {
  instructions.forEach((inst) => {
    const action = inst[0] as Action;
    const amount = Number(inst.slice(1));
    ship.performAction(action, amount);
  });

  return Math.ceil(ship.pos.mDistance());
};
