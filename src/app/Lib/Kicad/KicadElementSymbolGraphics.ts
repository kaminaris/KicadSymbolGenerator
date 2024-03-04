import { KicadElement }       from './KicadElement';
import { KicadElementSymbol } from './KicadElementSymbol';

export class KicadElementSymbolGraphics extends KicadElement {
	override name = 'symbol';

	constructor(protected parent: KicadElementSymbol) {
		super();
	}

	override write(): string {

		return `
(symbol "${ this.parent.symbolName }_0_1"
	${ this.writeChildren() }
)
		`;
	}
}