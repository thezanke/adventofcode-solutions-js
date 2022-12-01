import { map } from 'lodash';

interface Point {
  x: number
  y: number
}

interface Intersection extends Point {
  totalSteps: number
}

enum DIRECTION {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
}

export const getNextSegment = (lastPoint: Point, nextMove: string) => {
  const prefix = nextMove[0];
  const distance = Number(nextMove.slice(1));
  const segment: Point[] = [];

  const { x, y } = lastPoint;

  for (let i = 1; i <= distance; i += 1) {
    switch (prefix) {
      case DIRECTION.UP:
        segment.push({ x, y: y - i });
        break;
      case DIRECTION.DOWN:
        segment.push({ x, y: y + i });
        break;
      case DIRECTION.LEFT:
        segment.push({ x: x - i, y });
        break;
      case DIRECTION.RIGHT:
        segment.push({ x: x + i, y });
        break;
      default:
        throw Error('Not a valid direction ' + prefix);
    }
  }

  return segment;
};

export const getWirePoints = (route: string[]) => {
  return route.reduce<Point[]>((points, nextMove) => {
    let lastPoint = points[points.length - 1];
    if (!lastPoint) lastPoint = { x: 0, y: 0 };
    points.push(...getNextSegment(lastPoint, nextMove));
    return points;
  }, []);
};

export const findIntersections = (wire1: Point[], wire2: Point[]) => {
  const intersections: Intersection[] = [];
  wire1.forEach(({ x, y }, i) => {
    const xPointIndex = wire2.findIndex(p => p.x === x && p.y === y);
    const xPoint = wire2[xPointIndex];

    if (xPoint) {
      intersections.push({ ...xPoint, totalSteps: i + xPointIndex + 2 });
    }
  });
  return intersections;
};

export const determineClosestIntersection = (intersections: Point[]) => {
  const distances = intersections.map(
    p => Math.abs(0 - p.x) + Math.abs(0 - p.y)
  );

  return Math.min(...distances);
};

export const solvePart1 = (input: [string[], string[]]) => {
  const [wire1, wire2] = input.map(getWirePoints);
  const intersections = findIntersections(wire1, wire2);
  return determineClosestIntersection(intersections);
};

export const determineShortestIntersection = (
  intersections: Intersection[]
) => {
  const stepsArr = map(intersections, 'totalSteps');
  return Math.min(...stepsArr);
};

export const solvePart2 = (input: [string[], string[]]) => {
  const [wire1, wire2] = input.map(getWirePoints);
  const intersections = findIntersections(wire1, wire2);
  return determineShortestIntersection(intersections);
};
