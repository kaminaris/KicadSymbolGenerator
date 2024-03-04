/**
 * plain - as-is, no quotation
 * string - double-quoted
 * complex - nested in brackets ()
 */
export type KicadElementType = 'plain' | 'string' | 'complex';
export type KicadLayer = '' | 'F.SilkS' | 'F.Cu' | 'F.Fab' | 'F.CrtYd';

export class KicadElement {
	name = '';
	type: KicadElementType = 'plain';
	children: KicadElement[] = [];

	write(): string {
		switch (this.type) {
			case 'plain':
				return this.name + ' ' + this.writeChildren();
			case 'string':
				return `"${ this.name }" ${ this.writeChildren() }`;
			case 'complex':
				return `(${ this.name } ${ this.writeChildren() })`;
		}
	}

	writeChildren(): string {
		return this.children.map(c => c.write()).join(' ');
	}
}