/*
Binary search is a fast search algorithm with run-time complexity of Ο(log n).
This search algorithm works on the principle of divide and conquer.
For this algorithm to work properly, the data collection should be in the sorted form.
Binary search looks for a particular item by comparing the middle most item of the collection.
If a match occurs, then the index of item is returned.
If the middle item is greater than the item, then the item is searched in the sub-array to the left of the middle item.
Otherwise, the item is searched for in the sub-array to the right of the middle item.
*/

export function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const guess = arr[mid];

        if (guess === target) {
            return mid;
        } else if (guess < target) {
            left = mid + 1;
        } else if (guess > target) {
            right = mid - 1;
        }
    }

    return -1;
}