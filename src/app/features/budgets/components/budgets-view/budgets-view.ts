import { Component, inject } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-budgets-view',
	imports: [
		JsonPipe
	],
  template: `
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
