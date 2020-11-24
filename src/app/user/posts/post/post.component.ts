import {AuthService} from '../../../auth/auth.service';
import {Component, OnInit, Input} from '@angular/core';
import {Post} from './post.model';
import {UserService} from '../../user.service';
import {PostService} from './post.service';
import {User} from '../../user.model';
import {PostsService} from '../posts.service';
import {ProfileService} from '../../profile/profile.service';
import {PageService} from '../../pages/page/page.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FeedbackService} from '../../../shared/feedback/feedback.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  user: User;
  ownPost = false;
  postLiked = false;
  editMode = false;
  commentsCount = 0;
  likersListShown = false;

  editPostForm = this.fb.group({
    body: new FormControl(null),
  });

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private postService: PostService,
              private postsService: PostsService,
              private pageService: PageService,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.authService.user;
    if (this.post) {
      this.ownPost = this.user.id === this.post.user_id;

      this.updateCommentsCount();

      this.postLiked = this.post.likers.some((liker: User) => liker.id === this.user.id);
    }

    this.postsService.postLoaded.subscribe((post: Post) => {
      this.post = post;
      this.postLiked = this.post.likers.some((liker: User) => liker.id === this.user.id);
      this.commentsCount = 0;
      this.updateCommentsCount();
      // this.post.comments.map((comment) => {
      //   this.commentsCount += comment.replies.length + 1;
      // });
    });

    this.postService.postCommentsUpdated.subscribe((comments) => {
      this.post.comments = comments;
      this.updateCommentsCount();
    });
    // this.route.params.subscribe((params: Params) => {
    //   if (Object.entries(params).length === 0 && params.constructor === Object) {
    //     return;
    //   }
    //   if (params.id) {
    //     this.post = this.postsService.getPost(+params.id);
    //   }
    // });
  }

  updateCommentsCount() {
    this.commentsCount = 0;
    this.post.comments.forEach((comment) => {
      if (comment.is_visible) {
        this.commentsCount += 1;
        // this.commentsCount += comment.replies.length + 1;
        const visibleReplies = comment.replies.filter((reply) => {
          return reply.is_visible;
        });
        this.commentsCount += visibleReplies.length;
      }
    });
  }

  onLikePost() {
    this.postLiked = this.post.likers.some((liker: User) => liker.id === this.user.id);
    if (this.postLiked) {
      console.log('You unlike this post');
      this.postsService.unlikePost(this.post).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.post.likers.shift();
          }
        }, (error: any) => {
          console.log(error);
        });
    } else {
      console.log('You like this post');
      this.postsService.likePost(this.post).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.post.likers.unshift(this.user);
          }
        }, (error: any) => {
          console.log(error);
        });
    }
    this.postLiked = !this.postLiked;
  }

  onSharePost() {
    const ownerId = this.post.post_owner_id === null ? this.post.user_id : this.post.post_owner_id;
    const pageId = this.pageService.page ? this.pageService.page.id : null;
    this.postsService.sharePost(this.post.body, this.post.media_url, ownerId, pageId).subscribe((response: any) => {
      if ((this.profileService.profile && this.authService.user.id !== this.profileService.profile.id)) {
        return;
      }
      this.postsService.addPost(response.post);
    });
  }

  onFocusInput() {
    jQuery('#comment-' + this.post.id).focus();
  }

  onDeletePost() {
    if (this.user.id !== this.post.user_id) {
      this.feedbackService.feedbackReceived.next({feedback: 'warning', message: 'You don\'t own this post'});
      return;
    }
    this.postsService.deletePost(this.post.id)
      .subscribe((response: any) => {
      this.postsService.removePost(this.post);
      this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
    });
  }

  onUpdatePost() {
    if (!this.editPostForm.value.body || this.editPostForm.value.body === '') {
      this.feedbackService.feedbackReceived.next({feedback: 'warning', message: 'Post is empty'});
      return;
    }
    this.postsService.updatePost(this.editPostForm.value.body, this.post.id)
      .subscribe((response: any) => {
      // if ((this.profileService.profile && this.authService.user.id === this.profileService.profile.id) || this.pageService.page) {
      //   console.log(this.postsService.posts);
      // }
      // this.postsService.addPost(response.post);
      this.post.body = this.editPostForm.value.body;
      this.editMode = false;
      this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
    });
  }

  onEditPost() {
    this.editMode = true;
    this.editPostForm.patchValue({
      body: this.post.body
    });
  }

  onCancel() {
    this.editMode = false;
  }

  onShowLikersList() {
    this.likersListShown = !this.likersListShown;
  }
}
