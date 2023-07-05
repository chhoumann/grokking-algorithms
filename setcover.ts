/*
This program implements a greedy approximation algorithm for the set-covering problem, known as the Greedy Set-Cover algorithm. The algorithm repeatedly selects the set that contains the most elements not already covered until all elements are covered.

This approximation algorithm doesn't always find the optimal solution, but it guarantees a solution that is logarithmically close to the optimal one.
*/

type SetType = Array<number>;

export function findMinSetCover(universe: SetType, sets: Array<SetType>): SetType[] {
    const universeSet = new Set(universe);
    const setArray = sets.map(set => new Set(set));
    const resultSets: SetType[] = [];

    while (universeSet.size !== 0) {
        let maxSetIndex = 0;
        let maxSetSize = 0;

        for (let i = 0; i < setArray.length; i++) {
            const currentSetSize = Array.from(setArray[i]).filter(value => universeSet.has(value)).length;

            if (currentSetSize > maxSetSize) {
                maxSetSize = currentSetSize;
                maxSetIndex = i;
            }
        }

        if (maxSetSize === 0) {
            throw new Error("No set cover possible");
        }

        const maxSet = setArray[maxSetIndex];
        resultSets.push(Array.from(maxSet));
        maxSet.forEach(value => universeSet.delete(value));
    }

    return resultSets;
}