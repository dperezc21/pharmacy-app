import {IconType, IconTypeRecord, MAP_ICONS} from '../constants/map-icons';

export class SettingIcons {
  private readonly mapIcons: IconTypeRecord = MAP_ICONS;
  private _icon = '';
  private _iconColor!: string;

  setIconSelected(type: string) {
    const settingIconSelected: IconType = this.mapIcons[type] || this.mapIcons["info"];
    this._icon = settingIconSelected.icon;
    this._iconColor = settingIconSelected.color;
  }

  get icon(): string {
    return this._icon;
  }

  get iconColor(): string {
    return this._iconColor;
  }
}
