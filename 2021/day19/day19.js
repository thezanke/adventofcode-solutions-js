// generated by prepare script
class Beacon {
  points = [];
  scanners = [];

  addPoint(point) {
    this.points.push(point);
    this.scanners.push(point.scanner);
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

// Not sure why 5 is the magic number, it was just a guess
const SIMILARITY_THREASHOLD = 5;
const determineIfSimilar = (a1, a2) => {
  const unfound = [...a2];

  let count = 0;
  for (const el of a1) {
    const index = unfound.indexOf(el);

    if (index !== -1) {
      count += 1;

      if (count === SIMILARITY_THREASHOLD) {
        return true;
      }

      unfound.splice(index, 1);
    }
  }

  return false;
};

const findBeaconForPoint = (p1) => (beacon) => {
  if (beacon.scanners.includes(p1.scanner)) return false;

  const d1 = [...p1.distances.values()];

  return beacon.points.find((p2) => {
    const d2 = [...p2.distances.values()];
    return determineIfSimilar(d1, d2);
  });
};

const findBeacons = (scanners) => {
  const beacons = [];
  const scanPoints = scanners.flatMap((s) => s.detected);
  for (const scanPoint of scanPoints) {
    let beacon = beacons.find(findBeaconForPoint(scanPoint));

    if (!beacon) {
      beacon = new Beacon();
      beacons.push(beacon);
    }

    beacon.addPoint(scanPoint);
  }

  return beacons;
};

export const part1 = (input) => {
  const scanners = input.map((detected, id) => new Scanner(id, detected));
  return findBeacons(scanners).length;
};

export const part2 = (input) => {
  const scanners = input.map((detected, id) => new Scanner(id, detected));
  const beacons = findBeacons(scanners);

  // const s1 = scanners[0];
  // const s2 = scanners[1];

  // const shared = beacons.filter(b => )

  return false;
};