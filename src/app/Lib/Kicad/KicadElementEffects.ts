import { KicadElement, KicadElementType } from './KicadElement';
import { KicadElementEffectFont }         from './KicadElementEffectFont';

export class KicadElementEffects extends KicadElement {
	override name = 'effects';
	hidden = false;
	justify: 'left' | 'middle' | 'right' = 'middle';

	override write(): string {
		const out = [];
		out.push(this.name);
		out.push(this.writeChildren());
		if (this.hidden) {
			out.push(`(hide yes)`);
		}
		if (this.justify !== 'middle') {
			out.push(`(justify ${ this.justify })`);
		}
		return `(${ out.join(' ') })`;
	}

	setFont(sizeX: number, sizeY: number, thickness?: number) {
		let effectFont = this
			.children
			.find(e => e instanceof KicadElementEffectFont) as KicadElementEffectFont | undefined
		;

		if (!effectFont) {
			effectFont = new KicadElementEffectFont(1, 1);
			this.children.push(effectFont);
		}

		effectFont.sizeX = sizeX;
		effectFont.sizeY = sizeY;
		if (thickness !== undefined) {
			effectFont.thickness = thickness;
		}
	}
}