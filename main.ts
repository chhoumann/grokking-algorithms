import { binarySearch } from "./binarysearch.ts";
import { dijkstra } from "./dijkstra.ts";
import {
    calculateDistanceBetweenAllPoints,
    cosineSimilarity,
    euclidean,
    manhattan,
} from "./distances.ts";
import { DirectedGraph } from "./graph.ts";
import { breadthFirstSearch, depthFirstSearch } from "./graphsearch.ts";
import { knapsack } from "./knapsack.ts";
import { kNearestNeighbors } from "./knn.ts";
import { LinkedList } from "./linkedlist.ts";
import { quickSort } from "./quicksort.ts";
import { selectionSort } from "./selectionsort.ts";
import { findMinSetCover } from "./setcover.ts";
import { WeightedDirectedGraph } from "./weightedgraph.ts";

if (import.meta.main) {
    /* --- Binary Search --- */
    const list = new Array(10_000_000).fill(0).map((_, i) => i);

    console.log(`Binary Search Guess: ${binarySearch(list, 3)}`);
    console.log(
        "Worst case for O(log_2 n):",
        Math.round(Math.log2(list.length))
    );

    /* --- Linked List --- */

    const ll = new LinkedList<number>();
    for (let i = 0; i < 10_000; i++) {
        ll.Add(i);
    }

    /* --- Selection Sort --- */
    const ss_l = new Array(10)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100));
    const ss_l_copy = [...ss_l];

    console.log("Selection Sort:\n", selectionSort(ss_l), "\n", ss_l_copy);

    /* --- Quick Sort --- */
    const qs_l = new Array(10)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100));
    const qs_l_copy = [...qs_l];

    console.log("Quick Sort:\n", quickSort(qs_l), "\n", qs_l_copy);

    /* --- Graph Search Algorithms --- */
    const graph = new DirectedGraph<string>();
    graph
        .addNode("you")
        .addNode("alice")
        .addNode("bob")
        .addNode("claire")
        .addNode("anuj")
        .addNode("peggy")
        .addNode("thom")
        .addNode("jonny")
        .addEdge("you", "alice")
        .addEdge("you", "bob")
        .addEdge("you", "claire")
        .addEdge("bob", "anuj")
        .addEdge("bob", "peggy")
        .addEdge("alice", "peggy")
        .addEdge("claire", "thom")
        .addEdge("claire", "jonny")
        .addEdge("anuj", "thom")
        .addEdge("peggy", "thom")
        .addEdge("thom", "jonny");

    console.log(
        "Breadth First Search:",
        breadthFirstSearch(graph, "you", (node) => node === "jonny")
    );

    console.log(
        "Depth First Search:",
        depthFirstSearch(graph, "you", (node) => node === "jonny")
    );

    /* --- Dijkstra's Algorithm --- */
    const graph2 = new WeightedDirectedGraph<string>();
    graph2
        .addNode("Twin Peaks")
        .addNode("A")
        .addNode("B")
        .addNode("C")
        .addNode("D")
        .addNode("E")
        .addNode("Golden Gate Bridge")
        .addEdge("Twin Peaks", "A", 4)
        .addEdge("Twin Peaks", "B", 10)
        .addEdge("A", "D", 21)
        .addEdge("B", "C", 5)
        .addEdge("B", "E", 8)
        .addEdge("C", "D", 5)
        .addEdge("E", "D", 12)
        .addEdge("D", "Golden Gate Bridge", 4);

    const { distance, path } = dijkstra(
        graph2,
        "Twin Peaks",
        "Golden Gate Bridge"
    );
    console.log(
        `Dijkstra's Algorithm has cost ${distance} via path: ${path.join(
            " -> "
        )}.`
    );

    /* --- Greedy Programming: Set Cover --- */
    const universe = [1, 2, 3, 4, 5];
    const sets = [
        [1, 2, 3],
        [2, 4],
        [3, 4],
        [4, 5],
    ];
    console.log("Universe:", universe);
    console.log("Sets:", sets);
    console.log("Greedy set cover:", findMinSetCover(universe, sets));

    /* --- Dynamic Programming: Knapsack --- */
    const maxValue = knapsack(
        [
            { name: "guitar", weight: 1, value: 1500 },
            { name: "stereo", weight: 4, value: 3000 },
            { name: "laptop", weight: 3, value: 2000 },
            // Without the iPhone, the knapsack would be filled with the laptop and the guitar ($3500)
            // With the iPhone, the knapsack would be filled with the laptop and the iPhone ($4000)
            { name: "iphone", weight: 1, value: 2000 },
        ],
        4
    );

    console.log("Max value:", maxValue);

    /* --- K-Nearest-Neighbors --- */
    const points = [
        { featureValues: [1, 2, 3], label: "A" },
        { featureValues: [4, 5, 6], label: "B" },
        { featureValues: [7, 8, 9], label: "C" },
        { featureValues: [10, 11, 12], label: "D" },
        { featureValues: [13, 14, 15], label: "E" },
    ];

    const dist_euclid = calculateDistanceBetweenAllPoints(points, euclidean);
    const cosine_sim = calculateDistanceBetweenAllPoints(
        points,
        cosineSimilarity
    );
    const dist_manhattan = calculateDistanceBetweenAllPoints(points, manhattan);

    console.log("Euclidean Distance:", dist_euclid);
    console.log("Cosine Similarity:", cosine_sim);
    console.log("Manhattan Distance:", dist_manhattan);

    const knn = kNearestNeighbors(2, points.slice(1), points[0], euclidean);
    console.log("K-Nearest Neighbors:", knn);
}
