import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

const subject = webSocket("wss://ws.coincap.io/prices?assets=ALL");

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private server = "https://api.coincap.io/v2"

  constructor(private http: HttpClient) { }

  getAllCrypto(): Observable<any>{
  	let observable: Observable<any> = this.http.get(this.server+"/assets");
    return observable;
  }
}
