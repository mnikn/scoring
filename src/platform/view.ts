import * as d3 from 'd3';
import * as _ from 'lodash';

export default abstract class View<Model> {
	private _parent: View<any>;
	private _element: Element;
	private _children: View<Model>[] = [];
	private _model: Model;

	public constructor(nativeElement?: Element) {
		if (!_.isNil(nativeElement)) {
			this._element = nativeElement;
		}
	}

	public get model(): Model {
		return this._model;
	}

	public initElement(model?: Model): void {
		this._model = model;
		this._element = this.doInitElement(model);
		this.afterInitElement();
	}
	protected abstract doInitElement(model?: Model): Element;
	protected afterInitElement(): void {
	}


	public get parent(): View<any> {
		return this._parent;
	}

	public set parent(parent: View<any>) {
		this._parent = parent;
		if (!_.isNil(parent)) {
			parent.$element.append(this.element);
			parent.children.push(this);
		}
	}

	public get element(): Element {
		if (!this._element) {
			throw 'The view has not been initialized, you must initialize view first!';
		}
		return this._element;
	}

	public get $element(): JQuery<Element> {
		return $(this.element);
	}

	public get sElement(): d3.Selection<Element, any, any, any> {
		return d3.select(this.element);
	}

	public get children(): View<Model>[] {
		return this._children;
	}

	public appendChild(child: View<Model>) {
		child.parent = this;
	}

	public destory(): void {
		this.$element.remove('*');
	}
}

export class SimpleView extends View<any> {
	protected doInitElement(model?: any): Element {
		return null;
	}
	public doMutableRender(model?: any): Element {
		return null;
	}
	// protected doRender(model?: any): Element {
	// 	return null;
	// }
}