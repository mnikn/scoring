import EditorView from './views/editor';
import EditorController from './controllers/editor';

export default function Scoring(parentSelector: string, configs) {
	const view = new EditorView();
	$(parentSelector).append(view.element);
	const controller = new EditorController(view);
	$(window).on('destory', () => {
		controller.destory();
	});
}