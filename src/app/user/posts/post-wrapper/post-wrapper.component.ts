import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Post} from '../post/post.model';
import {PostsService} from '../posts.service';
import {Title} from '@angular/platform-browser';
import {post} from 'selenium-webdriver/http';
import {ToolsService} from '../../../shared/tools.service';

@Component({
  selector: 'app-post-wrapper',
  templateUrl: './post-wrapper.component.html',
  styleUrls: ['./post-wrapper.component.css']
})
export class PostWrapperComponent implements OnInit {
  post: Post;

  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private toolService: ToolsService,
              private postsService: PostsService) {}

  ngOnInit() {
    this.titleService.setTitle('Post');

    this.route.params.subscribe((params: Params) => {
      if (Object.entries(params).length === 0 && params.constructor === Object) {
        return;
      }
      if (params.uuid) {
        this.postsService.getPostByUuid(params.uuid).subscribe(
          (response: any) => {
            this.post = response.post;
            this.titleService.setTitle('Post - ' + this.toolService.excerpt(this.post.body, 30));
          },
          (error: any) => console.log(error)
        );
      }
    });
  }

}
