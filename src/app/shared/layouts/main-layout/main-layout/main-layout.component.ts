import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from '../../../components/footer/footer.component';
@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterModule,
            HeaderComponent,
            SidebarComponent,
            MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatSidenavModule,
            MatListModule,
            FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }
}
