import * as d3 from 'd3';

import View from 'src/platform/view';
import Score from 'src/models/score';
import CursorView from './cursor';

export default class EditorView extends View<Score> {
	private static FONT_COLOR = 'black';

	private _cusror: CursorView;

	public constructor(nativeElement?: Element) {
		super(nativeElement);
		this._cusror = new CursorView();
	}

	protected doRender(model: Score): Element {
		const element = d3.create('svg')
			.attr('id', 'score-content')
			.style('height', '800px')
			.style('width', '100%')
			.style('background', 'white');

		element
			.append('text')
			.text(`${model.name}`)
			.text('Test')
			.style('font-size', '32px')
			.style('font-weight', 'bold')
			.attr('x', '43%')
			.attr('y', '50px')
			.attr('fill', EditorView.FONT_COLOR);
		element
			.append('text')
			.text(`1 = ${model.tonality}`)
			.style('font-size', '16px')
			.attr('x', '20px')
			.attr('y', '100px')
			.attr('fill', EditorView.FONT_COLOR);

		element
			.append('text')
			.text(`${model.beatPerSections}/${model.notePerBeat}`)
			.style('font-size', '16px')
			.attr('x', '80px')
			.attr('y', '100px')
			.attr('fill', EditorView.FONT_COLOR);

		// render content
		const sections = model.sections.toArray();
		let xStep = 0;
		if (this.parent) {
			xStep = this.parent.element.clientWidth / 5 - 10;
		}
		const seciontElement = element
			.selectAll('.score-section')
			.data(sections.map((section, column) => {
				const xStep = this.parent.element.clientWidth / 5 - 10;
				const x = (column % 5) * xStep;
				const y = Math.floor(column / 5) * 100 + 200;
				return { id: section.id, pos: { x, y } };
			}))
			.enter().append('svg')
			.attr('id', (data, i) => `score-section-${i}`)
			.attr('class', 'score-section')
			.attr('x', data => data.pos.x)
			.attr('y', data => data.pos.y)
			.attr('width', xStep)
			.attr('height', '32')
			.data(sections);


		// render note
		const noteElements = seciontElement
			.selectAll('score-note')
			.data((section) => {
				return section.notes.toArray();
			})
			.enter().append('svg')
			.attr('id', (note, i) => `score-note-${i}`)
			.attr('data-id', note => note.id)
			.attr('class', 'score-note')
			.style('cursor', 'pointer')
			// .on('click', function (note) {
			// 	self.noteEvents.notify(EditorView.ACTION_CLICK_NOTE, note);
			// })
			// .on('contextmenu', function (data) {
			// 	self.noteEvents.notify(EditorView.ACTION_SHOW_MENU, data, { x: d3.event.x, y: d3.event.y });
			// 	return false;
			// });

		noteElements
			.append('text')
			.text(note => note.key)
			.style('font-size', '16px')
			.attr('y', '70%')
			.attr('fill', EditorView.FONT_COLOR);

		return element.node();
	}

	protected afterRender(model?: Score): void {
		this._cusror.render(model);
		this._cusror.parent = this;
	}

}