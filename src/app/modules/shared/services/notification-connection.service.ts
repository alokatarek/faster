import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationConnectionService {
  public notifyNewOrder: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  connection: signalR.HubConnection | undefined;
  ordersNotifications: any;
  notificationCount: string = '';

  constructor() {}
  startNotificationConnection() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + 'notificationsHub')
      .build();
    this.connection
      .start()
      .then(() => {
        console.log('connection start ==============>');
        let connectionId = this.connection?.connectionId;
        localStorage.setItem('connectionId', connectionId!);
      })
      .catch(function () {
        return 'error';

        // console.log('err');
      });
  }
  sendOrderNotification() {
    const message = 'new order!';
    this.connection!.invoke('SendNotifications', message).catch(function (
      err: any
    ) {
      console.error(err);
    });
  }

  receiveOrderNotification() {
    this.connection!.on('ReceiveNotifications', () => {
      new Audio('../../assets/audio/notification.mp3').play();
      this.ordersNotifications.push(Date.now());
      localStorage.setItem(
        'notifications',
        JSON.stringify(this.ordersNotifications)
      );
      let notificationCount =
        localStorage.getItem('notificationCount') || ('0' as any);
      notificationCount = parseInt(notificationCount) + 1;
      localStorage.setItem('notificationCount', notificationCount.toString());

      this.notificationCount = localStorage.getItem('notificationCount') || '';
      this.onNotifyNewOrder();
      //   this._ordersService.getAllOrders(1, 10, '').subscribe({
      //     next: (res) => {
      //       console.warn(res);
      //     },
      //   });
      // });
    });
  }

  onNotifyNewOrder() {
    this.notifyNewOrder.next(true);
  }

  getNotificationCount(): string {
    return this.notificationCount;
  }
}
