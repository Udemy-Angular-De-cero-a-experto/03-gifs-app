import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  public numGifs: number = 10;

  private _tagsHistory: string[] = [];
  private apiKey: string = 'dc5BkW328M5OvgCCMtiVJilEtNQNqHf5';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
   }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  organizeHistory( tag: string): void {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag != tag);
    };

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem( 'history', JSON.stringify( this._tagsHistory ));
    localStorage.setItem( 'numGifs', this.numGifs.toString() );
  }

  private loadLocalStorage(): void {
    if ( !localStorage.getItem( 'history' )) return;
    this._tagsHistory = JSON.parse( localStorage.getItem( 'history' )!);

    if ( localStorage.getItem( 'numGifs' ) != null ) {
      this.numGifs = parseInt( localStorage.getItem( 'numGifs' )! );
    };

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }

  searchTag( tag: string): void {
    if ( tag.length === 0 ) return;

    this.organizeHistory(tag);

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=dc5BkW328M5OvgCCMtiVJilEtNQNqHf5&q=valorant&limit=10');
    // const data = await resp.json();
    // console.log( data );

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', this.numGifs.toString());

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( (resp) => {
        this.gifList = resp.data;

        // console.log( { gifs: this.gifList } );
      });

  }

}
