import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {ProfileService} from '../profile/profile.service';
import {Post} from './post/post.model';
import {User} from '../user.model';
import {HandlerService} from '../../shared/handler.service';

@Injectable()
export class PostsService {
  user: User;
  posts: Post[];
  postsLoaded = new Subject<Post[]>();
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
      urlParams = id + '/type/' + type + '/';
    }
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/posts/' + urlParams + '?page=' + page, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            // console.log(data.posts);
            if (page === 1) {
              this.posts = [];
            }
            this.posts.push(...data.posts);
            this.postsLoaded.next(this.posts);
          },
          error => {
            console.log(error);
            this.handlerService.handleRequest(error.status);
          },
        )
      );
  }

  addPost(post: Post) {
    this.posts.unshift(post);
    this.postsUpdated.next(this.posts);
  }

  removePost(post: Post) {
    this.posts = this.posts.filter((postItem) => postItem.id !== post.id);
    this.postsUpdated.next(this.posts);
  }


  likePost(post: Post) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/like-post', {post_id: post.id}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => {
            // console.log(data);
          },
          error => console.log(error.status),
        )
      );
  }

  unlikePost(post: Post) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/unlike-post/' + post.id, {headers: AuthService.headers})
      .pipe(
        tap(
          data => {
            // console.log(data);
          },
          error => console.log(error.status),
        )
      );
  }

  createPost(body: any): Observable<any> {
    // console.log(this.posts);
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/posts',
      body, {headers: AuthService.headers})
      .pipe(
        tap(
          data => {
            // console.log(data);
          },
          error => console.log(error.status),
        )
      );
  }

  sharePost(body: string = null, image: string = null, postOwnerId: number = null, pageId: number = null): Observable<any> {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/posts',
      {body, image, postOwnerId, page_id: pageId}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  updatePost(body: string, postId: number): Observable<any> {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/posts/' + postId,
      {body, post_id: postId}, {headers: AuthService.headers})
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
    if (this.user && this.posts) {
      return this.posts.find(post => {
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

  getPostByUuid(uuid: string) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/posts/uuid/' + uuid, {headers: AuthService.headers})
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
