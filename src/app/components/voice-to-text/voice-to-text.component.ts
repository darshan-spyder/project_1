import { Component } from '@angular/core';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';

@Component({
  selector: 'app-voice-to-text',
  standalone: true,
  imports: [],
  templateUrl: './voice-to-text.component.html',
  styleUrl: './voice-to-text.component.scss'
})
export class VoiceToTextComponent {
  
  transcript: string = '';  // Holds the final converted text

  constructor(private speechRecognitionService: SpeechRecognitionService) {}

  startListening() {
    this.speechRecognitionService.startRecognition();
  }

  pauseListening() {
    this.speechRecognitionService.stopRecognition();
    // Get the final transcript after stopping recognition
    this.transcript = this.speechRecognitionService.getFinalTranscript();
  }

  clearTranscript() {
    this.transcript = '';
  }
}
