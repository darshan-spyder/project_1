import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';  // Replace this with your actual API key

  constructor(private http: HttpClient) {}

  sendTextToChatGPT(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',  // or gpt-4 if available in your account
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,  // Adjust this as needed
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}

