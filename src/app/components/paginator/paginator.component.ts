import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

/**
 * @title Paginator
 */
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  standalone: true,
  imports: [MatPaginatorModule],
})
export class Paginator {
  constructor() {}
}
