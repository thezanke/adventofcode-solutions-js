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
}

export const followInstructions1 = (instructions: string[]) => {
  const ship = new MovingObject();

  instructions.forEach((inst) => {
    const action = inst[0] as Action;
    const dist = Number(inst.slice(1));

    switch (action) {
      case Action.north: {
        ship.pos.y += dist;
        break;
      }
      case Action.south: {
        ship.pos.y -= dist;
        break;
      }
      case Action.east: {
        ship.pos.x += dist;
        break;
      }
      case Action.west: {
        ship.pos.x -= dist;
        break;
      }
      case Action.left: {
        ship.turn(-1 * dist);
        break;
      }
      case Action.right: {
        ship.turn(dist);
        break;
      }
      case Action.forward: {
        if (ship.heading === Heading.north) ship.pos.y += dist;
        if (ship.heading === Heading.south) ship.pos.y -= dist;
        if (ship.heading === Heading.east) ship.pos.x += dist;
        if (ship.heading === Heading.west) ship.pos.x -= dist;
        break;
      }
    }
  });

  return ship.pos;
};
