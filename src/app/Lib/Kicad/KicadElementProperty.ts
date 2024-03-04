import { KicadElement, KicadLayer } from './KicadElement';
import { KicadElementOrigin }       from './KicadElementOrigin';
import { KicadElementUUID }         from './KicadElementUUID';
import { KicadElementEffects }      from './KicadElementEffects';
import { KicadElementEffectFont }   from './KicadElementEffectFont';

export class KicadElementProperty extends KicadElement {
	override name = 'property';

	propertyName = '';
	propertyValue = '';
	layer: KicadLayer = 'F.SilkS';
	origin: KicadElementOrigin;
	uuid? = new KicadElementUUID();
	unlocked = true;
	hidden = false;
	effects = new KicadElementEffects();

	constructor(name: string, value: string, x: number, y: number, z?: number) {
		super();
		this.propertyName = name;
		this.propertyValue = value;
		this.origin = new KicadElementOrigin(x, y, z ?? 0);
	}

	override write(): string {
		const out = [];
		out.push(`property "${ this.propertyName }" "${ this.propertyValue }"`);
		out.push(this.origin.write());
		if (this.layer) {
			out.push(`(layer "${ this.layer }")`);
		}
		if (this.unlocked) {
			out.push('(unlocked yes)');
		}
		if (this.hidden) {
			out.push('(hide yes)');
		}
		if (this.uuid) {
			out.push(this.uuid.write());
		}
		out.push(this.effects.write());
		return `(${ out.join(' ') })`;
	}
}