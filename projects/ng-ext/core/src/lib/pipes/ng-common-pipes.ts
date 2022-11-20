import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  LowerCasePipe,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { PipeTransform, Type } from '@angular/core';

export const ngCommonPipes: Record<string, Type<PipeTransform>> = {
  uppercase: UpperCasePipe,
  lowercase: LowerCasePipe,
  json: JsonPipe,
  slice: SlicePipe,
  decimal: DecimalPipe,
  percent: PercentPipe,
  titlecase: TitleCasePipe,
  currency: CurrencyPipe,
  date: DatePipe,
  i18nplural: I18nPluralPipe,
  i18nselect: I18nSelectPipe,
  keyvalue: KeyValuePipe,
};
