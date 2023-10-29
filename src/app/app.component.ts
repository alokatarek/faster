import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NotificationConnectionService } from './modules/shared/services/notification-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  
  title = 'faster-time';
  panelOpenState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

    userModuleRouter = 'user'
  asideNavItems = [
    {
      router: `${this.userModuleRouter}/orders`,
      name: 'الطلبات',
    },
    { router: `${this.userModuleRouter}/points`, name: 'النقاط' },
    { router: `${this.userModuleRouter}/previous-orders`, name: 'الطلبات السابقة' },
    { router: `${this.userModuleRouter}/shipping`, name: 'شحن' },
    { router: `${this.userModuleRouter}/table-reservations`, name: 'حجز الطاولات' },
    { router: `${this.userModuleRouter}/provide-delivery-man`, name: 'توفير الطيار' },
  ];

  
// x = [1,2,3,4,5,6]
//   responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];

  constructor(private breakpointObserver: BreakpointObserver,
    
    private _notificationConnectionService:NotificationConnectionService
    ) {
  //   this.responsiveOptions = [
  //     {
  //         breakpoint: '1024px',
  //         numVisible: 3,
  //         numScroll: 3
  //     },
  //     {
  //         breakpoint: '768px',
  //         numVisible: 2,
  //         numScroll: 2
  //     },
  //     {
  //         breakpoint: '560px',
  //         numVisible: 1,
  //         numScroll: 1
  //     }
  // ];
  
  }
  ngOnInit(): void {
    // this._notificationConnectionService.startNotificationConnection()
    // this._notificationConnectionService.receiveOrderNotification()
      // this._notificationConnectionService.startNotificationConnection()
  }
}


