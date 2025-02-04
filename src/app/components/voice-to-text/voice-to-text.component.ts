import { Component } from '@angular/core';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OpenaiService } from '../../services/open-ai.service';

@Component({
  selector: 'app-voice-to-text',
  standalone: true,
  imports: [HttpClientModule , CommonModule],
  providers: [SpeechRecognitionService, OpenaiService],
  templateUrl: './voice-to-text.component.html',
  styleUrl: './voice-to-text.component.scss'
})
export class VoiceToTextComponent {
  
  transcript: string = '';
  chatGPTResponse: string = '';

  constructor(private speechRecognitionService: SpeechRecognitionService, private openAIService: OpenaiService) {}

  startListening() {
    this.speechRecognitionService.startRecognition();
  }

  pauseListening() {
    this.speechRecognitionService.stopRecognition();
    this.transcript = this.speechRecognitionService.getFinalTranscript();

    this.openAIService.sendTextToChatGPT(this.transcript).subscribe(response => {
      this.chatGPTResponse = response.choices[0].message.content;
    }, error => {
      console.error('Error with ChatGPT API:', error);
    });
  }

  clearTranscript() {
    this.transcript = '';
    this.chatGPTResponse = '';
  }
}
