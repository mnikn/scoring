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

	public move(step: number): LinkedNode<T> {
		const forward = step > 0;
		let current = new LinkedNode(this.val, this.next, this.prev);
		for(let i = 0;i < Math.abs(step) && current && current.val; ++i) {
			current = forward ? current.next : current.prev;
		}
		return current;
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
		if (this._head.next === this._tail) return null;
		return this._head.next;
	}

	public get last(): LinkedNode<T> {
		if (this._tail.prev === this._head) return null;
		return this._tail.prev;
	}

	public push(val: T): void {
		const newElem = new LinkedNode<T>(val, this._tail, this.last);
		if (_.isNil(this.last)) {
			this._head.next = newElem;
		} else {
			this.last.next = newElem;
		}
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
		while (!_.isNil(current) && current !== this._tail) {
			fn(current);
			current = current.next;
		}
	}

	public map<U>(fn: (node: LinkedNode<T>, i: number) => U): LinkedList<U>  {
		const newList = new LinkedList<U>();
		let index = 0;
		this.forEach((node) => {
			newList.push(fn(node, index++));
		});
		return newList;
	}

	public toArray(): T[] {
		const newList = [];
		this.forEach((node) => {
			newList.push(node.val);
		});
		return newList;
	}

	public get length(): number {
		return this.toArray().length;
	}

	public find(fn: (val: T) => boolean): LinkedNode<T> {
		let result = null;
		this.forEach((node) => {
			if (fn(node.val)) result = node;
		});
		return result;
	}
}

export interface Position {
	x: number;
	y: number;
}