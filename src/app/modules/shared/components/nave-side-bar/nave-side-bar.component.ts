import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationConnectionService } from '../../services/notification-connection.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-nave-side-bar',
  templateUrl: './nave-side-bar.component.html',
  styleUrls: ['./nave-side-bar.component.css'],
})
export class NaveSideBarComponent implements OnInit {
  panelOpenState = false;
  // @Input() cartItemCount:number=0

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  userModuleRouter = '/user';
  asideNavItems = [
    {
      router: `/home`,
      name: 'الرئيسية',
      icon: '../../../../../assets/images/home-button.png',
    },
    {
      router: `${this.userModuleRouter}/orders`,
      name: 'الطلبات',
      icon: '../../../../../assets/images/order.png',
    },
    {
      router: `${this.userModuleRouter}/address`,
      name: 'العنوان',
      icon: '../../../../../assets/images/address.png',
    },
    {
      router: `${this.userModuleRouter}/shipping`,
      name: 'طلب نقل',
      icon: '../../../../../assets/images/logo.png',
    },

    // { router: `${this.userModuleRouter}/points`, name: 'النقاط' },
    // { router: `${this.userModuleRouter}/previous-orders`, name: 'الطلبات السابقة' },
    // { router: `${this.userModuleRouter}/shipping`, name: 'شحن' },
    // {
    //   router: `${this.userModuleRouter}/table-reservations`,
    //   name: 'حجز الطاولات',
    // },
    // {
    //   router: `${this.userModuleRouter}/provide-delivery-man`,
    //   name: 'توفير الطيار',
    // },
  ];

  @Input() cartItemCount: number = 0;
  isLogin: boolean = false;
  userName: string = '';
  notificationCount: string = '';
  ordersNotifications: any[];
  userSignalId: string | null;
  userType: string | null;
  notificationMessage: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _notificationConnectionService: NotificationConnectionService
  ) {
    this.ordersNotifications =
      JSON.parse(localStorage.getItem('notifications')!) || [];
    //     //
    let cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartItemCount = JSON.parse(cartItems).length;
    }

    this.userSignalId = localStorage.getItem('userSignalId');
    this.userType = localStorage.getItem('userType');

    // build notification connection
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(
        `${environment.apiUrl}notificationsHub?UserSignlId=${this.userSignalId}&userType=${this.userType}`
      )
      .build();

    // start connection for notification
    connection
      .start()
      .then(function () {
        // ;
        localStorage.setItem('connectionId', connection.connectionId!);
        console.log('connection start ===============>!');
      })
      .catch(function (err) {
        return console.error(err);
      });

    //  receive notifications
    connection.on('ReceiveNotifications', (res) => {
      //
      this.notificationMessage = res;
      console.log(res);

      new Audio('../../assets/audio/notification.mp3').play();
      this.ordersNotifications.push({
        date: Date.now(),
        notificationMessage: this.notificationMessage,
      });
      localStorage.setItem(
        'notifications',
        JSON.stringify(this.ordersNotifications)
      );
      let notificationCount =
        localStorage.getItem('notificationCount') || ('0' as any);
      notificationCount = parseInt(notificationCount) + 1;
      localStorage.setItem('notificationCount', notificationCount.toString());
      this.notificationCount = localStorage.getItem('notificationCount') || '';
      this._notificationConnectionService.onNotifyNewOrder();
    });
  }

  logout() {
    // ;
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userData');

    this.isLoginFun();
    this.goToLoginPage();
  }
  isLoginFun() {
    if (localStorage.getItem('token') && localStorage.getItem('userName')) {
      this.isLogin = true;
      let userData = JSON.parse(localStorage.getItem('userData') || '');
      this.userName = userData.fullName;
    } else {
      this.isLogin = false;
    }
  }

  goToLoginPage() {
    this._router.navigate(['/user/auth']);
  }

  ngOnInit() {
    this.isLoginFun();

    // -----------------------start notification handling----------------
    //  this._notificationConnectionService.startNotificationConnection()
    //  this._notificationConnectionService.receiveOrderNotification()
  }

  // reset notification count when open notification menu
  resetNotificationCount() {
    this.notificationCount = '';
    localStorage.removeItem('notificationCount');
  }

  getNotificationCount() {
    this.notificationCount = localStorage.getItem('notificationCount')!;
  }
}
