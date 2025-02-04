import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  
  recognition: any;
  isListening: boolean = false;
  finalTranscript: string = '';  // Store final transcript after stopping

  constructor(private ngZone: NgZone) {
    const { webkitSpeechRecognition }: any = window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let transcript = event.results[event.resultIndex][0].transcript;
      this.ngZone.run(() => {
        this.finalTranscript += transcript + ' ';
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error detected: ' + event.error);
    };
  }

  startRecognition() {
    if (!this.isListening) {
      this.finalTranscript = '';  // Clear transcript on new start
      this.recognition.start();
      this.isListening = true;
    }
  }

  stopRecognition() {
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getFinalTranscript(): string {
    return this.finalTranscript;
  }
}
