import { Component, inject } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service';
import { CurrencyPipe, NgStyle, PercentPipe } from '@angular/common';
import { CdkDialogDataExampleDialog } from '../../../pots/components/pots-view/pots-view';
import { Dialog } from '@angular/cdk/dialog';
import { PaginatedResponse } from '../../../../shared/models/pagination';

@Component({
  selector: 'app-budgets-view',
	imports: [
		CurrencyPipe,
		PercentPipe,
		NgStyle
	],
  template: `
		<!-- todo: create chart from chart.js (https://www.chartjs.org/docs/latest/charts/doughnut.html)  (with builder pattern: https://refactoring.guru/design-patterns/builder/typescript/example) -->
		<div class="flex flex-col gap-5 p-4">
			<div class="flex flex-col gap-5">
				<!-- Header -->
				<div class="flex justify-between items-center">
					<h1 class="text-preset-1">Budgets</h1>
					<button class="p-4 bg-gray-900 text-white rounded-2xl text-preset-4 font-semibold hover:cursor-pointer"
									(click)="openDialog()"
					>
						<span>+ Add New Budget</span>
					</button>
				</div>

				<!-- Budgets -->
				@let spent = 30.0;
				<div class="flex flex-col gap-5 lg:flex-row">

					<!-- First / Summary Header -->
					<div class="flex flex-col justify-center bg-white rounded-xl gap-5 px-5 py-10 sm:flex-row sm:gap-20 sm:items-stretch lg:flex-col h-fit grow-1">

						<!-- Graph -->
						<div class="self-center grow">
							<div class="w-72 h-72 bg-amber-500 rounded-full self-center"></div>
						</div>

						<!-- Summary -->
						<div class="flex flex-col grow w-full sm:w-auto gap-5 justify-center">
							<div class="text-preset-2">Spending Summary</div>

							<!-- Budgets -->
							<div class="flex flex-col gap-3">
								@for (budget of getBudgets(); track $index) {
									<!-- todo: sort alphabetically -->
									<div class="flex justify-between">
										<div class="flex gap-5">
											<div class="h-full w-1 rounded-xl" [ngStyle]="{'background-color': budget.theme}"><span class="invisible">.</span></div>
											<span class="text-preset-4 text-gray-500 font-light">{{ budget.category }}</span>
										</div>
										<div class="flex gap-5">
											<span class="text-preset-3">{{ spent | currency:'USD' }}</span>
											<span class="text-preset-5 text-gray-500">of {{ budget.maximum | currency:'USD' }}</span>
										</div>
									</div>
									@if ($index < getBudgets().length - 1) {
										<hr class="text-gray-200">
									}
								}
							</div>
						</div>
					</div>

					<!-- Rest / Categories-->
					<div class="flex flex-col gap-5 grow-3">
						@for (budget of getBudgets(); track budget) {
							<div class="bg-white rounded-xl p-4 space-y-5 py-8">
								<!-- Header -->
								<div class="flex items-center justify-between">
									<div class="flex gap-4 items-center">
										<div class="rounded-full p-3" [ngStyle]="{'background-color': budget.theme }"></div>
										<span class="text-preset-2">{{ budget.category }}</span>
									</div>
									<!-- three dots todo: implement dropdown once it has been refactored -->
									<button class="hover:cursor-pointer hover:fill-gray-500 relative">
										<svg height="4" viewBox="0 0 14 4" width="14">
											<path
												d="m8.75 2c0 .34612-.10264.68446-.29493.97225-.19229.28778-.4656.51209-.78537.64454s-.67164.16711-1.01111.09958c-.33946-.06752-.65128-.23419-.89603-.47893-.24474-.24474-.41141-.55657-.47893-.89603-.06753-.33947-.03287-.69134.09958-1.01111.13246-.31977.35676-.593079.64454-.785372.28779-.192292.62613-.294928.97225-.294928.46413 0 .90925.184375 1.23744.512563.32819.328187.51256.773307.51256 1.237437zm-6.75-1.75c-.34612 0-.68446.102636-.97225.294928-.287783.192293-.512085.465602-.644538.785372-.132454.31977-.16711.67164-.099585 1.01111.067524.33946.234195.65129.478937.89603.244746.24474.556566.41141.896026.47893.33947.06753.69134.03287 1.01111-.09958s.59308-.35676.78537-.64454c.1923-.28779.29493-.62613.29493-.97225 0-.46413-.18437-.90925-.51256-1.237437-.32819-.328188-.77331-.512563-1.23744-.512563zm10 0c-.3461 0-.6845.102636-.9722.294928-.2878.192293-.5121.465602-.6446.785372-.1324.31977-.1671.67164-.0996 1.01111.0676.33946.2342.65129.479.89603.2447.24474.5565.41141.896.47893.3395.06753.6913.03287 1.0111-.09958s.5931-.35676.7854-.64454c.1923-.28779.2949-.62613.2949-.97225 0-.22981-.0453-.45738-.1332-.6697-.088-.21232-.2169-.405234-.3794-.567737-.1625-.162502-.3554-.291407-.5677-.379352-.2123-.087946-.4399-.133211-.6697-.133211z"/>
										</svg>
									</button>
								</div>

								<!-- 	Content -->
								<div class="space-y-4">
									<div class="text-preset-4 font-light text-gray-500">Maximum of {{ budget.maximum | currency:'USD' }}</div>

									<!-- Progress bar -->
									@let percentage = (spent / budget.maximum);
									<div class="w-full relative h-8">
										<div class="absolute w-full bg-beige-100 h-8 rounded-lg"></div>
										<div class="absolute top-1 left-1 h-6 rounded-lg" [ngStyle]="{'width': percentage * 100 + '%', 'background-color':budget.theme}"></div>
									</div>

									<!-- Spent/Remaining -->
									<div class="flex justify-start">
										<div class="flex gap-2 items-center grow">
											<div class="h-full w-1 rounded-xl" [ngStyle]="{'background-color': budget.theme}"><span class="invisible">.</span></div>
											<div class="flex flex-col">
												<div class="text-preset-5 text-gray-500">Spent</div>
												<div class="text-preset-4">{{ spent | currency:'USD' }}</div>
											</div>
										</div>

										<div class="flex gap-2 items-center grow">
											<div class="h-full w-1 rounded-xl bg-beige-200"><span class="invisible">.</span></div>
											<div class="flex flex-col">
												<div class="text-preset-5 text-gray-500">Remaining</div>
												<div class="text-preset-4">{{ (budget.maximum - spent) | currency:'USD' }}</div>
											</div>
										</div>
									</div>

									<!-- 	Latest Spending -->
									<div class="bg-beige-100 rounded-xl p-4 flex flex-col gap-5">

										<!-- Header -->
										<div class="flex justify-between">
											<div class="text-preset-3">Latest Spending</div>
											<button class="text-preset-4 font-light text-gray-500 flex items-center gap-4">
												See All
												<div>
													<svg height="11" viewBox="0 0 6 11" width="6">
														<path
															d="m.853506.146465 5.000004 5.000005c.04648.04643.08336.10158.10853.16228.02516.06069.03811.12576.03811.19147 0 .0657-.01295.13077-.03811.19147-.02517.06069-.06205.11584-.10853.16228l-5.000004 5.00003c-.069927.07-.159054.1177-.256097.137-.097042.0193-.197637.0094-.289048-.0285-.091412-.0378-.16953-.102-.2244652-.1843-.0549354-.0823-.08421767-.179-.08413981-.278l-.00000043-9.999984c-.00007788-.098949.02920444-.195695.08413984-.277992.0549356-.082297.1330536-.1464431.2244646-.1843193.091412-.03787611.192007-.04777907.289049-.02845381.097042.01932521.186169.06700801.256097.13701411z"/>
													</svg>
												</div>
											</button>
										</div>

										<!-- Spending -->
										<div class="space-y-2">
											@for (i of [0, 1, 2]; track i) {
												<div class="flex justify-between items-center text-preset-5">
													<div class="font-bold">Papa Software</div>
													<div class="flex flex-col items-end">
														<div class="font-bold">{{ -10.0 | currency:'USD' }}</div>
														<div class="text-gray-500">16 Aug 2024</div>
													</div>
												</div>
												@if (i < 2) {
													<hr class="text-gray-200">
												}
											}
										</div>
									</div>

								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
  `,
  styles: ``
})
export class BudgetsView {
	dataService = inject(DataService);
	dialog = inject(Dialog);

	getBudgets() {
		let budgets = this.dataService.getBudgets() as PaginatedResponse<any>;
		return budgets.data;
	}

	openDialog() {
		this.dialog.open(CdkDialogDataExampleDialog, {
			minWidth: '300px'
		});
	}

}
