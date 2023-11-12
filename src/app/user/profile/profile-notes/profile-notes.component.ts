import {Component, OnInit} from '@angular/core';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';
import {NoteService} from '../../../shared/note.service';

@Component({
  selector: 'app-profile-notes',
  templateUrl: './profile-notes.component.html',
  styleUrls: ['./profile-notes.component.css']
})
export class ProfileNotesComponent implements OnInit {
  profile: User;
  notes: (User | any)[];
  loadingData = true;

  chartData: any[] = [];
  multi: any[];
  view: any[] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Type';
  showYAxisLabel = true;
  yAxisLabel = 'Note';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private profileService: ProfileService,
              private noteService: NoteService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.onGetNotes(this.profile.uuid);
    });
    this.profile = this.profileService.profile;
    this.onGetNotes(this.profile.uuid);
  }

  onGetNotes(uuid: string = null) {
    this.noteService.getNotesByUser(uuid)
      .subscribe((response: any) => {
          this.notes = [];
          this.chartData = [];
          const noteSum = response.notes.reduce((accumulator, noteItem) => {
            accumulator = {
              behavior: accumulator.behavior + noteItem.value.behavior,
              performance: accumulator.performance + noteItem.value.performance
            };
            return accumulator;
          }, {behavior: 0, performance: 0});
          Object.keys(noteSum).forEach((key) => {
            this.chartData.push({name: key, value: noteSum[key]});
          });
          console.clear();
          console.log(this.chartData);
          this.notes = response.notes.map((note) => {
            return {user: note.noting_user, value: note.value};
          });
          this.loadingData = false;
          console.log(this.notes);
        }
      );
  }

  onSelect(event) {
    console.log(this.notes);
    console.log(event);
  }

}
