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
    }
  }
}

export const followInstructions1 = (instructions: string[]) => {
  const ship = new MovingObject();

  instructions.forEach((inst) => {
    const action = inst[0] as Action;
    const amount = Number(inst.slice(1));
    ship.performAction(action, amount);
  });

  return ship.pos;
};
