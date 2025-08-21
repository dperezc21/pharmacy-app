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
export class ConfirmMessageComponent implements OnInit {

  dialogRef = inject(MatDialogRef<ConfirmMessageComponent, ConfirmMessageData>);
  data = inject<ConfirmMessageData>(MAT_DIALOG_DATA);
  icon = '';
  iconColor = '';
  readonly mapIcons: Record<string, { icon: string; color: string }> = {
    info: { icon: 'info', color: '#2196f3' },
    warning: { icon: 'warning', color: '#ff9800' },
    error: { icon: 'error', color: '#f44336' },
    success: { icon: 'check_circle', color: '#4caf50' },
  };

  constructor() {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
    const settingIconSelected = this.mapIcons[this.data.type] || this.mapIcons["info"];
    this.icon = settingIconSelected.icon;
    this.iconColor = settingIconSelected.color;
  }

}
