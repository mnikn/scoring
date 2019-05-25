import * as d3 from 'd3';
import * as _ from 'lodash';

export default abstract class View<Model> {
	private _parent: View<Model>;
	private _element: Element;
	private _children: View<Model>[] = [];

	public constructor(parent: View<Model> | Element = null, nativeElement?: Element) {
		if (parent instanceof Element) {
			parent = new SimpleView(null, parent);
		}
		this._parent = parent;
		if (!_.isNil(nativeElement)) {
			this._element = nativeElement;
		} else {
			this._element = this.render(this.getInitialModel());
		}
	}

	protected getInitialModel(): Model {
		return null;
	}

	public abstract render(model?: Model): Element;

	public get parent(): View<Model> {
		return this._parent;
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
		this.$element.append(child.element);
		this._children.push(child);
	}

	public destory(): void {
		this.$element.remove('*');
	}
}

export class SimpleView extends View<any> {
	public render(model?: any): Element {
		return null;
	}
}