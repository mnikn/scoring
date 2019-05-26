import EditorController from './controllers/editor';
import { SimpleView } from './platform/view';

export default function Scoring(parentSelector: string, configs) {
	const controller = new EditorController();
	const parentView = new SimpleView($(parentSelector).get(0));
	controller.view.parent = parentView;
	$(window).on('destory', () => {
		controller.destory();
	});
}