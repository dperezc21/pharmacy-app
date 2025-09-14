import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {DialogMessageType} from '../../constants/map-icons';
import {MatIcon} from '@angular/material/icon';
import {take, tap, timer} from 'rxjs';
import {SettingIcons} from '../../services/setting-icons';

@Component({
  selector: 'app-dialog-message',
  imports: [
    MatDialogContent,
    MatIcon
  ],
  templateUrl: './dialog-message.component.html',
  standalone: true,
  styleUrl: './dialog-message.component.css'
})
export class DialogMessageComponent extends SettingIcons implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<DialogMessageComponent>);
  data = inject<DialogMessageType>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    timer(2000).pipe(take(1), tap(() => {
      this.dialogRef.close();
    })).subscribe();
    this.setIconSelected(this.data.type);
  }
}
