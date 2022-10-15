import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Moment } from 'src/app/Moments';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';



@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: Moment;
  btnText: string = 'Editar';

  constructor( 
    private momentService: MomentService, 
    private route: ActivatedRoute, 
    private messageServices: MessagesService,
    private router: Router ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }

  async editHandle(momentData: Moment){
      const id = this.moment.id;
      const formData = new FormData();
      formData.append('title', momentData.title);
      formData.append('description', momentData.description);
      formData.append('image',momentData.image);


      if(momentData.image){
        formData.append('img', momentData.image);
      }
      await this.momentService.updateMoment(id!, formData).subscribe();

      this.messageServices.add(`Moment ${id} foi atualizado com sucesso!`);

      setTimeout(() => {
        this.router.navigate(['/'])
      }, 2000);

     
  }

}
