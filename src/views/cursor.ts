import * as _ from 'lodash';
import * as d3 from 'd3';

import View from 'src/platform/view';
import Score from '../models/score';
import Note from 'src/models/note';
import { Position } from 'src/utils/data';
import Coordinate from './services/coordinate';
import EditorView from './editor';

export default class CursorView extends View<Score> {
	private static CURSOR_Y_OFFSET = 35;

	private _currentNote: Note;

	public get currentNote(): Note {
		return this._currentNote;
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
		this._currentNote = note;

		const pos = this.coordinate.getNotePos(note);
		pos.y += CursorView.CURSOR_Y_OFFSET;
		this.doMoveTo(pos);
	}

	public moveToNextInsertPos(): void {
		const pos = this.coordinate.getNextInsertPos();
		pos.y += CursorView.CURSOR_Y_OFFSET;
		this.doMoveTo(pos);
	}

	private doMoveTo(pos: Position) {
		if (!_.isNil(pos)) {
			this.sElement.select('path').attr('transform', `matrix(0.93 0 0 0.93 ${pos.x} ${pos.y})`);
		}		
	}
}