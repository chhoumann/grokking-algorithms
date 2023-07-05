/*
Linked lists are a data structure that can be used to store a collection of items.
Each item in the list is stored in a node. Each node contains a value and a reference
to the next node in the list. The first node in the list is called the head. The last
node in the list is called the tail.

Linked lists have some benefits over arrays. For example, adding and removing items
from a linked list is O(1) time complexity. This is because the nodes in the list
are not stored contiguously in memory. This means that when an item is added or
removed from the list, the other items in the list do not need to be shifted in
memory. This is in contrast to arrays, where adding or removing items from the
beginning of the array requires shifting all of the other items in the array.
This shifting can be troublesome, as it can cause the array to be copied to a new
location in memory. This can be a problem if the array is very large.

However, linked lists also have some drawbacks. For example, linked lists do not
support random access. This means that if you want to access the 100th item in a
linked list, you must iterate through the first 99 items in the list. This is in
contrast to arrays, where you can access any item in the array in O(1) time.
*/

export class LinkedList<TItem> {
    private head: Node<TItem> | undefined;

    public get Head(): Node<TItem> | undefined {
        return this.head;
    }

    public Add(value: TItem): void {
        const node = new Node(value);
        node.Next = this.head;
        this.head = node;
    }

    public Remove(value: TItem): void {
        if (this.head === undefined) {
            return;
        }

        if (this.head.Value === value) {
            this.head = this.head.Next;
            return;
        }

        let current = this.head;
        while (current.Next !== undefined) {
            if (current.Next.Value === value) {
                current.Next = current.Next.Next;
                return;
            }

            current = current.Next;
        }
    }

    public InsertAfter(value: TItem, after: TItem): void {
        if (this.head === undefined) {
            throw new Error("List is empty");
        }

        let current: Node<TItem> | undefined = this.head;
        while (current !== undefined) {
            if (current.Value === after) {
                const node = new Node(value);
                node.Next = current.Next;
                current.Next = node;

                return;
            }

            current = current.Next;
        }

        throw new Error(`Value ${after} not found in list`);
    }

    public Contains(value: TItem): boolean {
        let current = this.head;
        while (current !== undefined) {
            if (current.Value === value) {
                return true;
            }

            current = current.Next;
        }

        return false;
    }

    public Count(): number {
        let count = 0;
        let current = this.head;
        while (current !== undefined) {
            count++;
            current = current.Next;
        }

        return count;
    }

    public ToArray(): TItem[] {
        const result = [];
        let current = this.head;

        while (current !== undefined) {
            result.push(current.Value);
            current = current.Next;
        }

        return result;
    }

    public [Symbol.iterator](): Iterator<TItem> {
        let current = this.head;
        return {
            next(): IteratorResult<TItem> {
                if (current === undefined) {
                    return { done: true, value: undefined };
                }

                const value = current.Value;
                current = current.Next;

                return { done: false, value };
            },
        };
    }
}

class Node<TItem> {
    private value: TItem;
    private next: Node<TItem> | undefined;

    constructor(value: TItem) {
        this.value = value;
    }

    public get Value(): TItem {
        return this.value;
    }

    public get Next(): Node<TItem> | undefined {
        return this.next;
    }

    public set Next(value: Node<TItem> | undefined) {
        this.next = value;
    }
}
