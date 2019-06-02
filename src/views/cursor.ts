import * as _ from 'lodash';
import * as d3 from 'd3';

import View from 'src/platform/view';
import Score from '../models/score';
import Note from 'src/models/note';
import { Position } from 'src/utils/data';

export default class CursorView extends View<Score> {
	private static CURSOR_Y_OFFSET = 35;

	private _score: Score;
	private _currentNote: Note;

	public get currentNote(): Note {
		return this._currentNote;
	}

	public doRender(model?: Score): Element {
		this._score = model;
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
		this._currentNote = note;

		const pos = this.getNotePos(note);
		this.doMoveTo(pos);
	}

	private rationToFloat(ration: string): number {
		return parseFloat(ration.length === 3 ? '0.' + ration.substr(0, 2) : '0.0' + ration[0]);
	}

	private getNotePos(note: Note): Position {
		if (!note) return null;


		const sectionElement = $(`#score-section-${note.sectionId}`);
		const sectionX = parseFloat(sectionElement.attr('x'));
		const sectionY = parseFloat(sectionElement.attr('y'));
		const seciontWidth = parseFloat(sectionElement.attr('width'));
		const seciontHeight = parseFloat(sectionElement.attr('height'));

		const noteElement = this.parent.sElement.select(`#score-note-${note.sectionId}-${note.id}`).node() as Element;
		const noteX = sectionX + seciontWidth * this.rationToFloat(noteElement.getAttribute('x'));
		const noteY = seciontHeight * this.rationToFloat(noteElement.getAttribute('y')) + sectionY + CursorView.CURSOR_Y_OFFSET;
		return {x: noteX, y: noteY};
	}

	private doMoveTo(pos: Position) {
		if (!_.isNil(pos)) {
			this.sElement.select('path').attr('transform', `matrix(0.93 0 0 0.93 ${pos.x} ${pos.y})`);
		}		
	}
}