// generated by prepare script
const MATCHER =
  /(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/;

export const transformInput = (o) => {
  return o.split(/\n/).map((l) => {
    let [, str, x1, x2, y1, y2, z1, z2] = l.match(MATCHER);

    return [
      str === "on",
      parseInt(x1, 10),
      parseInt(y1, 10),
      parseInt(z1, 10),
      parseInt(x2, 10) + 1,
      parseInt(y2, 10) + 1,
      parseInt(z2, 10) + 1,
    ];
  });
};

export class Cuboid {
  constructor(x1, y1, z1, x2, y2, z2) {
    this.points = [
      { x: x1, y: y1, z: z1 },
      { x: x2, y: y1, z: z1 },
      { x: x1, y: y2, z: z1 },
      { x: x2, y: y2, z: z1 },
      { x: x1, y: y1, z: z2 },
      { x: x2, y: y1, z: z2 },
      { x: x1, y: y2, z: z2 },
      { x: x2, y: y2, z: z2 },
    ];
  }

  get height() {
    return Math.abs(this.points[0].y - this.points[7].y);
  }

  get width() {
    return Math.abs(this.points[0].x - this.points[7].x);
  }

  get depth() {
    return Math.abs(this.points[0].z - this.points[7].z);
  }

  get area() {
    return this.height * this.width * this.depth;
  }

  get center() {
    return {
      x: this.points[0].x + this.width / 2,
      y: this.points[0].y + this.height / 2,
      z: this.points[0].z + this.depth / 2,
    };
  }

  getContained(...points) {
    return points.filter((p) => {
      if (p.x < this.points[0].x) return false;
      if (p.x >= this.points[7].x) return false;
      if (p.y < this.points[0].y) return false;
      if (p.y >= this.points[7].y) return false;
      if (p.z < this.points[0].z) return false;
      if (p.z >= this.points[7].z) return false;

      return true;
    });
  }
}

export const getRemainingCuboids = (c2, c1) => {
  const [c2p1, c2p2, c1p1, c1p2] = [
    c2.points[0],
    c2.points[7],
    c1.points[0],
    c1.points[7],
  ];

  const noInteraction =
    c2p2.x <= c1p1.x ||
    c2p1.x >= c1p2.x ||
    c2p2.y <= c1p1.y ||
    c2p1.y >= c1p2.y ||
    c2p2.z <= c1p1.z ||
    c2p1.z >= c1p2.z;

  if (noInteraction) return [c1];

  const cubes = [];

  if (c2p1.y > c1p1.y) {
    cubes.push(new Cuboid(c1p1.x, c1p1.y, c1p1.z, c1p2.x, c2p1.y, c1p2.z));
  }

  if (c2p2.y < c1p2.y) {
    cubes.push(new Cuboid(c1p1.x, c2p2.y, c1p1.z, c1p2.x, c1p2.y, c1p2.z));
  }

  const minY = c2p1.y >= c1p1.y ? c2p1.y : c1p1.y;
  const maxY = c2p2.y <= c1p2.y ? c2p2.y : c1p2.y;

  if (c2p1.z > c1p1.z) {
    cubes.push(new Cuboid(c1p1.x, minY, c1p1.z, c1p2.x, maxY, c2p1.z));
  }

  if (c2p2.z < c1p2.z) {
    cubes.push(new Cuboid(c1p1.x, minY, c2p2.z, c1p2.x, maxY, c1p2.z));
  }

  const minZ = c2p1.z >= c1p1.z ? c2p1.z : c1p1.z;
  const maxZ = c2p2.z <= c1p2.z ? c2p2.z : c1p2.z;

  if (c2p1.x > c1p1.x) {
    cubes.push(new Cuboid(c1p1.x, minY, minZ, c2p1.x, maxY, maxZ));
  }

  if (c2p2.x < c1p2.x) {
    cubes.push(new Cuboid(c2p2.x, minY, minZ, c1p2.x, maxY, maxZ));
  }

  return [...cubes];
};

export const getCuboidsForInput = (input) => {
  const cubes = [];

  for (const entry of input) {
    const [on, ...cords] = entry;

    const c1 = new Cuboid(...cords);

    for (let i = cubes.length - 1; i >= 0; i -= 1) {
      const c2 = cubes[i];
      cubes.splice(i, 1, ...getRemainingCuboids(c1, c2));
    }

    if (on) cubes.push(c1);
  }

  return cubes;
};

export const part1 = (input) => {
  const cuboids = getCuboidsForInput(input);
  return cuboids.reduce((t, c) => t + c.area, 0);
};

export const part2 = (input) => {
  const cuboids = getCuboidsForInput(input);
  return cuboids.reduce((t, c) => t + c.area, 0);
};
