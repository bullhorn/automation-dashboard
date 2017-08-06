import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TeamService } from './team.service';
import { config } from '../../config/config';

describe('TeamService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: config.backendURL, useValue: 'http://example.com' },
        TeamService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  const mockResponse = {
    data: [
      { id: 0, name: 'team 0' },
      { id: 1, name: 'team 1' },
    ]
  };
  describe('getOptions()', () => {
    it('should return a promise containing teams',
        inject([TeamService, XHRBackend], (TeamService, mockBackend) => {


        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TeamService.getOptions().then((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('team 0');
          expect(videos.data[1].name).toBe('team 1');
        });
    }));
  });

  describe('query()', () => {
    it('should return an observable containing teams',
        inject([TeamService, XHRBackend], (TeamService, mockBackend) => {


        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TeamService.query({}).subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('team 0');
          expect(videos.data[1].name).toBe('team 1');
        });
    }));
  });

  describe('update()', () => {
    it('should return an observable containing teams',
        inject([TeamService, XHRBackend], (TeamService, mockBackend) => {


        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TeamService.update().subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('team 0');
          expect(videos.data[1].name).toBe('team 1');
        });
    }));
  });

  describe('syncTeamTests()', () => {
    it('should return an observable',
        inject([TeamService, XHRBackend], (TeamService, mockBackend) => {


        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TeamService.syncTeamTests('test').subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('team 0');
          expect(videos.data[1].name).toBe('team 1');
        });
    }));
  });
  describe('sendSlackReport()', () => {
    it('should return an observable',
        inject([TeamService, XHRBackend], (TeamService, mockBackend) => {


        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        TeamService.sendSlackReport('test').subscribe((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('team 0');
          expect(videos.data[1].name).toBe('team 1');
        });
    }));
  });
});

