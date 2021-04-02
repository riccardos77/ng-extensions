
export type InitFormOn = 'initForm' | 'ngOnInit';

export interface ControlOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
}

export interface ControlValueOptions extends ControlOptions {
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}
