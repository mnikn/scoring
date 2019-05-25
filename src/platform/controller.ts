import View from './view';

export default abstract class Controller<Model, V extends View<Model>> {
	private _view: V;

	public constructor(view?: V) {
		this._view = view;
	}

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
