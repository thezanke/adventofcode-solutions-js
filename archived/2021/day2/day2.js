export const part1 = (directions) => {
  const pos = { x: 0, y: 0 };

  for (const [dir, dist] of directions) {
    switch (dir) {
      case 'forward': {
        pos.x += dist;
        break;
      }
      case 'up': {
        pos.y -= dist;
        break;
      }
      case 'down': {
        pos.y += dist;
        break;
      }
    }
  }

  return pos;
};

export const part2 = (directions) => {
  const pos = { x: 0, y: 0, a: 0 };

  for (const [dir, dist] of directions) {
    switch (dir) {
      case 'forward': {
        pos.x += dist;
        pos.y += pos.a * dist;
        break;
      }
      case 'up': {
        pos.a -= dist;
        break;
      }
      case 'down': {
        pos.a += dist;
        break;
      }
    }
  }

  return pos;
};
