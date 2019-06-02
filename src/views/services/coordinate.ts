import EditorView from '../editor';
import { Position } from '../../utils/data';
import Note from '../../models/note';

export default class Coordinate {
	private static SECTION_PER_LINE = 5;
	private static SECTION_GAP_Y = 100;
	private static BASE_X = 10;
	private static BASE_Y = 200;

	private _editor: EditorView;
	public constructor(editor: EditorView) {
		this._editor = editor;
	}

	public get sectionWidth(): number {
		return this._editor.parent.element.clientWidth / Coordinate.SECTION_PER_LINE - Coordinate.BASE_X;
	}

	public get sectionHeight(): number {
		return 32;
	}

	public getSectionsPos(): any[] {
		const sections = this._editor.model.sections.toArray();
		return sections.map((section, column) => {
			const x = (column % Coordinate.SECTION_PER_LINE) * this.sectionWidth + Coordinate.BASE_X;
			const y = Math.floor(column / Coordinate.SECTION_PER_LINE) * Coordinate.SECTION_GAP_Y + Coordinate.BASE_Y;
			return { id: section.id, pos: { x, y } };
		})
	}

	public getNextInsertPos(): Position {
		const i = this._editor.model.sections.length;
		const x = (i % Coordinate.SECTION_PER_LINE) * this.sectionWidth + Coordinate.BASE_X;
		const y = Math.floor(i / Coordinate.SECTION_PER_LINE) * Coordinate.SECTION_GAP_Y + Coordinate.BASE_Y;
		return { x, y };
	}

	public getNotePos(note: Note): Position {
		if (!note) return null;

		const sectionElement = $(`#score-section-${note.sectionId}`);
		const sectionX = parseFloat(sectionElement.attr('x'));
		const sectionY = parseFloat(sectionElement.attr('y'));
		const seciontWidth = parseFloat(sectionElement.attr('width'));
		const seciontHeight = parseFloat(sectionElement.attr('height'));

		const noteElement = this._editor.sElement.select(`#score-note-${note.sectionId}-${note.id}`).node() as Element;
		const noteX = sectionX + seciontWidth * this.rationToFloat(noteElement.getAttribute('x'));
		const noteY = seciontHeight * this.rationToFloat(noteElement.getAttribute('y')) + sectionY;
		return {x: noteX, y: noteY};
	}

	private rationToFloat(ration: string): number {
		return parseFloat(ration.length === 3 ? '0.' + ration.substr(0, 2) : '0.0' + ration[0]);
	}

}