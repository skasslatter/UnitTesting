## Mocking HTTP

Let’s begin with the basic test setup for our service:

```javascript
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule,
         HttpTestingController } from '@angular/common/http/testing';

describe('CoursesService', () => {
  let httpTestingController: HttpTestingController;
  let service: CoursesService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CoursesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

We setup the `TestBed` importing the `HttpClientTestingModule` and providing the `HttpTestingController`.
You can use the `HttpTestingController` to mock requests and the `flush` method to provide dummy values as responses. As the HTTP request methods return an Observable, we subscribe to it and create our expectations in the callback methods.

I would like this service to allow us perform two different requests:

1. A **POST request** to add a new course that belongs to a specific topic.
2. A **GET request** to get all the courses that belong to a particular topic.

```javascript


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

   addCourse(course: any): Observable<any> {
     return this.http.post<any>(`http://localhost:8089/topics/${course.topicId}/courses`, course);
   }

   getCoursesByTopic(topicId: any): Observable<any> {
     return this.http.get(`http://localhost:8089/topics/${topicId}/courses`);
   }
}
```

- We inject a private variable of the `HttpClient` into our constructor. Unlike in the tests, where we do not really perform real HTTP requests, thanks to the mock provided by Angular, we need to use this module now.
- Now we create a function `addCourse` that will return an Observable to which we can subscribe from our components to consume the data that they will carry with them.
- We pass the course information as a parameter to be able to save it.
- We access the endpoint using the topicId of such course specified as the data of the POST request.

let’s write a test for the first case:

```javascript
describe('#addCourse()', () => {
  it('returned Observable should match the right data', () => {
    const mockCourse = {
      name: 'Chessable',
      description: 'Space repetition to learn chess, backed by science'
    };

    service.addCourse({ topicId: 1 })
      .subscribe(courseData => {
        expect(courseData.name).toEqual('Chessable');
      });

    const req = httpTestingController.expectOne('http://localhost:8089/topics/1/courses');

    expect(req.request.method).toEqual('POST');

    req.flush(mockCourse);
  });
});
```

Let’s breakdown this test. This is basically what we want to achieve :

- We create a `mockCourse` with a name and a description.
- We run the `addCourse` function and we expect that the property name in the response that we will get when the request is when the observable resolves out is ‘*Chessable*’.
- Then we have a req URL, when we call the function `addCourse`, we expect that we can call the endpoint defined as a param of `expectOne` which is checking that there is just one request.
- We also check that the type of request is a POST.
- Then we `flush` or respond with the mock data that we pass as a parameter, and that causes the Observable to resolve and evaluate the expect on line 10.
- Finally we run the afterEach block from the first codeblock to **verify** that there are no pending HTTP requests.

Let’s now add the test to get our courses by topic:

```javascript
describe('#getCoursesByTopic', () => {
    it('returned Observable should match the right data', () => {
      const mockCourses = [
        { name: 'Chessable',
          description: 'Space repetition to learn chess, backed by science'
        },
        { name: 'ICC',
          description: 'Play chess online'
        }
      ];

      service.getCoursesByTopic(1)
        .subscribe(coursesData => {
          expect(coursesData[0].name).toEqual('Chessable');
          expect(coursesData[0].description).toEqual(
            'Space repetition to learn chess, backed by science'
          );
          
          expect(coursesData[1].name).toEqual('ICC');
          expect(coursesData[1].description).toEqual(
            'Play chess online'
          );
        });

      const req = httpTestingController.expectOne(
        'http://localhost:8089/topics/1/courses'
      );

      req.flush(mockCourses);
    });
  });
```

In this case, we just need to take a topicId to be able to match the endpoint and retrieve only the courses for a particular topicId.
