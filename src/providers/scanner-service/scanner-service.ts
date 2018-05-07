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
    Scandit.License.setAppKey("AVv7fgfcHHQQAdCRcCBc3gwoDDvyJ7LjYGX81M531XGndBQ6JFrVqOxAlGrTbtUaFFkv6f52sJY5YHcC4Eolp0xRxSo+XNmPm3n6mkBIwfpoN7W7p0nAYDI86+asnYPeksMnP+0mD5WBipzchSN8ZkYIy5D0RWaXOQ7e73KQA69HnhlR+DXsrOH6aW0MpSsPAS+XDW7rwAGeGy5rEywSZukKRXshdCyjbWqQQMVJ4LjT5xBecpJzyrooxFdRBi5Exg+QVs2jgF3z9bhMuarSASYu+i4lTDtTZQ93m7JtVbqgKVurHRjdrB0g/UEykxP3bQDLMEOn8p6QNikfa3svrdq+IP0o0Rq+Vj336KLw+ZAZFvgRrXDF1aBiqCQWRiAymN7cTSBt3nT4cZ9WRA/6F/ssDGAkxDHGslBZHu/OQBkHqXVyUhEtmoHI7TxVatFHZofMT2SP8su48blVPvpiUjtJEoDeZOTYEBID3dVtY0+61xb50DMbacPmdNIPurfOF/EFPmStr4ZXThVJorN7RAkSEePjPV/h12pD0iN1sX0gyMYqkNjzPlHPStlLbDpQK2/I96o5tWvotBSCC2oe136xE5v4GdwAuG3mwC3J45BgQdX4+n1D8aJIfesl9LtG6w3pv98scOnIroi2oIely4X8mre6Fz4WxsBRQIqMjLOwtP+tU6xhOoI/I+iaxawCIErxXYpuTHQLmgAiYSPpd/KZRZT5G7kiCSd973zLe5vjpoAXYabs4HvEUmE8pHAI3Yr8MJmH0MuCHh7KNj84A1KS8iuKj4ilJ5vcjxs=");

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
