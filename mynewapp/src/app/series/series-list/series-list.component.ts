import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';
import { Serie } from '../serie';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  series: Array<Serie> = [];
  averageSeasons: number = 0; // Nueva propiedad para el promedio

  constructor(private seriesService: SeriesService) { }

  getSeries(): void {
    this.seriesService.getSeries().subscribe((series) => {
      this.series = series;
      this.calculateAverageSeasons(); // Calcular el promedio después de obtener las series
    });
  }

  calculateAverageSeasons(): void {
    const totalSeasons = this.series.reduce((acc, serie) => acc + serie.seasons, 0);
    this.averageSeasons = totalSeasons / this.series.length;
  }

  ngOnInit(): void {
    this.getSeries();
  }
}
