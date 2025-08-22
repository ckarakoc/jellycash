import { Component, HostListener, inject, Renderer2, signal, viewChild, ViewContainerRef } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';

type SortType = 'latest' | 'oldest' | 'atoz' | 'ztoa' | 'highest' | 'lowest';

@Component({
	selector: 'app-recurring-bills-view',
	imports: [
		CurrencyPipe,
		CommonModule
	],
	providers: [DatePipe],
	template: `
			<!-- todo: make components / Search Functionality / Sort Functionality -->
			<!-- todo: dropdown: https://angular.dev/guide/forms/dynamic-forms#define-control-classes -->

			<h1 class="px-4 pt-8 pb-4 text-preset-1">Recurring Bills</h1>

			<div class="flex flex-col gap-5 p-4 lg:flex-row">

				<div class="flex flex-col gap-5 sm:flex-row lg:flex-col lg:grow lg:max-w-80">
					<!-- Total Bills -->
					<div class="grow flex flex-row items-center justify-start gap-5 rounded-xl bg-gray-900 fill-white px-7 py-7 text-white sm:flex-col sm:justify-around sm:items-start ">
						<div class="">
							<svg width="40" height="40" viewBox="0 0 32 28">
								<path
									d="m24.4375 10.25c0 .2486-.0988.4871-.2746.6629s-.4143.2746-.6629.2746h-15c-.24864 0-.4871-.0988-.66291-.2746-.17582-.1758-.27459-.4143-.27459-.6629s.09877-.4871.27459-.66291c.17581-.17582.41427-.27459.66291-.27459h15c.2486 0 .4871.09877.6629.27459.1758.17581.2746.41431.2746.66291zm-.9375 4.0625h-15c-.24864 0-.4871.0988-.66291.2746-.17582.1758-.27459.4143-.27459.6629s.09877.4871.27459.6629c.17581.1758.41427.2746.66291.2746h15c.2486 0 .4871-.0988.6629-.2746s.2746-.4143.2746-.6629-.0988-.4871-.2746-.6629-.4143-.2746-.6629-.2746zm8.4375-11.5625v23.75c-.0002.1598-.0412.3168-.1191.4563-.078.1395-.1902.2567-.3262.3406-.1476.0921-.3182.1409-.4922.1406-.1453.0001-.2887-.0336-.4187-.0984l-4.5813-2.2907-4.5813 2.2907c-.13.0649-.2734.0987-.4187.0987s-.2887-.0338-.4187-.0987l-4.5813-2.2907-4.5813 2.2907c-.13.0649-.2734.0987-.4187.0987s-.2887-.0338-.4187-.0987l-4.5813-2.2907-4.58125 2.2907c-.14295.0713-.30178.105-.461388.0977-.159613-.0073-.314721-.0552-.450598-.1393-.135877-.084-.248016-.2014-.325769-.341-.077754-.1396-.1185428-.2967-.118495-.4565v-23.75c0-.58016.230468-1.13656.640704-1.5468.410236-.410232.966636-.6407 1.546796-.6407h27.5c.5802 0 1.1366.230468 1.5468.6407.4102.41024.6407.96664.6407 1.5468zm-1.875 0c0-.08288-.0329-.16237-.0915-.22097-.0586-.05861-.1381-.09153-.221-.09153h-27.5c-.08288 0-.16237.03292-.22097.09153-.05861.0586-.09153.13809-.09153.22097v22.2328l3.64375-1.8219c.13004-.0649.2734-.0987.41875-.0987s.28871.0338.41875.0987l4.58125 2.2907 4.5813-2.2907c.13-.0649.2734-.0987.4187-.0987s.2887.0338.4187.0987l4.5813 2.2907 4.5813-2.2907c.13-.0649.2734-.0987.4187-.0987s.2887.0338.4187.0987l3.6438 1.8219z"/>
							</svg>
						</div>
						<div class="flex flex-col gap-1">
							<span class="font-light text-preset-4">Total bills</span>
							<span class="text-preset-1">{{ 384.98 | currency:'USD' }}</span>
						</div>
					</div>

					<!-- Summary -->
					<div class="grow flex flex-col gap-5 rounded-xl bg-white p-5">
						<h2 class="text-preset-3">Summary</h2>
						@let summary = getPaidBills();
						<div class="flex justify-between">
							<span class="text-gray-500 text-preset-5">Paid Bills</span>
							<div class="font-bold text-preset-5">
								<span>{{ summary.paid }}</span> (<span>{{ summary.paid_amount | currency:'USD' }}</span>)
							</div>
						</div>

						<hr class="text-gray-200">

						<div class="flex justify-between">
							<span class="text-gray-500 text-preset-5">Total Upcoming</span>
							<div class="font-bold text-preset-5">
								<span>{{ summary.upcoming }}</span> (<span>{{ summary.upcoming_amount | currency:'USD' }}</span>)
							</div>
						</div>

						<hr class="text-gray-200">

						<div class="flex justify-between text-jelly-red">
							<span class="text-preset-5">Due Soon</span>
							<div class="font-bold text-preset-5">
								<span>{{ summary.due }}</span> (<span>{{ summary.due_amount | currency:'USD' }}</span>)
							</div>
						</div>
					</div>
				</div>

				<!-- Content -->
				<div class="flex flex-col gap-5 rounded-xl bg-white p-5 pb-7 lg:grow">

					<!-- Search & Sort -->
					<div class="flex items-center justify-between gap-5">
						<!-- Search -->
						<form class="grow" role="search">
							<div class="flex w-full rounded-lg border border-gray-600  max-w-80">
								<input class="block min-w-0 grow p-2 font-light placeholder:text-gray-400 text-preset-4 focus:outline-none"
											 id="search" type="text" name="search" placeholder="Search bills"/>
								<button class="block shrink-0 p-2 pr-4">
									<svg height="14" viewBox="0 0 14 14" width="14">
										<path
											d="m13.3538 13.1462-3.1294-3.1287c.907-1.08894 1.3593-2.48564 1.2628-3.89955-.0966-1.41391-.7345-2.73618-1.78109-3.69173-1.0466-.95555-2.42131-1.470821-3.83815-1.438621-1.41683.032201-2.76671.609391-3.76883 1.611501-1.00211 1.00212-1.579301 2.352-1.611501 3.76883-.0322 1.41684.483071 2.79155 1.438621 3.83817.95556 1.0466 2.27782 1.6845 3.69173 1.781 1.41391.0966 2.81061-.3557 3.89954-1.2627l3.12878 3.1293c.0464.0465.1016.0833.1623.1085.0607.0251.1257.0381.1914.0381s.1308-.013.1915-.0381c.0607-.0252.1158-.062.1623-.1085.0464-.0464.0833-.1016.1084-.1623.0252-.0607.0381-.1257.0381-.1914s-.0129-.1308-.0381-.1915c-.0251-.0607-.062-.1158-.1084-.1623zm-11.85378-6.64621c0-.89002.26392-1.76005.75839-2.50007.49446-.74002 1.19727-1.31679 2.01954-1.65739.82226-.34059 1.72706-.42971 2.59998-.25607.87291.17363 1.67473.60221 2.30407 1.23155s1.0579 1.43116 1.2316 2.30407c.1736.87292.0845 1.77772-.2561 2.59999-.34062.82226-.91739 1.52507-1.65741 2.01953-.74002.4945-1.61005.7584-2.50007.7584-1.19307-.0013-2.33689-.4759-3.18052-1.31949-.84363-.84363-1.31816-1.98745-1.31948-3.18052z"/>
									</svg>
								</button>
							</div>
						</form>

						<!-- Sort -->
						<div class="relative mr-4 hover:cursor-pointer">
							<form>
								<!-- input -->
								<div class="flex gap-2 items-center text-preset-4 font-light text-gray-500">
									<label for="sortBy" class="hidden sm:block">Sort by</label>
									<select id="sortBy" class="hidden">
										@for (option of sortOptions; track option.value) {
											<option [value]="option.value"
															[selected]="sortType() === option.value"
															(click)="sortType.set(option.value)">
												{{ option.label }}
											</option>
										}
									</select>
									<div class="flex items-center justify-end sm:border py-2 px-4 rounded-lg gap-2 w-28"
											 (click)="toggleDropdown()">
										<div class="hidden sm:flex items-center justify-between gap-2 w-full">
											<!-- todo: change to sort label -->
											<div>{{ sortType() }}</div>
											<div>
												<svg height="6" viewBox="0 0 12 6" width="12">
													<path
														d="m11.3538.85375-5.00002 5c-.04644.04649-.10158.08337-.16228.10853s-.12576.03811-.19147.03811-.13077-.01295-.19147-.03811-.11585-.06204-.16228-.10853l-5.000002-5c-.070006-.069927-.11769-.159054-.137015-.256096-.019325-.097043-.009423-.197638.028453-.289049.037877-.091412.102024-.16953.18432-.224465.082297-.0549354.179044-.08421771.277994-.08413985h9.99997c.099-.00007786.1957.02920445.278.08413985.0823.054935.1465.133053.1843.224465.0379.091411.0478.192006.0285.289049-.0193.097042-.067.186169-.137.256096z"/>
												</svg>
											</div>
										</div>
										<svg class="sm:hidden" height="15" viewBox="0 0 16 15" width="16">
											<path
												d="m14.25 0h-12.5c-.33152 0-.64946.131696-.883884.366116-.23442.234421-.366116.552363-.366116.883884v12.5c0 .3315.131696.6495.366116.8839.234424.2344.552364.3661.883884.3661h12.5c.3315 0 .6495-.1317.8839-.3661s.3661-.5524.3661-.8839v-12.5c0-.331521-.1317-.649463-.3661-.883884-.2344-.23442-.5524-.366116-.8839-.366116zm-10.625 3.125h7.5c.1658 0 .3247.06585.4419.18306.1173.11721.1831.27618.1831.44194s-.0658.32473-.1831.44194c-.1172.11721-.2761.18306-.4419.18306h-7.5c-.16576 0-.32473-.06585-.44194-.18306s-.18306-.27618-.18306-.44194.06585-.32473.18306-.44194.27618-.18306.44194-.18306zm3.125 8.75h-3.125c-.16576 0-.32473-.0658-.44194-.1831-.11721-.1172-.18306-.2761-.18306-.4419s.06585-.3247.18306-.4419c.11721-.1173.27618-.1831.44194-.1831h3.125c.16576 0 .32473.0658.44194.1831.11721.1172.18306.2761.18306.4419s-.06585.3247-.18306.4419c-.11721.1173-.27618.1831-.44194.1831zm.625-3.75h-3.75c-.16576 0-.32473-.06585-.44194-.18306s-.18306-.27618-.18306-.44194.06585-.32473.18306-.44194.27618-.18306.44194-.18306h3.75c.16576 0 .32473.06585.44194.18306s.18306.27618.18306.44194-.06585.32473-.18306.44194-.27618.18306-.44194.18306zm6.0672 2.3172-1.875 1.875c-.0581.0581-.127.1042-.2029.1357-.0758.0314-.1572.0476-.2393.0476s-.1635-.0162-.2393-.0476c-.0759-.0315-.1448-.0776-.2029-.1357l-1.87499-1.875c-.11727-.1173-.18316-.2763-.18316-.4422 0-.16585.06589-.32491.18316-.44219.11728-.11727.27634-.18316.44219-.18316s.32491.06589.44219.18316l.80781.80859v-3.4914c0-.16576.0658-.32473.1831-.44194.1172-.11721.2761-.18306.4419-.18306s.3247.06585.4419.18306c.1173.11721.1831.27618.1831.44194v3.4914l.8078-.80859c.1173-.11727.2763-.18316.4422-.18316s.3249.06589.4422.18316c.1173.11728.1831.27634.1831.44219 0 .1659-.0658.3249-.1831.4422z"/>
										</svg>
									</div>
								</div>

								<!-- Dropdown -->
								@if (dropdownOpen()) {
									<ng-container #sortByDropdown>
										<div
											class="absolute right-0 top-12 w-30 animate-fade-in flex flex-col gap-2 bg-white font-light text-preset-4 shadow-[0px_0px_10px_2px_var(--color-gray-200)] rounded-xl text-gray-900 py-4">
											@for (option of sortOptions; track $index) {
												<span class="pl-4 pr-8 cursor-pointer hover:bg-gray-100 relative group"
															(click)="sortType.set(option.value)">
													<span class="group-hover:font-bold"
																													[class.font-bold]="sortType() === option.value">{{ option.label }}</span>
												</span>
												@if ($index !== sortOptions.length - 1) {
													<hr class="self-center border-gray-200 w-8/9">
												}
											}
										</div>
									</ng-container>
								}
							</form>
						</div>
					</div>

					<!-- All bills -->
					<div class="flex flex-col gap-5">

						<!-- Header -->
						<div class="hidden sm:flex items-end justify-between">

							<div class="flex flex-col sm:flex-row gap-1 grow">

								<div class="flex items-center gap-5 flex-1">
									<span class="text-preset-4 font-light text-gray-500">
										Bill Title
									</span>
								</div>

								<div class="flex gap-2 text-preset-5 items-center flex-1">
									<span class="text-preset-4 font-light text-gray-500">Due Date</span>
								</div>

							</div>

							<div class="text-preset-4 font-light text-gray-500 shrink-0 w-20 text-end">Amount</div>
						</div>

						<hr class="hidden sm:block text-gray-200">

						<!-- Bill Ex. 1-->
						<div class="flex items-end justify-between">

							<div class="flex flex-col gap-1 grow sm:flex-row">

								<div class="flex items-center gap-5 flex-1">
									<img class="rounded-full" width="32" height="32"
											 src="assets/images/avatars/companies/elevate-education.jpg" alt="Elevate Education img">
									<span class="text-preset-4">
										Elevate Education
									</span>
								</div>

								<div class="flex gap-2 text-preset-5 items-center flex-1">
									<span class="text-jelly-green break-keep">1 Aug 2024</span>
									<img width="13" height="13"
											 src="assets/images/icon-bill-paid.svg"/>
								</div>

							</div>

							<div class="text-preset-4 text-jelly-green shrink-0 w-20 text-end">{{ 250 | currency:'USD' }}</div>
						</div>

						<hr class="text-gray-200">

						<!-- Bill Ex. 2-->
						<div class="flex items-end justify-between">
							<div class="flex flex-col gap-1 grow sm:flex-row">
								<div class="flex items-center gap-5 flex-1">
									<img class="rounded-full" width="32" height="32"
											 src="assets/images/avatars/companies/serenity-spa-and-wellness.jpg" alt="Bravo Zen Spa img">
									<span class="text-preset-4">Serenity Spa & Wellness</span>
								</div>
								<div class="flex gap-2 text-preset-5 items-center flex-1">
									<span class="text-jelly-red break-keep">5 Aug 2024</span>
									<img width="13" height="13"
											 src="assets/images/icon-bill-due.svg"/>
								</div>
							</div>

							<div class="text-preset-4 text-jelly-red shrink-0 w-20 text-end">{{ 40 | currency:'USD' }}</div>
						</div>

						<hr class="text-gray-200">

						<!-- Bill Ex. 3-->
						<div class="flex items-end justify-between">
							<div class="flex flex-col gap-1 grow sm:flex-row">
								<div class="flex items-center gap-5 flex-1">
									<img class="rounded-full" width="32" height="32"
											 src="assets/images/avatars/companies/elevate-education.jpg" alt="Elevate Education img">
									<span class="text-preset-4">Elevate Education</span>
								</div>
								<div class="flex gap-2 text-preset-5 items-center flex-1">
									<span class="text-gray-900">10 Aug 2024</span>
								</div>
							</div>

							<div class="text-gray-900 text-preset-4 shrink-0 w-20 text-end">{{ 250 | currency:'USD' }}</div>
						</div>
					</div>
				</div>

			</div>


			<!-- <pre class="overflow-x-auto whitespace-pre-wrap break-words"> -->
			<!-- {{ printJson() | json }} -->
			<!-- </pre> -->
    `,
	styles: ``
})
export class RecurringBillsView {
	transactionService = inject(DataService);
	private datePipe = inject(DatePipe);

