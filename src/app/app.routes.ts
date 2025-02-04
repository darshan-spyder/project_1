import { Routes } from '@angular/router';
import { VoiceToTextComponent } from './components/voice-to-text/voice-to-text.component';

export const routes: Routes = [
    { path: '', redirectTo: '/voice-to-text', pathMatch: 'full' },
    { path: 'voice-to-text', component: VoiceToTextComponent },
];
