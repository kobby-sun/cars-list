import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  cars: () => `http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars`
};

const carsJson = [
  {
    name: 'New York Car Show',
    cars: [
      {
        make: 'Hondaka',
        model: 'Elisa'
      },
      {
        make: 'George Motors',
        model: 'George 15'
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 1'
      },
      {
        make: 'Moto Tourismo',
        model: 'Cyclissimo'
      },
      {
        make: 'Edison Motors',
        model: ''
      }
    ]
  },
  {
    name: 'Melbourne Motor Show',
    cars: [
      {
        make: 'Julio Mechannica',
        model: 'Mark 4S'
      },
      {
        make: 'Hondaka',
        model: 'Elisa'
      },
      {
        make: 'Moto Tourismo',
        model: 'Cyclissimo'
      },
      {
        make: 'George Motors',
        model: 'George 15'
      },
      {
        make: 'Moto Tourismo',
        model: 'Delta 4'
      }
    ]
  },
  {
    name: 'Cartopia',
    cars: [
      {
        make: 'Moto Tourismo',
        model: 'Cyclissimo'
      },
      {
        make: 'George Motors',
        model: 'George 15'
      },
      {
        make: 'Hondaka',
        model: 'Ellen'
      },
      {
        make: 'Moto Tourismo',
        model: 'Delta 16'
      },
      {
        make: 'Moto Tourismo',
        model: 'Delta 4'
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 2'
      }
    ]
  },
  {
    name: 'Carographic',
    cars: [
      {
        make: 'Hondaka',
        model: 'Elisa'
      },
      {
        make: 'Hondaka',
        model: 'Elisa'
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 4'
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 2'
      },
      {
        make: 'Moto Tourismo'
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 4'
      }
    ]
  },
  {
    cars: [
      {
        make: 'Moto Tourismo',
        model: 'Delta 4'
      }
    ]
  }
];

@Injectable()
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<any> {
    // return new Observable(observer => {
    //   observer.next(carsJson);
    //   observer.complete();
    // });
    return this.httpClient
      .cache()
      .get(routes.cars())
      .pipe(
        map((body: any) => body),
        catchError(() => of(carsJson))
      );
  }
}
