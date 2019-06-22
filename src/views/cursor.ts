import * as _ from 'lodash';
import * as d3 from 'd3';

import View from 'src/platform/view';
import Score from '../models/score';
import Note from 'src/models/note';
import { Position } from 'src/utils/data';
import Coordinate from './services/coordinate';
import EditorView from './editor';
import { LinkedNode } from '../utils/data';
import Section from 'src/models/section';

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

export default class CursorView extends View<Score> {
	private static CURSOR_Y_OFFSET = 35;
	private _currentNote: LinkedNode<Note>;

	public constructor(nativeElement?: Element, parentView?: View<any>) {
		super(nativeElement, parentView);
		window.addEventListener('keydown', (event) => {
			switch (event.keyCode) {
				case KEY_LEFT:
					this.moveToPrevNote();
					break;
				case KEY_RIGHT:
					this.moveToNextNote();
					break;
			}
		});
	}

	public get currentNote(): LinkedNode<Note> {
		return this._currentNote;
	}

	public get currentSection(): LinkedNode<Section> {
		if (_.isNil(this._currentNote) || _.isNil(this._currentNote.val)) return null;
		return this.model.sections.find(section => section.id === this.currentNote.val.sectionId);
	}

	private get coordinate(): Coordinate {
		return (this.parent as EditorView).coordinate;
	}

	public doRender(): Element {
		const element = d3.create('svg').attr('class', 'score-editor-cursor');
		element
			.append('path')
			.attr('d', 'M0 10 c0 3.3 2.7 6 6 6 s6-2.7 6-6 S6 0,6 0 S0 6.7 0 10z')
			.attr('transform', `matrix(0.93 0 0 0.93 ${20} ${236})`)
			.attr('fill', 'red')
			.style('cursor', 'pointer')
		return element.node();
	}

	public moveTo(note: Note): void {
		const pos = this.coordinate.getNotePos(note);
		pos.y += CursorView.CURSOR_Y_OFFSET;
		this.doMoveTo(pos);
	}

	public moveToNextNote(): void {
		if (_.isNil(this._currentNote.next.val)) {
			const nextSection = this.currentSection.next;
			if (!_.isNil(nextSection.val)) {
				this._currentNote = nextSection.val.notes.first;
			} else {
				this.moveToNextInsertPos();
			}
		} else {
			this._currentNote = this._currentNote.next;
		}
		this.moveTo(this.currentNote.val);
	}

	public moveToPrevNote(): void {
		if (_.isNil(this._currentNote.prev) || _.isNil(this._currentNote.prev.val)) {
			const prevSection = this.currentSection.prev;
			if (_.isNil(prevSection) || _.isNil(prevSection.val)) return;

			this._currentNote = !_.isNil(prevSection.val) ? prevSection.val.notes.last : this._currentNote;
			if (!_.isNil(prevSection.val)) {
				this._currentNote = prevSection.val.notes.last;
			}
		} else {
			this._currentNote = this._currentNote.prev;
		}
		this.moveTo(this.currentNote.val);
	}

	public moveToNextInsertPos(): void {
		this._currentNote = this.model.lastSection.notes.last.next;
		const pos = this.coordinate.getNextInsertPos();
		pos.y += CursorView.CURSOR_Y_OFFSET;
		this.doMoveTo(pos);
	}

	public hasSelection(): boolean {
		return !_.isNil(this._currentNote) && !_.isNil(this._currentNote.val);
	}

	private doMoveTo(pos: Position) {
		if (!_.isNil(pos)) {
			this.sElement.select('path').attr('transform', `matrix(0.93 0 0 0.93 ${pos.x} ${pos.y})`);
		}
	}
}