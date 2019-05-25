import * as d3 from 'd3';

import View from 'src/platform/view';
import Score from 'src/models/score';


export default class EditorView extends View<Score> {
	private static FONT_COLOR = 'black';

	protected getInitialModel(): Score {
		return new Score();
	}

	public render(model: Score): Element {
		const element = d3.select(this.parent.element)
			.append('svg')
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
		return element.node();
	}

}