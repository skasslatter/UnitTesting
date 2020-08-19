import {TestBed} from '@angular/core/testing';
import {PostService} from './post.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('PostService', () => {
  let httpTestingController: HttpTestingController;
  let service: PostService;
  const mockPost = [
    {
      userId: 1,
      id: 1,
      title: 'Hello',
      body: 'How are you',
    },
    {
      userId: 2,
      id: 2,
      title: 'Hoi',
      body: 'All good?',
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return an Observable that matches the right data', () => {
    service.getPosts().subscribe(post => {
      expect(post[0].title).toBe('Hello');
      expect(post[1].body).toBe('All good?');
    });
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPost);
  });
});


