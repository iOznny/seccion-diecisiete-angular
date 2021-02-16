import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Youtube } from '../models/youtube.models';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  private url = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyDhw0twGpy-otLH15llM7aq5fdNd9m7_Sw';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) { 
  }

  getVideos() {
    const params = new HttpParams()
    .set('part', 'snippet')
    .set('key', this.apiKey)
    .set('playlistId', this.playlist)
    .set('maxResults', '10')
    .set('pageToken', this.nextPageToken)

    return this.http.get<Youtube>(`${ this.url }/playlistItems`, { params }).pipe(
      map( resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items
      }),
      map( items => items.map( v => v.snippet))
    );
  }
  
}