	private renderer = inject(Renderer2);
	private fb = inject(FormBuilder); //todo: use this; future refactoring
	private dropdown = viewChild<ViewContainerRef>('sortByDropdown');
	dropdownOpen = signal<boolean>(false);

	sortType = signal<SortType>('latest');
	sortOptions: { value: SortType, label: string }[] = [
		{ value: 'latest', label: 'Latest' },
		{ value: 'oldest', label: 'Oldest' },
		{ value: 'atoz', label: 'A to Z' },
		{ value: 'ztoa', label: 'Z to A' },
		{ value: 'highest', label: 'Highest' },
		{ value: 'lowest', label: 'Lowest' }
	];

	private toggleWasClicked = false;

	@HostListener('document:click')
	clickout() {
		if (!this.toggleWasClicked) {
			this.dropdownOpen.set(false);
		}
		this.toggleWasClicked = false;
	}

	toggleDropdown() {
		this.toggleWasClicked = true;
		this.dropdownOpen.set(!this.dropdownOpen());
	}

	printJson() {
		return this.transactionService.getRecurringTransactions();
	}

	getPaidBills() {
		let summary = { paid: 0, upcoming: 0, due: 0, paid_amount: 0, upcoming_amount: 0, due_amount: 0 };

		let result = this.getSortedTransactions();

		if (Array.isArray(result)) {
			let now = new Date();
			let thisMonth = now.getMonth();
			let thisYear = now.getFullYear();

			result.forEach((bill) => {
				let billDate = new Date(bill.date);

				if (billDate < now) {
					summary.paid += 1;
					summary.paid_amount += bill.amount;
				} else {
					summary.upcoming += 1;
					summary.upcoming_amount += bill.amount;
				}

				if (
					billDate.getMonth() === thisMonth &&
					billDate.getFullYear() === thisYear &&
					billDate < now
				) {
					summary.due += 1;
					summary.due_amount += bill.amount;
				}
			});
		}
		return { paid: 2, upcoming: 6, due: 2, paid_amount: 320, upcoming_amount: 1230, due_amount: 40 };
	}

	getTotalBills() {
		let result = this.transactionService.getRecurringTransactions();
		result = 'data' in result ? result.data : result;
		if (Array.isArray(result)) {
			return result.reduce((acc, curr) => {
				console.log(curr.amount);
				return acc + curr.amount;
			}, 0);
		}
		return 0;
	}

	convertDate(date: string) {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	}

	getSortedTransactions() {
		let result = this.transactionService.getRecurringTransactions();
		result = 'data' in result ? result.data : result;
		if (Array.isArray(result)) {
			return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		}
		return [];
	}

}
