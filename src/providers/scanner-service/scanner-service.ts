import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ScannerServiceProvider {
  public contentHeight;
  public delegate: ScannerDelegate;

  private picker;
  private _contentTop: number = 0;

  private portraitConstraints: Constraints;
  private landscapeConstraints: Constraints;

  constructor(
    private zone: NgZone,
  ) {
    Scandit.License.setAppKey("AYN7eTzcJ1waAEoW3BnQAx8G3/wkFdQUIzCfiP9MlG+UflemLkDvL0dcXwf6fq6w8HYzpbMUcndEFjTA2EUXAz8a9JVAdZc+MEv3hEdHoBM0Xtlb7G6cDYAREPamabPtVEJW3TTb+ahwVoUyogYdooObK5QErcFhD8k3dNjrM1LaErejpQ92AOeha91Em9GdSgLjir7fa5fUY4c9B+OEFWeN8LPHHwSFFToCCumsuyVFPsND+DmTeQfFvsMBwhQgHz4SaF9s62IxRO8RoUCbIZ6kRSbtaIDQ6yXqf0R3CtI7BzyKVWKX1BPK/zahi24MuznxLQkesC9NZ8Fn2t1a7coMCKxZsi6nb8Jf/0T4CeMH9GQJJ0EXV8L0W0wy2GpKJ7ef5eM/P4X3IA879VPWAAhsLKVgyFCxZjVSCc91REOaH6MQmS5TU6dOY8GY9O/lwaK3kYR/I4RvDNhdaT7SedyMryXbwGpFEdgGVpzVWvZvoRn/ACrHcaxVp/DdHXn8UXWnKzEyQS8dWlZHhhTt2EOCSK9LXJVRaOKnxyXYgIrHFg02wgeUikQW4+1wyxZtSID1vwedgWVLtqbyPBdK0uoZAFAgYpztlBkSDU3oIAW4+56NsnOPHefDZV1jDkqPUlrAN2/QXnaBLXdeXgN0JIrITtG66bUh2+v/qLcXoORkxyDQjvA2mAS4nKTUeGUphXNkuZxi2qFeVE8xaFg743Fjh4DBGo/RhatcmM7G3pESXwlsLhO4Kk4AVpPku0P0HarwBXokNoyugfwbug9BpDmq5yTbzvVGl518");

    var settings = new Scandit.ScanSettings();
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.CODE128, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.DATA_MATRIX, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.GS1_DATABAR, true);
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.GS1_DATABAR_EXPANDED, true);
    // Instantiate the barcode picker by using the settings defined above.
    this.picker = new Scandit.BarcodePicker(settings);
  }

  public get contentTop(): number {
    return this._contentTop;
  }

  public set contentTop(newValue: number) {
    this._contentTop = newValue;
    this.setScannerConstraints();
  }

  public start(): void {
    // We only want to pause the scanner if not in continuous mode, not stop it, so we're setting it to true here
    this.picker.continuousMode = true;

    this.picker.show({
      didScan: session => {
        if (this.delegate) {
          this.zone.run(() => {
            this.delegate.didScan(session);
          })
        }
      },
    });
    this.picker.startScanning();
  }

  public resume(): void {
    this.picker.resumeScanning();
  }

  public cancel(): void {
    this.picker.cancel();
  }

  // ================================================ //
  // ===== Constraint setting & related helpers ===== //
  // ================================================ //

  private setScannerConstraints(): void {
    const top = this.contentTop;
    if (top === undefined) {
      setTimeout(this.setScannerConstraints.bind(this), 500);
    }

    const topConstraint = top || 0;
    const rightConstraint = 0;
    const bottomConstraint = screen.height / 4;
    const leftConstraint = 0;

    this.contentHeight = screen.height - bottomConstraint - topConstraint;

    console.log(this.contentHeight, topConstraint, rightConstraint, bottomConstraint, leftConstraint);
    this.setConstraints(topConstraint, rightConstraint, bottomConstraint, leftConstraint);
  }

  private setConstraints(top: Constraint, right: Constraint, bottom: Constraint, left: Constraint, animationDuration: number = 0): void {
    const newConstraints = this.getConstraintsWith(top, right, bottom, left);
    this.setPortraitConstraints(newConstraints, animationDuration);
    this.setLandscapeConstraints(newConstraints, animationDuration);
  }

  private setPortraitConstraints(newConstraints: Constraints, animationDuration: number = 0): void {
    if (this.needsConstraintUpdates(this.portraitConstraints, newConstraints)) {
      this.portraitConstraints = newConstraints;
      this.applyConstraints(animationDuration);
    }
  }

  private setLandscapeConstraints(newConstraints: Constraints, animationDuration: number = 0): void {
    if (this.needsConstraintUpdates(this.landscapeConstraints, newConstraints)) {
      this.landscapeConstraints = newConstraints;
      this.applyConstraints(animationDuration);
    }
  }

  private getConstraintsWith(top: Constraint, right: Constraint, bottom: Constraint, left: Constraint, animationDuration: number = 0): Constraints {
    const newConstraints = new Scandit.Constraints();
    newConstraints.topMargin = top;
    newConstraints.rightMargin = right;
    newConstraints.bottomMargin = bottom;
    newConstraints.leftMargin = left;
    return newConstraints;
  }

  private needsConstraintUpdates(constraint: Constraints, newConstraints: Constraints): boolean {
    return !constraint ||
    newConstraints.topMargin !== constraint.topMargin ||
    newConstraints.rightMargin !== constraint.rightMargin ||
    newConstraints.bottomMargin !== constraint.bottomMargin ||
    newConstraints.leftMargin !== constraint.leftMargin
  }

  private applyConstraints(animationDuration: number = 0): void {
    this.picker.setConstraints(this.portraitConstraints, this.landscapeConstraints, animationDuration);
  }

}
