import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { SpeechRecognitionService } from './services/speech-recognition.service';
import { OpenaiService } from './services/openai.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), SpeechRecognitionService, OpenaiService]
};
