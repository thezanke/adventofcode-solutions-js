// generated by prepare script
import _ from "lodash";
class Beacon {
  points = [];

  constructor(initialPoint) {
    this.points.push(initialPoint);
  }
}

class ScanPoint {
  distances = new Map();

  constructor([x, y, z], scanner) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.scanner = scanner;
  }

  toString() {
    const { x, y, z } = this;
    return `[${x}, ${y}, ${z}]`;
  }

  getDistances() {
    for (const point of this.scanner.detected.filter((p) => p !== this)) {
      if (this.distances.get(point)) continue;

      let dist = Math.abs(this.x - point.x);
      dist += Math.abs(this.y - point.y);
      dist += Math.abs(this.z - point.z);

      this.distances.set(point, dist);
      point.distances.set(this, dist);
    }
  }
}

class Scanner {
  constructor(id, detected) {
    this.id = id;
    this.detected = detected.map((xyz) => new ScanPoint(xyz, this));
    this.getDistances();
  }

  getDistances() {
    this.detected.forEach((d) => d.getDistances());
  }

  toString() {
    const detected = this.detected.map((b) => `   ${b}`).join(",\n");

    return `Scanner ${this.id} [\n${detected}\n]`;
  }
}

const findBeaconForPoint = (p1) => (beacon) => {
  const d1 = [...p1.distances.values()];

  return beacon.points.find((p2) => {
    const d2 = [...p2.distances.values()];
    const similarities = _.intersection(d1, d2);

    return similarities.length > 4;
  });
};

export const part1 = (input) => {
  const scanners = input.map((detected, id) => new Scanner(id, detected));

  const beacons = [];
  const scanPoints = scanners.flatMap((s) => s.detected);
  for (const scanPoint of scanPoints) {
    let beacon = beacons.find(findBeaconForPoint(scanPoint));

    if (beacon) {
      beacon.points.push(scanPoint);
    } else {
      beacon = new Beacon(scanPoint);
      beacons.push(beacon);
    }
  }

  return beacons.length;
  //   s1.detected.forEach((p1) => {
  //     const d1 = [...s1.distances.get(p1).values()];

  //     let d2;
  //     let similarities;
  //     const found = s2.detected.find((p2) => {
  //       d2 = [...s2.distances.get(p2).values()];
  //       similarities = _.intersection(d1, d2);
  //       return similarities.length > 4;
  //     });
  //     console.log(p1);
  //     console.log(found);
  //     console.log([...similarities]);
  //   });
  // }

  return false;
};

export const part2 = (input) => {
  return false;
};
