/*
Quick Sort works by picking a pivot element, and partitioning the array into two sub-arrays, according to whether they are less than or greater than the pivot.
It then recursively sorts the sub-arrays.

It is O(n log n) on average, but O(n^2) in the worst case.
*/

export function quickSort(array: number[]): number[] {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];
    const less = array.slice(1).filter(x => x <= pivot);
    const greater = array.slice(1).filter(x => x > pivot);

    return [...quickSort(less), pivot, ...quickSort(greater)];
}