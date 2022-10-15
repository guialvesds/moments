import { Component, OnInit } from '@angular/core';

import {faTimes} from '@fortawesome/free-solid-svg-icons';

import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

// Pacote de icones -- ng add @fortawesome/angular-fontawesome
export class MessagesComponent implements OnInit {

  faTimes = faTimes;

  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void {
  }


}
