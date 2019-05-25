import * as _ from 'lodash';

export class LinkedNode<T> {
	public val: T;
	public prev: LinkedNode<T>;
	public next: LinkedNode<T>;

	public constructor(val?: T, next?: LinkedNode<T>, prev?: LinkedNode<T>) {
		this.val = val;
		this.next = next;
		this.prev = prev;
	}
}

export class LinkedList<T> {
	private _head: LinkedNode<T>;
	private _tail: LinkedNode<T>;

	public constructor() {
		this._head = new LinkedNode<T>();
		this._tail = new LinkedNode<T>();
		this._head.next = this._tail;
		this._tail.prev = this._head;
	}

	public get first(): LinkedNode<T> {
		return this._head.next;
	}

	public get last(): LinkedNode<T> {
		return this._tail.prev;
	}

	public push(val: T): void {
		const newElem = new LinkedNode<T>(val, this._tail, this.last);
		this.last.next = newElem;
		this._tail.prev = newElem;
	}

	public remove(node: LinkedNode<T>): void {
		this.forEach((current) => {
			if (current === node) {
				current.prev.next = current.next;
				current.next.prev = current.prev;
			}
		});
	}

	public forEach(fn: (node: LinkedNode<T>) => void): void  {
		let current = this.first;
		while (!_.isNil(current)) {
			fn(current);
			current = current.next;
		}
	}
}