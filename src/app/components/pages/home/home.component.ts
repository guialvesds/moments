import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moments';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = []; // pega todos
  moments: Moment[] = []; // para filtar e ser exibido depois da busca
  baseApiUrl = environment.baseApiUrl; // url da api

  faSearch = faSearch;
  searchTerm: string = '';

  constructor( private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((itens) => {
      const data = itens.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      })

      this.allMoments = data;
      this.moments = data;
    }); 
  
  }

  search(e: Event): void{
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
     return moment.title.toLowerCase().includes(value);
    });
  }

}