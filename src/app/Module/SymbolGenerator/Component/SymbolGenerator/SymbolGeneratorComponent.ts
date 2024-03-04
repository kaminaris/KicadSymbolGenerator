import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


import { SVG }                         from '@svgdotjs/svg.js';
import { KicadElementSymbolLib }       from '../../../../Lib/Kicad/KicadElementSymbolLib';
import { KicadElementSymbol }          from '../../../../Lib/Kicad/KicadElementSymbol';
import { KicadElementSymbolGraphics }  from '../../../../Lib/Kicad/KicadElementSymbolGraphics';
import { KicadElementSymbolPins }      from '../../../../Lib/Kicad/KicadElementSymbolPins';
import { KicadElementSymbolRectangle } from '../../../../Lib/Kicad/KicadElementSymbolRectangle';
import { KicadElementSymbolPin }       from '../../../../Lib/Kicad/KicadElementSymbolPin';

@Component({
	templateUrl: 'SymbolGeneratorComponent.html'
})
export class SymbolGeneratorComponent implements OnInit {
	totalPins = 4;
	symbolName = 'DEV';
	symbolWidth = 6;
	symbolDatasheet = '';
	pins: { n: number, name: string, number: string }[] = [];
	output = '';

	@ViewChild('svgContainer') svgContainer!: ElementRef;

	constructor() {
	}

	async ngOnInit() {
		this.updateTable();
	}

	toSVGCoord(n: number) {
		return n * 10 + 250;
	}

	generate() {
		(this.svgContainer.nativeElement as HTMLDivElement).innerHTML = '';

		const halfPins = Math.ceil(this.totalPins / 2);

		const endX = (this.symbolWidth * 2.54) / 2;
		const endY = (halfPins + 1) * 2.54 / 2;
		const startX = -endX;
		const startY = -endY;

		const symbolLib = new KicadElementSymbolLib();
		const kiSymbol = new KicadElementSymbol(this.symbolName);
		symbolLib.children.push(kiSymbol);
		kiSymbol.addBaselineProperties();

		const propValue = kiSymbol.properties.find(p => p.propertyName === 'Value')!;
		propValue.propertyValue = this.symbolName;
		propValue.origin.y = endY + 2.54;
		propValue.origin.x = endX;

		const refProp = kiSymbol.properties.find(p => p.propertyName === 'Reference')!;
		refProp.origin.y = endY + 2.54;
		refProp.origin.x = startX;

		const kiSymbolGraphics = new KicadElementSymbolGraphics(kiSymbol);
		const kiSymbolPins = new KicadElementSymbolPins(kiSymbol);

		kiSymbol.children.push(kiSymbolGraphics, kiSymbolPins);

		const kiRect = new KicadElementSymbolRectangle(startX, startY, endX, endY);

		kiSymbolGraphics.children.push(kiRect);

		const draw = SVG().addTo(this.svgContainer.nativeElement).size(500, 500);
		const rectW = this.toSVGCoord(endX) - this.toSVGCoord(startX);
		const rectH = this.toSVGCoord(endY) - this.toSVGCoord(startY);
		const rect = draw
			.rect(
				rectW,
				rectH,
			)
			.x(250 - (rectW / 2))
			.y(250 - (rectH / 2))
			.attr({ fill: '#545862', stroke: '#E06C75', 'stroke-width': 0.254 * 10 });

		draw
			.text(this.symbolName)
			.x(250 - (rectW / 2) + rectW)
			.y(250 - (rectH / 2) - 2.54 * 10)
			.attr({ fill: '#56B6C2', 'text-anchor': 'end', 'font-family': 'monospace' });

		draw
			.text('U')
			.x(250 - (rectW / 2))
			.y(250 - (rectH / 2) - 2.54 * 10)
			.attr({ fill: '#56B6C2', 'text-anchor': 'start', 'font-family': 'monospace' });

		for (const p of this.pins) {
			if (p.n <= halfPins) {
				// left pins have rotation 0
				const y = startY + 2.54 + ((p.n - 1) * 2.54);
				const newPin = new KicadElementSymbolPin(p.name, p.number, startX - 2.54, y * -1, 0);
				kiSymbolPins.children.push(newPin);
				draw
					.line(
						this.toSVGCoord(startX - 2.54),
						this.toSVGCoord(y),
						this.toSVGCoord(startX),
						this.toSVGCoord(y)
					)
					.attr({ stroke: '#E06C75', 'stroke-width': 0.254 * 10 });

				draw
					.text(p.number)
					.x(this.toSVGCoord(startX - 2.54 / 2))
					.y(this.toSVGCoord(y - 2))
					.attr({ fill: '#E06C75', 'text-anchor': 'middle', 'font-family': 'monospace' })
				;

				draw
					.text(p.name)
					.x(this.toSVGCoord(startX + 2.54 / 4))
					.y(this.toSVGCoord(y - 1))
					.attr({ fill: '#98C379', 'text-anchor': 'start', 'font-family': 'monospace' })
				;
			}
			else {
				// left pins have rotation 180
				const y = endY - 2.54 - ((p.n - 1 - halfPins) * 2.54);
				const newPin = new KicadElementSymbolPin(p.name, p.number, endX + 2.54, y * -1, 180);
				kiSymbolPins.children.push(newPin);

				draw.line(
					this.toSVGCoord(endX),
					this.toSVGCoord(y),
					this.toSVGCoord(endX + 2.54),
					this.toSVGCoord(y)
				).attr({ stroke: '#E06C75', 'stroke-width': 0.254 * 10 });

				draw
					.text(p.number)
					.x(this.toSVGCoord(endX + 2.54 / 2))
					.y(this.toSVGCoord(y - 2))
					.attr({ fill: '#E06C75', 'text-anchor': 'middle', 'font-family': 'monospace' })
				;

				draw
					.text(p.name)
					.x(this.toSVGCoord(endX - 2.54 / 4))
					.y(this.toSVGCoord(y - 1))
					.attr({ fill: '#98C379', 'text-anchor': 'end', 'font-family': 'monospace' })
				;
			}

		}

		this.output = kiSymbol.write();
	}

	updateTable() {
		if (this.totalPins === this.pins.length) {
			return;
		}
		if (this.totalPins < this.pins.length) {
			this.pins = this.pins.slice(0, this.totalPins);
		}
		else {
			const pinsToAdd = this.totalPins - this.pins.length;
			const lastPin = this.pins.length === 0 ? undefined : this.pins[this.pins.length - 1];
			const lastPinIndex = lastPin ? lastPin.n + 1 : 1;
			for (let i = lastPinIndex; i < lastPinIndex + pinsToAdd; i++) {
				this.pins.push({
					n: i,
					name: 'PIN_' + i,
					number: i.toString()
				});
			}

		}
	}
}