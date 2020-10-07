import { UserService } from '../user.service';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { User } from '../user.model';
import {RelationService} from './relation.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: User[];
  noFriends = false;
  @ViewChild('chatBox', {static: false}) chatBox: ElementRef;

  constructor(private userService: UserService,
              private relationService: RelationService) { }

  ngOnInit() {
    this.relationService.getFriends().subscribe((response: any) => {
      this.friends = this.relationService.friends = response.friends;
      this.noFriends = !this.friends.length;
    });
  }

  onSearch(value: string) {
    this.friends = this.relationService.searchFriends(value.toLowerCase());
  }
}
