import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../../Auth/auth.service';
import {ProfileService} from '../profile/profile.service';
import {Post} from './post/post.model';
import {User} from '../user.model';
import {HandlerService} from '../../shared/handler.service';

@Injectable()
export class PostsService {
  user: User;
  postsUpdated = new Subject<Post[]>();
  postLoaded = new Subject<Post>();

  constructor(private http: HttpClient,
              private profileService: ProfileService,
              private authService: AuthService,
              private handlerService: HandlerService) {
    this.user = this.authService.user;
  }

  getPosts(page = 1, id = null, type = null) {
    let urlParams = '';
    if (id && type) {
      urlParams = id + '/' + type + '/';
    }
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/posts/' + urlParams + '?page=' + page, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data.posts);
            if (page === 1) {
              this.user.posts = [];
            }
            this.user.posts.push(...data.posts);
          },
          error => {
            console.log(error);
            this.handlerService.handleRequest(error.status);
          },
        )
      );
  }

  addPost(post: Post) {
    this.user.posts.unshift(post);
    this.postsUpdated.next(this.user.posts);
  }

  removePost(post: Post) {
    this.user.posts = this.user.posts.filter((postItem) => postItem.id !== post.id);
    this.postsUpdated.next(this.user.posts);
  }


  likePost(post: Post) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/like-post', {post_id: post.id}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  unlikePost(post: Post) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/unlike-post/' + post.id, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPost(content: string, image: File, pageId: number = null): Observable<any> {
    console.log(this.user.posts);
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/posts', {content, image, page_id: pageId}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  sharePost(content: string = null, image: string = null, postOwnerId: number = null, pageId: number = null): Observable<any> {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/posts',
      {content, image, postOwnerId, page_id: pageId}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  updatePost(content: string, postId: number): Observable<any> {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/posts/' + postId,
      {content, post_id: postId}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  deletePost(postId: number) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/posts/' + postId, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  findPost(id: number) {
    if (this.user && this.user.posts) {
      return this.user.posts.find(post => {
        return post.id === id;
      });
    }
  }

  getPost(id: number) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/posts/' + id, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data.post);
            this.postLoaded.next(data.post);
          },
          error => {
            console.log(error);
            this.handlerService.handleRequest(error.status);
          },
        )
      );
  }
}
