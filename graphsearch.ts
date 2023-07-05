/*
Graph search is a family of algorithms for searching a graph for a node that satisfies a given property.
The search starts at one node (usually called the root node) and ends when the desired node is found.

The two most common graph search algorithms are breadth-first search and depth-first search.

Breadth-first search starts at the root node and explores all the neighboring nodes.
It then explores all the nodes that can be reached from those nodes, and so on.

Depth-first search starts at the root node and explores as far as possible along each branch before backtracking.
It then explores the next branch, and so on.
*/

import { DirectedGraph } from "./graph.ts";

export function breadthFirstSearch<T>(
    graph: DirectedGraph<T>,
    from: T,
    predicate: (node: T) => boolean
): boolean {
    const queue: T[] = [from];

    const shouldContinue = () => queue.length > 0;
    const getNode = () => {
        const node = queue.shift();
        if (!node) throw new Error("Queue is empty");

        return node as NonNullable<T>;
    };
    const getEdges = (node: T) => graph.getEdges(node) as NonNullable<T>[];
    const addEdgeToFrontier = (edge: T) => queue.push(edge);

    return search(
        predicate,
        shouldContinue,
        getNode,
        getEdges,
        addEdgeToFrontier
    );
}

export function depthFirstSearch<T>(
    graph: DirectedGraph<T>,
    from: T,
    predicate: (node: T) => boolean
): boolean {
    const stack: T[] = [from];

    const shouldContinue = () => stack.length > 0;
    const getNode = () => {
        const node = stack.pop();
        if (!node) throw new Error("Stack is empty");

        return node as NonNullable<T>;
    };
    const getEdges = (node: T) => graph.getEdges(node) as NonNullable<T>[];
    const addEdgeToFrontier = (edge: T) => stack.push(edge);

    return search(
        predicate,
        shouldContinue,
        getNode,
        getEdges,
        addEdgeToFrontier
    );
}

function search<T>(
    predicate: (node: T) => boolean,
    shouldContinue: () => boolean,
    getNode: () => T,
    getEdges: (node: T) => T[],
    addEdgeToFrontier: (edge: T) => void
): boolean {
    const visited: T[] = [];

    while (shouldContinue()) {
        const node = getNode();

        if (predicate(node)) {
            return true;
        }

        if (visited.includes(node)) {
            continue;
        }

        visited.push(node);

        const edges = getEdges(node);
        for (const edge of edges) {
            addEdgeToFrontier(edge);
        }
    }

    return false;
}
