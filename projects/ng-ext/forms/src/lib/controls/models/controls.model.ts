export interface FormControlBaseComponentConfig {
  initFormOn: InitFormOn;
  notifyChangesMode: NotifyChangesMode;
}

export type InitFormOn = 'ctor' | 'ngOnInit';
export type NotifyChangesMode = 'automatic' | 'manual';

export interface ControlStateOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
}

export interface ControlValueOptions extends ControlStateOptions {
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}
