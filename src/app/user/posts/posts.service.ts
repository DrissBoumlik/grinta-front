import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../../Auth/auth.service';
import {ProfileService} from '../profile/profile.service';
import {Post} from './post/post.model';
import {User} from '../user.model';

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

  getPosts(page = 1, profileId = null, pageId = null) {
    let id;
    id = profileId ? profileId + '/user/' : (pageId ? pageId + '/page/' : '');
    PostsService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/posts/' + id + '?page=' + page, {headers: PostsService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data.posts);
            this.user.posts.push(...data.posts);
          },
          error => console.log(error),
        )
      );
  }

  addPost(post: Post) {
    console.log(this.user.posts);
    this.user.posts.unshift(post);
    this.postsUpdated.next(this.user.posts);
  }

  removePost(post: Post) {
    this.user.posts = this.user.posts.filter((_post) => _post.id !== post.id);
    this.postsUpdated.next(this.user.posts);
  }


  likePost(post: Post) {
    PostsService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/like-post', {post}, {headers: PostsService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  unlikePost(post: Post) {
    PostsService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/unlike-post/' + post.id, {headers: PostsService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPost(content: string, image: File, pageId: number = null): Observable<any> {
    console.log(this.user.posts);
    PostsService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/posts', {content, image, page_id: pageId}, {headers: PostsService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  sharePost(content: string = null, image: string = null, postOwnerId: number = null, pageId: number = null): Observable<any> {
    PostsService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/posts',
      {content, image, postOwnerId, page_id: pageId}, {headers: PostsService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
  updatePost(content: string, postId: number): Observable<any> {
    PostsService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/posts/' + postId,
      {content, post_id: postId}, {headers: PostsService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  deletePost(post_id: number) {
    PostsService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/posts/' + post_id, {headers: PostsService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
