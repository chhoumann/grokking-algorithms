import { binarySearch } from "./binarysearch.ts";
import { LinkedList } from "./linkedlist.ts";
import { quickSort } from "./quicksort.ts";
import { selectionSort } from "./selectionsort.ts";

if (import.meta.main) {
    /* --- Binary Search --- */
    const list = new Array(10_000_000).fill(0).map((_, i) => i);

    console.log(`Binary Search Guess: ${binarySearch(list, 3)}`);
    console.log("Worst case for O(log_2 n):", Math.round(Math.log2(list.length)));

    /* --- Linked List --- */

    const ll = new LinkedList<number>();
    for (let i = 0; i < 10_000; i++) {
        ll.Add(i);
    }

    /* --- Selection Sort --- */
    const ss_l = new Array(10).fill(0).map(() => Math.floor(Math.random() * 100));
    const ss_l_copy = [...ss_l];

    console.log("Selection Sort:\n", selectionSort(ss_l), "\n", ss_l_copy);

    /* --- Quick Sort --- */
    const qs_l = new Array(10).fill(0).map(() => Math.floor(Math.random() * 100));
    const qs_l_copy = [...qs_l];

    console.log("Quick Sort:\n", quickSort(qs_l), "\n", qs_l_copy);
}
