import { Point } from "./Point.ts";

export function kNearestNeighbors(
    k: number,
    points: Point[],
    queryPoint: Point,
    distanceFn: (a: Point, b: Point) => number
) {
    const distances = points.map((point) => {
        return {
            point,
            distance: distanceFn(point, queryPoint),
        };
    });

    distances.sort((a, b) => a.distance - b.distance);

    return distances.slice(0, k);
}
