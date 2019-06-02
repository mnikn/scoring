import * as d3 from 'd3';
import * as _ from 'lodash';

export default abstract class View<Model> {
	private _parent: View<any>;
	private _element: Element;
	private _children: View<Model>[] = [];
	private _model: Model;

	public constructor(nativeElement?: Element, parentView?: View<any>) {
		if (!_.isNil(nativeElement)) {
			this._element = nativeElement;
		}
		this._parent = parentView;
	}

	public get model(): Model {
		return this._model;
	}

	public render(model?: Model): void {
		if (!_.isNil(this._element)) {
			this.$element.remove('*');
		}
		this._element = this.doRender(model); 
		this.afterRender(model);
		this._model = model;
		if (!_.isNil(this.parent)) {
			this.parent.element.appendChild(this.element);
		}
	}

	protected abstract doRender(model?: Model): Element;
	protected afterRender(model?: Model): void {
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
	protected doRender(model?: any): Element {
		return null;
	}
}