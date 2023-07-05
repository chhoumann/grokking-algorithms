import { binarySearch } from "./binarysearch.ts";
import { LinkedList } from "./linkedlist.ts";

if (import.meta.main) {
    const list = new Array(10_000_000).fill(0).map((_, i) => i);

    console.log(`Binary Search Guess: ${binarySearch(list, 3)}`);
    console.log("Worst case for O(log_2 n):", Math.round(Math.log2(list.length)));

    const ll = new LinkedList<number>();
    for (let i = 0; i < 10_000; i++) {
        ll.Add(i);
    }
}
