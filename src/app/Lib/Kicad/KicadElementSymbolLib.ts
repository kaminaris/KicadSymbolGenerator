import { KicadElement } from './KicadElement';

export class KicadElementSymbolLib extends KicadElement {
	override write(): string {
		return `
(
	kicad_symbol_lib
	(version 20231120)
	(generator "kicad_symbol_editor")
	(generator_version "8.0")
	${ this.writeChildren() }
)`;
	}
}