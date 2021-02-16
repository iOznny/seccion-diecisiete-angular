import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public movies: Video[] = [];

  constructor(private yt: YoutubeService) { }

  /**
   * El operador de propagación spread operator ( ...element ) permite que una expresión sea expandida 
   * en situaciones donde se esperan múltiples argumentos 
   * (llamadas a funciones) o múltiples elementos (arrays literales).
  */

  ngOnInit(): void {
    this.loadMovies();
  }

  seeMovie(movie: Video) {
    console.log(movie);

    Swal.fire({
      title: movie.title,
      html: `
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${ movie.resourceId.videoId }" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      `
    });
  }

  loadMovies() {
    this.yt.getVideos().subscribe( resp => {
      this.movies.push(...resp);
      console.log(this.movies);
    });
  }

}
