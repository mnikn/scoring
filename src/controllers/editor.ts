import Controller from 'src/platform/controller';
import EditorView from 'src/views/editor';
import Score from 'src/models/score';
import EditorService from '../services/editor';
import View from '../platform/view';

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

			!this.view.hasSelection() ? 
				this._service.insertNote(key) : 
				this._service.replaceNote(this.view.currentNote.val, key);

			this.view.render(this._service.model);

			!this.view.hasSelection() ?
				this.view.cursorMoveToNextInsertPos() :
				this.view.cursorMoveTo(this.view.currentNote.val);
		});
	}

	protected initView(parentView: View<any>): EditorView {
		const view = new EditorView(null, parentView);
		view.render(this._service.model);
		return view;
	}


}
