export class DirectedGraph<T> {
    private graph: Map<T, T[]> = new Map();

    public getEdges(from: T): T[] {
        return this.graph.get(from) || [];
    }

    public addNode(value: T): DirectedGraph<T> {
        if (!this.graph.has(value)) {
            this.graph.set(value, []);
        }

        return this;
    }

    public addEdge(from: T, to: T): DirectedGraph<T> {
        this.graph.set(from, [...(this.graph.get(from) || []), to]);

        return this;
    }

    public hasEdge(from: T, to: T): boolean {
        return this.graph.get(from)?.includes(to) || false;
    }

    public removeEdge(from: T, to: T): DirectedGraph<T> {
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
