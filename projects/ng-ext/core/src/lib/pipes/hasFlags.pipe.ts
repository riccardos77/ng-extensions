import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hasFlags', pure: true })
export class HasFlagsPipe implements PipeTransform {
  public transform(flagsLeft: number, ...flagsRight: number[]): boolean | undefined {
    const flagsRightCombined = flagsRight.reduce((acc, cur) => acc | cur, 0);

    if (flagsRight.length === 0 || flagsRightCombined === 0) {
      return undefined;
    }

    return (flagsLeft & flagsRightCombined) === flagsRightCombined;
  }
}
