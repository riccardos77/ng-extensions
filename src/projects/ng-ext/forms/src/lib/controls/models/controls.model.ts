
export type InitFormOn = 'initForm' | 'ngOnInit';

export interface ControlStateOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
}

export interface ControlValueOptions extends ControlStateOptions {
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}
