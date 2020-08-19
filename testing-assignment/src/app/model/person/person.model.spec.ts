import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Person} from './person.model';

describe('Person', () => {
  let newPerson: Person;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        Person
      ],
    }).compileComponents();
    newPerson = new Person('John');
  }));

  it('should return the correct person name', () => {
    expect(newPerson.sayHello()).toEqual('Hi, John');
  });

  afterEach(() => {
    newPerson = null;
  });
});
