import { KicadElement } from './KicadElement';

export type KicadStrokeType = 'solid' | 'dash' | 'dot' | 'dash_dot' | 'dash_dot_dot';

export class KicadElementStroke extends KicadElement {
	strokeType: KicadStrokeType = 'solid';
	width = 0.12;

	override write(): string {
		return `(stroke (width ${ this.width }) (type ${ this.strokeType }))`;
	}
}