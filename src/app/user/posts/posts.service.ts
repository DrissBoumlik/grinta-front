import {Post} from './post/post.model';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../user.model';
import {Subject} from 'rxjs';
import {AuthService} from '../../Auth/auth.service';
import {Injectable} from '@angular/core';
import {ProfileService} from '../profile/profile.service';

@Injectable()
export class PostsService {
  static headers = undefined;
  user: User;
  postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient,
              private profileService: ProfileService,
              private authService: AuthService) {
    this.user = this.authService.user;
  }

  static getHeaders() {
    PostsService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  getPosts(page = 1, profileId = null) {
    profileId = profileId === null ? '' : profileId + '/';
    PostsService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/posts/' + profileId + '?page=' + page, {headers: PostsService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data.posts);
            // this.user.posts = data.posts;
            },
          error => console.log(error),
        )
      );
  }

  addPost(post: Post) {
    this.user.posts.unshift(post);
    this.postsUpdated.next(this.user.posts);
  }

  removePost(post: Post) {
    this.user.posts = this.user.posts.filter((_post) => _post.id !== post.id);
    this.postsUpdated.next(this.user.posts);
  }
}
