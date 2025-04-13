import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  tabs = [
    { title: 'Альбомы', path: 'albums' },
    { title: 'Исполнители', path: 'artists' },
    { title: 'Рецензии', path: 'reviews' },
    { title: 'Теги', path: 'tags' },
    { title: 'Треки', path: 'tracks' },
    { title: 'Жанры', path: 'genres' }
  ];

}
