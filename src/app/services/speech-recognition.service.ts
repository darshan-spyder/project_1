import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  
  recognition: any;
  isListening: boolean = false;
  finalTranscript: string = '';  // Store final transcript after stopping

  private deepAiApiKey = '34a25ff6-1efb-4ce7-8439-fe628b3fb5ca';  

  constructor(private ngZone: NgZone, private http: HttpClient) {
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

  summarizeText(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Api-Key': this.deepAiApiKey,
      'Content-Type': 'application/json'
    });

    const body = { text: text };

    return this.http.post('https://api.deepai.org/api/summarization', body, { headers });
  }
}
