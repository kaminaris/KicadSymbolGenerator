import { KicadElement }           from './KicadElement';
import { KicadElementProperty }   from './KicadElementProperty';
import { KicadElementEffectFont } from './KicadElementEffectFont';

export class KicadElementSymbol extends KicadElement {
	symbolName: string;
	properties: KicadElementProperty[] = [];

	constructor(symbolName: string) {
		super();
		this.symbolName = symbolName;
	}

	addBaselineProperties() {
		/**
		 * (property "Reference" "U"
		 *     (at -6.35 6.35 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *     )
		 * )
		 */
		const refProp = new KicadElementProperty('Reference', 'U', -6.35, 6.35, 0);
		refProp.layer = '';
		refProp.uuid = undefined;
		refProp.unlocked = false;
		refProp.effects.setFont(1.27, 1.27);
		refProp.effects.justify = 'left';

		this.properties.push(refProp);

		/**
		 * (property "Value" "ISO1050DUB"
		 *     (at 2.54 6.35 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *     )
		 * )
		 */
		const valProp = new KicadElementProperty('Value', 'SymbolValue', 2.54, 6.35, 0);
		valProp.layer = '';
		valProp.uuid = undefined;
		valProp.unlocked = false;
		valProp.effects.setFont(1.27, 1.27);
		valProp.effects.justify = 'right';

		this.properties.push(valProp);

		/**
		 * (property "Footprint" "Package_SO:SOP-8_6.62x9.15mm_P2.54mm"
		 *     (at 0 -8.89 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *             (italic yes)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const footprintProp = new KicadElementProperty('Footprint', '', 0, -8.89, 0);
		footprintProp.layer = '';
		footprintProp.uuid = undefined;
		footprintProp.unlocked = false;
		const footprintFont = new KicadElementEffectFont(1.27, 1.27);
		footprintFont.italic = true;
		footprintProp.effects.children.push(footprintFont);
		footprintProp.effects.hidden = true;

		this.properties.push(footprintProp);

		/**
		 * (property "Datasheet" "http://www.ti.com/lit/ds/symlink/iso1050.pdf"
		 *     (at 0 -1.27 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const datasheetProp = new KicadElementProperty('Datasheet', '', 0, -1.27, 0);
		datasheetProp.layer = '';
		datasheetProp.uuid = undefined;
		datasheetProp.unlocked = false;
		datasheetProp.effects.setFont(1.27, 1.27);
		datasheetProp.effects.hidden = true;

		this.properties.push(datasheetProp);

		/**
		 * (property "Description" "Isolated CAN Transceiver, SOP-8"
		 *     (at 0 0 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const descriptionProp = new KicadElementProperty('Description', '', 0, 0, 0);
		descriptionProp.layer = '';
		descriptionProp.uuid = undefined;
		descriptionProp.unlocked = false;
		descriptionProp.effects.setFont(1.27, 1.27);
		descriptionProp.effects.hidden = true;

		this.properties.push(datasheetProp);
	}

	writeProperties() {
		return this.properties.map(p => p.write()).join('\n');
	}

	override write(): string {
		return `
	(
		symbol "${ this.symbolName }"
		(exclude_from_sim no)
		(in_bom yes)
		(on_board yes)
		${ this.writeProperties() }
		${ this.writeChildren() }
	)
		`;
	}
}