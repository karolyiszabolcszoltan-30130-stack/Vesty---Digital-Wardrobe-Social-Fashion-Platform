
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class HeaderComponent {

    // mobilmenü 
    // false / true
    protected readonly isMenuOpen = signal(false);

    protected toggleMenu(): void {
        this.isMenuOpen.update((currentState) => !currentState);
    }

    protected closeMenu(): void {
        this.isMenuOpen.set(false);
    }
}
