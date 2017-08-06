import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ProjectService } from './project.service';
import { config } from '../../config/config';

describe('ProjectService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: config.backendURL, useValue: 'http://example.com' },
        ProjectService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getOptions()', () => {

    it('should return a promise containing projects',
        inject([ProjectService, XHRBackend], (ProjectService, mockBackend) => {

        const mockResponse = {
          data: [
            { id: 0, name: 'Project 0' },
            { id: 1, name: 'Project 1' },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        ProjectService.getOptions().then((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('Project 0');
          expect(videos.data[1].name).toBe('Project 1');
        });

    }));
  });
});

