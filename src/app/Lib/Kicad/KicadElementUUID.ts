import { KicadElement } from './KicadElement';

export class KicadElementUUID extends KicadElement {
	override write(): string {
		const uuid = crypto.randomUUID();
		return `(uuid "${uuid}")`;
	}
}