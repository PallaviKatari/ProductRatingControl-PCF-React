
import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { RatingView } from "./RatingView";

export class ProductRatingControl
  implements ComponentFramework.ReactControl<IInputs, IOutputs> {

  private notifyOutputChanged!: () => void;

  private currentValue = 0;
  private isDirty = false;
  private disabled = false;

  // Restrict rating to an integer between 0 and 5.
  private clampRating(value: number | null | undefined): number {
    if (value == null || !Number.isFinite(value)) {
      return 0;
    }

    return Math.max(0, Math.min(5, Math.round(value)));
  }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;

    this.currentValue = this.clampRating(
      context.parameters.ratingValue.raw
    );

    this.disabled = context.mode.isControlDisabled;

    console.log("[PCF init] Control initialized");
    console.log("[PCF init] Initial rating:", this.currentValue);
    console.log("[PCF init] Control disabled:", this.disabled);
    console.log("[PCF init] Rating parameter:", context.parameters.ratingValue);
  }

  public updateView(
    context: ComponentFramework.Context<IInputs>,
  ): React.ReactElement {
    const platformValue = this.clampRating(
      context.parameters.ratingValue.raw
    );

    if (!this.isDirty || platformValue === this.currentValue) {
      this.currentValue = platformValue;
      this.isDirty = false;
    }

    this.disabled = context.mode.isControlDisabled;

    console.log("[PCF updateView] Rating:", platformValue);
    console.log("[PCF updateView] Disabled:", this.disabled);

    return React.createElement(RatingView, {
      value: this.currentValue,
      disabled: this.disabled,
      onChange: (newRating: number) => {
        if (this.disabled) {
          return;
        }

        const safeRating = this.clampRating(newRating);

        if (safeRating === this.currentValue) {
          return;
        }

        console.log("[React] Star clicked:", safeRating);

        this.currentValue = safeRating;
        this.isDirty = true;

        console.log("[PCF] Calling notifyOutputChanged()");
        this.notifyOutputChanged();
      },
    });
  }

  public getOutputs(): IOutputs {
    const safeRating = this.clampRating(this.currentValue);

    console.log("[PCF getOutputs] Sending rating:", safeRating);

    return {
      ratingValue: safeRating,
    };
  }

  public destroy(): void {
    console.log("[PCF destroy] Control destroyed");
  }
}
