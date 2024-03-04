import { KicadElement }       from './KicadElement';
import { KicadElementOrigin } from './KicadElementOrigin';

export class KicadElementSymbolPin extends KicadElement {
	pinName: string;
	pinNumber: string;
	pinType = 'bidirectional';
	pinLength = '2.54';
	origin: KicadElementOrigin;

	constructor(pinName: string, pinNumber: string, x: number, y: number, z?: number) {
		super();
		this.origin = new KicadElementOrigin(x, y, z);
		this.pinName = pinName;
		this.pinNumber = pinNumber;
	}

	override write(): string {

		return `
(pin ${ this.pinType } line
    ${ this.origin.write() }
    (length ${ this.pinLength })
    (name "${ this.pinName }"
        (effects
            (font
                (size 1.27 1.27)
            )
        )
    )
    (number "${ this.pinNumber }"
        (effects
            (font
                (size 1.27 1.27)
            )
        )
    )
)
		`;
	}
}