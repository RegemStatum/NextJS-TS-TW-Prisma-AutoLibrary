import React, { FC } from "react";
import {
  BadgeError,
  BadgeInfo,
  BadgePending,
  BadgeSuccess,
} from "../ui/badges";

interface Props {
  featured: boolean;
  available: boolean;
  quantity: number;
}

const SingleBookBadges: FC<Props> = ({ featured, available, quantity }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {featured && <BadgeInfo>featured</BadgeInfo>}
      {available && quantity > 0 ? (
        <BadgeSuccess>available</BadgeSuccess>
      ) : (
        <BadgeError>not available</BadgeError>
      )}
      {available && quantity > 0 && quantity <= 5 && (
        <BadgePending>{quantity} left</BadgePending>
      )}
      {available && quantity === 0 && <BadgeError>{quantity} left</BadgeError>}
    </div>
  );
};

export default SingleBookBadges;
