import { Point } from "./Point.ts";

type Distance = Map<Point, Map<Point, number>>;

export function calculateDistanceBetweenAllPoints(
    points: Point[],
    fn: (a: Point, b: Point) => number
) {
    const distances: Distance = new Map();

    for (let i = 0; i < points.length; i++) {
        distances.set(points[i], new Map());
        for (let j = 0; j < points.length; j++) {
            distances.get(points[i])!.set(points[j], 0);
        }
    }

    for (let i = 0; i < points.length; i++) {
        for (let j = i; j < points.length; j++) {
            const distance = fn(points[i], points[j]);

            distances.get(points[i])!.set(points[j], distance);
            distances.get(points[j])!.set(points[i], distance);
        }
    }

    return distances;
}

export function euclidean(pointA: Point, pointB: Point) {
    const sumOfSquares = pointA.featureValues.reduce((sum, value, index) => {
        return sum + Math.pow(value - pointB.featureValues[index], 2);
    }, 0);

    return Math.sqrt(sumOfSquares);
}

export function cosineSimilarity(pointA: Point, pointB: Point) {
    const _dotProduct = dotProduct(pointA, pointB);
    const magnitudeA = magnitude(pointA);
    const magnitudeB = magnitude(pointB);

    if (magnitudeA === 0 || magnitudeB === 0) {
        throw new Error(
            "Cannot compute cosine similarity: one or both of the vectors have a magnitude of zero."
        );
    }

    return _dotProduct / (magnitudeA * magnitudeB);
}

function dotProduct(pointA: Point, pointB: Point) {
    return pointA.featureValues.reduce((sum, value, index) => {
        return sum + value * pointB.featureValues[index];
    }, 0);
}

function magnitude(point: Point) {
    return Math.sqrt(
        point.featureValues.reduce((sum, value) => {
            return sum + Math.pow(value, 2);
        }, 0)
    );
}

export function manhattan(pointA: Point, pointB: Point) {
    const sumOfAbsoluteDifferences = pointA.featureValues.reduce(
        (sum, value, index) => {
            return sum + Math.abs(value - pointB.featureValues[index]);
        },
        0
    );

    return sumOfAbsoluteDifferences;
}
