import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { CarService } from './car.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;

  makes: any = {};

  _: any = _;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService
      .getCars()
      .pipe(
        finalize(() => {
          // this.isLoading = false;
        })
      )
      .subscribe((cars: any) => {
        let makes = _.reduce(
          cars,
          function(o, show) {
            o = _.reduce(
              show.cars,
              function(x, car) {
                if (!x[car.make]) {
                  x[car.make] = {
                    make: car.make,
                    models: {}
                  };
                }
                if (car.model) {
                  if (!x[car.make].models[car.model]) {
                    x[car.make].models[car.model] = {
                      model: car.model,
                      shows: []
                    };
                  }
                  if (!_.isEmpty(show.name) && !_.find(x[car.make].models[car.model].shows, s => s == show.name))
                    x[car.make].models[car.model].shows.push(show.name);
                }
                return x;
              },
              o
            );
            return o;
          },
          {}
        );

        console.log('cars1', makes);

        this.makes = makes;
      });
  }
}
