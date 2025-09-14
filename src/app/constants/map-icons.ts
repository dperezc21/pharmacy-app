import {ConfirmMessageData} from '../models/confirm-message-data';

export const MAP_ICONS: IconTypeRecord = {
  info: { icon: 'info', color: '#2196f3' },
  warning: { icon: 'warning', color: '#ff9800' },
  error: { icon: 'error', color: '#f44336' },
  success: { icon: 'check_circle', color: '#4caf50' },
};

export interface IconType {
  icon: string;
  color: string;
}

export type IconTypeRecord = Record<string, IconType>;

export type DialogMessageType = Pick<ConfirmMessageData, 'type' | 'description'>;
