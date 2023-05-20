import React, { FC } from "react";
import { PrimaryButton } from "../ui/buttons";

interface Props {
  isShowBooks: boolean;
  booksLength: number;
  toggleShowBooks: () => void;
}

const AuthorListItemShowBooksButton: FC<Props> = ({
  isShowBooks,
  booksLength,
  toggleShowBooks,
}) => {
  return (
    <PrimaryButton
      onClick={() => {
        toggleShowBooks();
      }}
      disabled={booksLength === 0}
      className="my-1 flex gap-1 items-center justify-center lg:hidden"
    >
      <p className="font-medium">
        {booksLength === 0
          ? "No featured books"
          : isShowBooks
          ? "Hide books"
          : "Featured books"}
      </p>
    </PrimaryButton>
  );
};

export default AuthorListItemShowBooksButton;
