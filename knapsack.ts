/*
The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. It derives its name from the problem faced by someone who is constrained by a fixed-size knapsack and must fill it with the most valuable items.

It illustrates the dynamic programming method of solving problems by breaking them down into simpler subproblems. The subproblems in this case are smaller knapsack problems, which are solved in a bottom-up manner. The solution to the overall problem is then found by solving the subproblems, and using their solutions to gradually construct a solution to the original problem.

Our approach to solving the problem is to have a grid for each item and capacity from 1 to C (the capacity). The grid will contain the maximum value that can be obtained for each item and capacity. We will fill the grid row by row, left to right.

Given the following items and capacity of 4:
- Guitar: 1kg, $1500
- Stereo: 4kg, $3000
- Laptop: 3kg, $2000

The grid will look like this:

|        | 1         | 2         | 3         | 4          |
| ------ | --------- | --------- | --------- | ---------- |
| Guitar | $1500 (G) | $1500 (G) | $1500 (G) | $1500 (G)  |
| Stereo | $1500 (G) | $1500 (G) | $1500 (G) | $3000 (S)  |
| Laptop | $1500 (G) | $1500 (G) | $2000 (L) | $3500 (LG) | 

The algorithm for filling the grid is as follows:
cell[i][j] = max(
    cell[i - 1][j], // previous max
    cell[i - 1][j - items[i].weight] + items[i].value // value of current item + max value of remaining capacity, which is the value of the cell in the previous row and the remaining capacity, i.e. cell[i - 1][j - items[i].weight]
)
*/

interface Item {
    name: string;
    weight: number;
    value: number;
}

export function knapsack(items: Item[], capacity: number): number {
    // Here we create a cache to store the max value at each capacity for each item.
    // The cache is a 2-dimensional array where each row represents an item and each column represents a capacity.
    // The value at each row/column intersection is the max value for that item at that capacity.
    // We use the cache to avoid recalculating values we've already calculated.
    const cache: number[][] = [];
    for (let row_idx = 0; row_idx < items.length; row_idx++) {
        cache[row_idx] = [];
        // This assumes that the capacity is a positive integer
        // Meaning, we can't handle items that weigh fractions of a (unit of weight)
        for (let col_idx = 0; col_idx <= capacity; col_idx++) {
            cache[row_idx][col_idx] = -1;
        }
    }

    return knapsackRecursive(items, items.length - 1, capacity, cache);
}

function knapsackRecursive(
    items: Item[],
    i: number,
    capacity: number,
    cache: number[][]
): number {
    // Base case: if we've reached the end of the items array or the capacity is 0, return 0
    if (i < 0) {
        return 0;
    }

    // If the value is already in the cache, return it
    if (cache[i][capacity] !== -1) {
        return cache[i][capacity];
    }

    // If the weight of the current item is greater than the capacity, skip it
    if (items[i].weight > capacity) {
        cache[i][capacity] = knapsackRecursive(items, i - 1, capacity, cache);
        return cache[i][capacity];
    }

    // Otherwise, return the max of two cases:
    const previousMaxValue = knapsackRecursive(items, i - 1, capacity, cache);
    const currentValuePlusMaxValueOfRemainingCapacity =
        items[i].value +
        knapsackRecursive(items, i - 1, capacity - items[i].weight, cache);

    cache[i][capacity] = Math.max(
        previousMaxValue,
        currentValuePlusMaxValueOfRemainingCapacity
    );

    return cache[i][capacity];
}
