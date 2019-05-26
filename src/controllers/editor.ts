import Controller from 'src/platform/controller';
import EditorView from 'src/views/editor';
import Score from 'src/models/score';
import EditorService from '../services/editor';

export default class EditorController extends Controller<Score, EditorView> {

	private _service: EditorService;

	protected beforeViewInit(): void {
		this._service = new EditorService(new Score());
		$(document).on('keydown', (event) => {
			const key = event.key;
			const noteReg = /([0-7]|\s|-)/;
			if (!key.match(noteReg)) {
				return;
			}

			this._service.insertNote(key);
			this.view.render(this._service.model);
		});
	}

	protected initView(): EditorView {
		const view = new EditorView();
		view.render(this._service.model);
		return view;
	}


}
