import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent }         from './app/AppComponent';
import { appConfig }            from './app/AppConfig';

bootstrapApplication(AppComponent, appConfig)
	.catch((err) => console.error(err));
