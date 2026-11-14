import React from "react";
import { Rating } from "@mui/material";

const customRating = ({
  ratingsAverage = 0,
  ratingsQuantity = 0,
  readOnly = true,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Rating
        value={Number(ratingsAverage) || 0}
        size="small"
        precision={0.5}
        readOnly={readOnly}
        className="[&_.MuiRating-iconEmpty]:!text-secondary"
        getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
      />

      <span className="shrink-0 text-xs font-semibold text-text-primary">
        {(Number(ratingsAverage) || 0).toFixed(1)}
      </span>

      <span className="shrink-0 text-xs text-text-secondary">
        ({ratingsQuantity || 0})
      </span>
    </div>
  );
};

export default React.memo(customRating);
