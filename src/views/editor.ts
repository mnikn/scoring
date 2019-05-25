import View from 'src/platform/view';

export default class EditorView extends View {
	protected initView(parent: View): Element {
		return $('<div>editor</div>').get(0);
	}

}