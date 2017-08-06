import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestService } from './test.service';
import { config } from '../../config/config';

describe('TestService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: config.backendURL, useValue: 'http://example.com' },
        TestService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  const mockResponse = {
    data: [
      { id: 0, name: 'test 0' },
      { id: 1, name: 'test 1' },
    ]
  };

  describe('query()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.query({}).subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });

  describe('update()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.update().subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });

  describe('create()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.create({}).subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });

  describe('massCreate()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.massCreate({}).subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });

  describe('delete()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.delete('2').subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });
  describe('testListQuery()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.testListQuery().subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });
  describe('resultTotals()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.resultTotals('team').subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });
  describe('sidebarTotals()', () => {
    it('should return an observable containing tests',
        inject([TestService, XHRBackend], (TestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TestService.sidebarTotals({}).subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('test 0');
          expect(videos.data[1].name).toBe('test 1');
        });
    }));
  });
});
