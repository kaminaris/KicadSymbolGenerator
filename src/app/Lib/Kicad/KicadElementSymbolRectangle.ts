import { KicadElement } from './KicadElement';

export class KicadElementSymbolRectangle extends KicadElement {
	strokeWidth = 0.254;

	constructor(
		public startX: number,
		public startY: number,
		public endX: number,
		public endY: number,
	) {
		super();
	}

	override write(): string {
		return `
(rectangle
    (start ${ this.startX } ${ this.startY })
    (end ${ this.endX } ${ this.endY })
    (stroke
        (width ${ this.strokeWidth })
        (type default)
    )
    (fill
        (type background)
    )
)
		`;
	}
}