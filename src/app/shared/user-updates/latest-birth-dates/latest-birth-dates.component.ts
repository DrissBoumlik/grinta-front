import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../user/user.service';
import {User} from '../../../user/user.model';
import {ToolsService} from '../../tools.service';

@Component({
  selector: 'app-latest-birth-dates',
  templateUrl: './latest-birth-dates.component.html',
  styleUrls: ['./latest-birth-dates.component.css']
})
export class LatestBirthDatesComponent implements OnInit {

  users: (User | any)[] = [];
  constructor(private userService: UserService,
              private toolService: ToolsService) { }

  ngOnInit() {
    const params = {limit: 3, period: -6};
    this.userService.getLatestBirthDates(params).subscribe(
      (response: any) => {
        this.users = response.data.map((user) => {
            user._birth_date = this.toolService.timeDifference(new Date(), Date.parse(user.birth_date));
            return user;
        });
      }
    );
  }

}
