import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
	selector: 'app-logout',
	imports: [],
	template: `
		<p>
			Signing out...
		</p>
	`,
	styles: ``
})
export class Logout implements OnInit {
	private authService = inject(AuthService);
	private router = inject(Router);
	private toast = inject(HotToastService);

	ngOnInit(): void {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigate(['/auth/login']).then(() => {
					this.toast.success('Logout successful', { id: 'logout-toast', duration: 1000 });
				});
			}
		});
	}
}
