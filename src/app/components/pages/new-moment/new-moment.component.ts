import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moments';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText = 'Compartilhar!';
  
  constructor(private momentService: MomentService, 
    private messagesService: MessagesService, 
    private router: Router) { }

  ngOnInit(): void {
  }

 async createHandler(moment: Moment){
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);
  
    if(moment.image) {
      formData.append("image", moment.image);
    }

    //to do

    //enviar para o service

    await this.momentService.createMoment(formData).subscribe();

    //exibir a mensagem de sucesso

    this.messagesService.add('Momento adicionado com sucesso!')

    //redirect para outra pagina
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
    
  }

}