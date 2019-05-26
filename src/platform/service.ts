export default class Service<T> {
	private _model: T;

	public constructor(initialModel?: T) {
		this.model = initialModel;
	}

	public get model(): T {
		return this._model;
	}
	public set model(val: T) {
		this._model = val;
	}
}