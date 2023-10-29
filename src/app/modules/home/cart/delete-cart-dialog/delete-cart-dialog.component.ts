import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-cart-dialog',
  templateUrl: './delete-cart-dialog.component.html',
  styleUrls: ['./delete-cart-dialog.component.css']
})
export class DeleteCartDialogComponent implements OnInit {

  constructor(    private dialogRef: MatDialogRef<DeleteCartDialogComponent>,
    ) { }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close({
      event :'cancel'
    })
  }

  delete(){
    this.dialogRef.close({
      event:'delete',
    })
  }

}
