import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ConfirmMessageData} from '../../models/confirm-message-data';
import {SettingIcons} from '../../services/setting-icons';

@Component({
  selector: 'app-confirm-message',
  imports: [
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: './confirm-message.component.html',
  standalone: true,
  styleUrl: './confirm-message.component.css'
})
export class ConfirmMessageComponent extends SettingIcons implements OnInit {

  dialogRef = inject(MatDialogRef<ConfirmMessageComponent, ConfirmMessageData>);
  data: ConfirmMessageData = inject<ConfirmMessageData>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
    this.setIconSelected(this.data.type);
  }

}
