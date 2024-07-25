import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <div class="row">
      <div class="col">
        <h5>Buscar:</h5>
        <input type="text"
        class="form-control my-2"
        placeholder="Buscar gifs..."
        (keyup.enter)="searchTag()"
        #txtTagInput
        >
      </div>
      <div class="col">
        <h5>nº imágenes:</h5>
        <input type="number"
          class="form-control my-2"
          value="{{ numGifs }}"
          (change)="changeNumGifs()"
          #numGifsInput
        >
      </div>
    </div>
  `
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
