import { Component, inject } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-budgets-view',
	imports: [
		JsonPipe
	],
  template: `
		<!-- todo: create chart from chart.js (https://www.chartjs.org/docs/latest/charts/doughnut.html)  (with builder pattern: https://refactoring.guru/design-patterns/builder/typescript/example) -->
    <p>
      budgets-view works!
    </p>
		<pre class="whitespace-pre-wrap break-words overflow-x-auto">
			{{ dataService.getBudgets() | json }}
		</pre>
  `,
  styles: ``
})
export class BudgetsView {
	dataService = inject(DataService);

}
