import { KicadElement } from './KicadElement';

export class KicadElementEffectFont extends KicadElement {
	override name = 'font';
	sizeX: number;
	sizeY: number;
	thickness?: number;
	italic = false;

	constructor(sizeX: number, sizeY: number) {
		super();
		this.sizeX = sizeX;
		this.sizeY = sizeY;
	}

	override write(): string {
		const out = [];
		out.push(this.name);
		out.push(`(size ${ this.sizeX } ${ this.sizeY })`);
		if (this.thickness) {
			out.push(`(thickness ${ this.thickness })`);
		}
		if (this.italic) {
			out.push('(italic yes)');
		}
		return `(${ out.join(' ') })`;
	}
}