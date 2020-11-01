import { Component, OnInit } from '@angular/core';
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
    this.notes = [];
    this.noteService.getNotesByUser(uuid).subscribe(
      (response: any) => {
        this.notes = response.notes.map((note) => {
            return { user: note.noting_user, value: note.value};
        });
        console.clear();
        console.log(this.notes);
      }
    );
  }

}
