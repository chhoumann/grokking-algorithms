/*
Dijkstra's algorithm is a method for finding the shortest path between two nodes in a graph, by iteratively selecting the node with the smallest distance from the start node and updating the distances to its neighbors.

It works by maintaining a list of unvisited nodes, and a list of distances from the start node to each node. It then iterates over the unvisited nodes, and for each node, it finds the distance to each of its neighbors. If the distance to a neighbor is less than the current distance, it updates the distance to that neighbor.
*/

import { WeightedDirectedGraph } from "./weightedgraph.ts";

export function dijkstra<T>(
    graph: WeightedDirectedGraph<T>,
    from: T,
    to: T
): { distance: number, path: T[] } {
    const distances = new Map<T, number>();
    const previousNodes: Map<T, T | null> = new Map<T, T | null>();

    graph.getNodes().forEach((node) => {
        distances.set(node, Number.POSITIVE_INFINITY);
        previousNodes.set(node, null);
    });

    distances.set(from, 0);

    const unvisitedNodes = new Set(graph.getNodes());

    while (unvisitedNodes.size > 0) {
        const currentNode = Array.from(unvisitedNodes).sort(
            (a, b) => distances.get(a)! - distances.get(b)!
        )[0];

        unvisitedNodes.delete(currentNode);

        if (currentNode === to) {
            break;
        }

        const currentDistance = distances.get(currentNode)!;

        for (const neighbor of graph.getEdges(currentNode)) {
            const newDistanceToNeighbor = currentDistance + neighbor.weight;

            if (newDistanceToNeighbor < distances.get(neighbor.value)!) {
                distances.set(neighbor.value, newDistanceToNeighbor);
                previousNodes.set(neighbor.value, currentNode);
            }
        }
    }

    return {
        distance: distances.get(to)!,
        path: getShortestPath(previousNodes, from, to),
    };
}

function getShortestPath<T>(previousNodes: Map<T, T | null>, from: T, to: T): T[] {
    const path: T[] = [];
    let currentNode = to;

    while (currentNode !== from) {
        if (!currentNode) {
            throw new Error('Path not found');
        }

        path.unshift(currentNode);
        currentNode = previousNodes.get(currentNode)!;
    }

    // Add the start node at the beginning of the path
    path.unshift(from);

    return path;
}

