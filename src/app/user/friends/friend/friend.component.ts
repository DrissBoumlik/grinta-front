import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  @Input() friend: User;
  constructor() { }
  //* TODO: Responsive styles for friends list
  ngOnInit() {
  }

}
