type Edge<T> = { value: T; weight: number };

export class WeightedDirectedGraph<T> {
    private graph: Map<T, Edge<T>[]> = new Map();

    public getNodes(): T[] {
        return [...this.graph.keys()];
    }

    public getEdges(from: T): Edge<T>[] {
        return this.graph.get(from) || [];
    }

    public addNode(value: T): WeightedDirectedGraph<T> {
        if (!this.graph.has(value)) {
            this.graph.set(value, []);
        }

        return this;
    }

    public addEdge(from: T, to: T, weight: number): WeightedDirectedGraph<T> {
        this.graph.set(from, [...(this.graph.get(from) || []), { value: to, weight }]);

        return this;
    }

    public hasEdge(from: T, to: T): boolean {
        return this.graph.get(from)?.map(x => x.value).includes(to) || false;
    }

    public removeEdge(from: T, to: T): WeightedDirectedGraph<T> {
        if (!this.graph.has(from)) {
            throw new Error("Node does not exist");
        }

        this.graph.set(
            from,
            (this.graph.get(from) || []).filter((x) => x !== to)
        );

        return this;
    }
}
