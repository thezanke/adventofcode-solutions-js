export type Vec2d<T = number> = [x: T, y: T]
export type Vec3d<T = number> = [x: T, y: T, z: T]
export type NestedArray<T> = Array<T | NestedArray<T>>
