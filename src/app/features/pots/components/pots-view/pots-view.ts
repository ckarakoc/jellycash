import { Component, inject } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service';
import { CurrencyPipe, NgStyle, PercentPipe } from '@angular/common';
import { PaginatedResponse } from '../../../../shared/models/pagination';
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
	selector: 'app-pots-view',
	imports: [
		NgStyle,
		CurrencyPipe,
		PercentPipe
	],
	template: `
		<!-- todo: create derived components -->
		<!-- todo: implement active states, implement modals with cdk/angular -->
		<div class="flex flex-col gap-5 p-4">
			<div class="flex justify-between items-center">
				<h1 class="text-preset-1">Pots</h1>
				<button class="p-4 bg-gray-900 text-white rounded-2xl text-preset-4 font-semibold hover:cursor-pointer"
								(click)="openDialog()"
				>
					<span>+ Add New Pot</span>
				</button>
			</div>

			<!-- Pots -->
			<div class="flex flex-col gap-5 lg:grid lg:grid-cols-2">
				@for (pot of getPots(); track pot) {
					<div class="bg-white rounded-xl p-4 space-y-5 py-8">
						<!-- Header -->
						<div class="flex items-center justify-between">
							<div class="flex gap-4 items-center">
								<div class="rounded-full p-3" [ngStyle]="{'background-color': pot.theme}"></div>
								<span class="text-preset-2">{{ pot.name }}</span>
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
							<div class="flex justify-between items-center">
								<span class="text-preset-4 font-light text-gray-500">Total Saved</span>
								<span class="text-preset-1">{{ pot.total | currency:'USD' }}</span>
							</div>

							@let percentage = (pot.total / pot.target);
							<div class="w-full relative h-2">
								<div class="absolute w-full bg-beige-100 h-2 rounded-xl"></div>
								<div class="absolute h-2 rounded-xl" [ngStyle]="{'width': percentage * 100 + '%', 'background-color':pot.theme}"></div>
							</div>

							<div class="flex justify-between items-center">
								<span class="text-preset-4 text-gray-500">{{ percentage | percent:'1.0-2' }}</span>
								<span class="text-preset-4 font-light text-gray-500">Target of {{ pot.target | currency:'USD' }}</span>
							</div>
						</div>

						<!-- 	Buttons -->
						<div class="flex justify-between items-center gap-4">
							<button class="bg-beige-100 p-4 rounded-xl w-1/2 hover:cursor-pointer"
											(click)="openDialog()"
							>
								<span class="text-preset-4">+ Add Money</span>
							</button>

							<button class="bg-beige-100 p-4 rounded-xl w-1/2 hover:cursor-pointer"
											(click)="openDialog()"
							>
								<span class="text-preset-4">Withdraw</span>
							</button>
						</div>
					</div>
				}
			</div>
		</div>
	`,
	styles: ``
})
export class PotsView {
	dataService = inject(DataService);
	dialog = inject(Dialog);


	getPots() {
		let pots = this.dataService.getPots() as PaginatedResponse<any>;
		return pots.data;
	}

	openDialog() {
		this.dialog.open(CdkDialogDataExampleDialog, {
			minWidth: '300px'
		});
	}
}

@Component({
	selector: 'cdk-dialog-data-example-dialog',
	template: `<h1 class="block bg-white p-8 rounded-xl">To be implemented...</h1>`,
	styles: ``,
})
export class CdkDialogDataExampleDialog {
}
