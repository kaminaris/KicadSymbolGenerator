import { CommonModule }                     from '@angular/common';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SymbolGeneratorComponent }         from './Component/SymbolGenerator/SymbolGeneratorComponent';
import { routing }                          from './SymbolGeneratorRouting';

@NgModule({
	imports: [
		CommonModule, routing, ReactiveFormsModule, FormsModule
	],
	declarations: [
		SymbolGeneratorComponent
	],
	providers: []
})
export class SymbolGeneratorModule {

}