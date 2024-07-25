import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})

export class SearchBoxComponent {
  constructor( private gifsService: GifsService) { }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  @ViewChild('numGifsInput')
  public numGifsInput!: ElementRef<HTMLInputElement>;

  get numGifs(): number {
    return this.gifsService.numGifs;
  }

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.numGifs = parseInt(this.numGifsInput.nativeElement.value);
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }

  changeNumGifs(): void {
    this.gifsService.numGifs = parseInt(this.numGifsInput.nativeElement.value);
    this.gifsService.searchTag(this.gifsService.lastTag);
  }
}
