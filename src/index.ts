import EditorController from './controllers/editor';
import { SimpleView } from './platform/view';

export default function Scoring(parentSelector: string, configs) {
	const parentView = new SimpleView($(parentSelector).get(0));
	const controller = new EditorController(parentView);
	$(window).on('destory', () => {
		controller.destory();
	});
}