import EditorView from './views/editor';
import EditorController from './controllers/editor';
import { SimpleView } from './platform/view';

export default function Scoring(parentSelector: string, configs) {
	const parentView = new SimpleView(null, $(parentSelector).get(0));
	const view = new EditorView(parentView);
	parentView.appendChild(view);
	const controller = new EditorController(view);
	$(window).on('destory', () => {
		controller.destory();
	});
}