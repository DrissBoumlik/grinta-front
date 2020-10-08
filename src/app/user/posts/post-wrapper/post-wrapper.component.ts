import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Post} from '../post/post.model';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-wrapper',
  templateUrl: './post-wrapper.component.html',
  styleUrls: ['./post-wrapper.component.css']
})
export class PostWrapperComponent implements OnInit {
  post: Post;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (Object.entries(params).length === 0 && params.constructor === Object) {
        return;
      }
      if (params.uuid) {
        this.postsService.getPostByUuid(params.uuid).subscribe(
          (response: any) => {
            this.post = response.post;
          },
          (error: any) => console.log(error)
        );
      }
    });
  }

}
