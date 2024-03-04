import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SymbolGeneratorComponent } from './Component/SymbolGenerator/SymbolGeneratorComponent';

const routes: Routes = [
	{
		path: 'generate',
		component: SymbolGeneratorComponent
	}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
