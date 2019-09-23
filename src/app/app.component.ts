import { Component, EventEmitter } from '@angular/core';
import { OnInit, Output } from '@angular/core';

import Calendar from 'js-year-calendar';
import 'js-year-calendar/locales/js-year-calendar.de';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Output() emitter = new EventEmitter<object>();
  data = [];

  calendar: any = null;
  options: any = {};
  currentYear = '';

  ngOnInit() {
    this.initializeCalendar();
  }


  initializeCalendar() {

    // tslint:disable-next-line:max-line-length
    this.data = [
      {
        id: 0,
        name: 'Urlaub',
        location: 'Essen',
        startDate: new Date(2019, 4, 1),
        endDate: new Date(2019, 4, 16)
      },
      {
        id: 1,
        name: 'Messe',
        location: 'Hannover',
        startDate: new Date(2019, 2, 16),
        endDate: new Date(2019, 2, 19)
      },
    ];



    const emityear = (currentYear) => {
      this.doChangeYear(currentYear);
    };

    this.options = {
      style: 'background',
      dataSource: this.data,
      language: 'de',
      clickDay(e) {
        console.log('ClickDay ' + JSON.stringify(e));
      },
      mouseOnDay(e) {
        if (e.events.length > 0) {
          let mycontent = '';
          // tslint:disable-next-line:forin
          for (const i in e.events) {
            mycontent += '<div class="event-tooltip-content">'
              + '<div class="event-name">' + e.events[i].Name + '</div>'
              + '</div>';
          }

          jQuery(e.element).popover({
            trigger: 'manual',
            container: 'body',
            html: true,
            content: mycontent
          });
          jQuery(e.element).popover('show');

        }
      },
      mouseOutDay(e) {
        if (e.events.length > 0) {
          jQuery(e.element).popover('hide');
        }
      },
      yearChanged(e) {
        emityear(e.currentYear);
      },
      enableRangeSelection: true,
      roundRangeLimits: true,
      enableContextMenu: true,
    };

    this.calendar = new Calendar('#calendar', this.options);

  }

  doChangeYear(year) {
    console.log('Year changed');
    this.currentYear = year;
  }

}

