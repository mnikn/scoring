export default abstract class View {
	private _parent: View;
	private _element: Element;
	private _children: View[] = [];

	public constructor(parent: View = null) {
		this._element = this.initView(parent);
	}

	protected abstract initView(parent: View): Element;

	public get element(): Element {
		if (!this._element) {
			throw 'The view has not been initialized, you must initialize view first!';
		}
		return this._element;
	}

	public get $element(): JQuery<Element> {
		return $(this.element);
	}

	public get children(): View[] {
		return this._children;
	}

	public appendChild(child: View) {
		$(this._element).append(child.element);
		this._children.push(child);
	}

	public destory(): void {
		$(this._element).remove('*');
	}
}