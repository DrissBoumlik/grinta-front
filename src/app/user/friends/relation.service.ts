import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {User} from '../user.model';
import {AuthService} from '../../auth/auth.service';

// import {r} from 'rethinkdb-ts';

@Injectable()
export class RelationService {
  friends: User[] = [];
  relations: User[] = [];

  constructor(private http: HttpClient) {}

  getFriends(page = 1) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/friends?page=' + page, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            // console.log(data);
            if (page === 1) {
              this.friends = [];
            }
            // this.friends = data.friends;
            this.friends.push(...data.friends);
          },
          error => console.log(error.status),
        )
      );
  }

  getRelations(page = 1, searchTerm = '') {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + `/search/relations?page=${page}&term=${searchTerm}`, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            // console.log(data);
            if (page === 1) {
              this.relations = [];
            }
            // this.friends = data.friends;
            this.relations.push(...data.relations);
          },
          error => console.log(error.status),
        )
      );
  }

  getCityFriends(city: string, page = 1) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/friends/city/' + city + '?page=' + page, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            // console.log(data);
            // this.friends = data.cityFriends;
            if (page === 1) {
              this.friends = [];
            }
            // this.friends = data.friends;
            this.friends.push(...data.cityFriends);
          },
          error => console.log(error.status),
        )
      );
  }

  searchFriends(value: string) {
    return this.friends.filter((friend: User) => {
      return friend.firstname.toLowerCase().includes(value) || friend.lastname.toLowerCase().includes(value);
    });
  }

  getFollowings() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/followings', {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            // console.log(data);
            this.friends = data.followings;
          },
          error => console.log(error.status),
        )
      );
  }

  getFollowers() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/followers', {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            // console.log(data);
            this.friends = data.followers;
          },
          error => console.log(error.status),
        )
      );
  }

  getAddedFriends() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/friends/recent', {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            // console.log(data);
            this.friends = data.addedFriends;
          },
          error => console.log(error.status),
        )
      );
  }
}
