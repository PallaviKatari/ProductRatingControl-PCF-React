
import * as React from "react";

export interface RatingViewProps {
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

export const RatingView: React.FC<RatingViewProps> = ({
  value,
  disabled,
  onChange
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        minHeight: "40px"
      }}
    >
      <div
        role="radiogroup"
        aria-label="Product rating"
        style={{ display: "flex", gap: "4px" }}
      >
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} out of 5 stars`}
            disabled={disabled}
            onClick={() => onChange(star)}
            style={{
              border: "none",
              background: "transparent",
              cursor: disabled ? "default" : "pointer",
              fontSize: "28px",
              padding: "0 2px",
              color: star <= value ? "#E6A700" : "#A0A0A0"
            }}
          >
            {star <= value ? "★" : "☆"}
          </button>
        ))}
      </div>

      <span style={{ fontSize: "14px" }}>
        {value > 0 ? `${value} / 5` : "Not rated"}
      </span>
    </div>
  );
};
