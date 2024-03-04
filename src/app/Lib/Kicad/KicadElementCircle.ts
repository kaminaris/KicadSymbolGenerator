import { KicadElement, KicadLayer } from './KicadElement';
import { KicadElementStroke }       from './KicadElementStroke';
import { KicadElementUUID }         from './KicadElementUUID';

export class KicadElementCircle extends KicadElement {
	override name = 'fp_circle';
	centerX: number;
	centerY: number;
	radius: number;

	stroke = new KicadElementStroke();
	uuid = new KicadElementUUID();
	layer: KicadLayer = 'F.SilkS';
	fill = false;

	constructor(centerX: number, centerY: number, radius: number) {
		super();
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
	}

	override write(): string {
		return `
(
    ${this.name}
    (center ${ this.centerX } ${ this.centerY })
    (end ${ this.centerX } ${ this.centerY + this.radius })
    ${ this.stroke.write() }
    (fill ${this.fill ? 'solid' : 'none'})
    (layer "${ this.layer }")
    ${ this.uuid.write() }
)
		`;
	}
}