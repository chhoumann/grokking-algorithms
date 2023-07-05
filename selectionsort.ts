/*
Selection Sort is O(n^2) because it has to iterate over the array n times, and for each iteration, it has to find the smallest element in the array, which is also O(n). So, O(n*n) = O(n^2).

It works by finding the smallest element in the array, and pushing it to a new array. It then removes that element from the original array, and repeats the process until the original array is empty.

This is a very inefficient sorting algorithm, but it is very simple to implement.
*/

function findSmallest(array: number[]): number {
    let smallest = array[0];
    let smallestIndex = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] < smallest) {
            smallest = array[i];
            smallestIndex = i;
        }
    }

    return smallestIndex;
}

export function selectionSort(array: number[]): number[] {
    const sortedArray = [];

    while (array.length > 0) {
        const smallestIndex = findSmallest(array);
        sortedArray.push(array.splice(smallestIndex, 1)[0]);
    }

    return sortedArray;
}