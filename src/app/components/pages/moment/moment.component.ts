import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moments';
import { Comment } from 'src/app/Comment';

import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;

  faTimes = faTimes;
  faEdit = faEdit;

  baseApiUrl = environment.baseApiUrl; // url da api

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesServices: MessagesService,
    private routes: Router,
    private commentServices: CommentService
  ) {}

  ngOnInit(): void {
    //Id que está na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });  
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandle(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messagesServices.add('Momento excluído com sucesso!');

    setTimeout(() => {
      this.routes.navigate(['/']);
    }, 1000);

    console.log('Item excluído com sucesso!');
  }

  async onSubmit(formDirective: FormGroupDirective){
    
    if(this.commentForm.invalid){
        return
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentServices.creatComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.messagesServices.add('Comentário foi adicionado com sucesso!')

    // Reseta o forms, deve-se usar os dois paramentros 
    this.commentForm.reset();
    formDirective.resetForm();
  }
}
