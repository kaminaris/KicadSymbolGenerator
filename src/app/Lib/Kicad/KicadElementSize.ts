import { KicadElement } from './KicadElement';

export class KicadElementSize extends KicadElement {
	width = 0;
	height = 0;

	constructor(width: number, height: number) {
		super();

		this.width = width;
		this.height = height;
	}

	override write(): string {
		return `(size ${ this.width } ${ this.height })`;
	}
}