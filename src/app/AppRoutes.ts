import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'symbol-generator',
		loadChildren: () => import('./Module/SymbolGenerator/SymbolGeneratorModule').then(m => m.SymbolGeneratorModule)
	},
	{ path: '**', redirectTo: '/symbol-generator/generate', pathMatch: 'full' },
];
