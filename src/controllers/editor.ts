import Controller from 'src/platform/controller';
import EditorView from 'src/views/editor';
import Score from 'src/models/score';

export default class EditorController extends Controller<Score, EditorView> {
	protected initView(): EditorView {
		const view = new EditorView();
		view.render(new Score());
		return view;
	}


}
