import View from './view';

export default abstract class Controller<Model, V extends View<Model>> {
	private _view: V;

	public constructor(parentView?: View<any>) {
		this.beforeViewInit();
		this._view = this.initView(parentView);
	}

	protected beforeViewInit(): void {

	}
	protected abstract initView(parentView?: View<any>): V;

	public get view(): V {
		if (!this._view) {
			throw 'The view has not been initialized, you must initialize view first!';
		}
		return this._view;
	}

	public set view(view: V) {
		this._view = view;
	}

	public destory(): void {
		if (this.view) {
			this.view.destory();
		}
	}

}
