import AuthorWithBooksT from "@/types/AuthorWithBooksT";
import React, { FC, useState } from "react";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";
import AuthorListItemInfo from "./AuthorListItemInfo";
import AuthorListItemDescription from "./AuthorListItemDescription";
import AuthorListItemBooks from "./AuthorListItemBooks";

interface Props {
  author: AuthorWithBooksT;
}

const AuthorListItem: FC<Props> = ({ author }) => {
  const [isMoreDescription, setIsMoreDescription] = useState(false);
  const [isShowBooks, setIsShowBooks] = useState(false);

  const authorInfo = {
    firstName: author.firstName,
    secondName: author.secondName,
    authorImgUrl: author.authorImgUrl,
  };

  return (
    <div className="p-2 bg-stone-100 rounded-sm shadow-sm">
      {/* image + name */}
      <AuthorListItemInfo authorInfo={authorInfo} />
      {/* description */}
      <div>
        <AuthorListItemDescription
          isMoreDescription={isMoreDescription}
          description={author.description}
        />
        <SecondaryButton
          onClick={() => {
            isMoreDescription
              ? setIsMoreDescription(false)
              : setIsMoreDescription(true);
          }}
        >
          {isMoreDescription ? "Read less" : "Read more"}
        </SecondaryButton>
      </div>
      {/* author books*/}
      <PrimaryButton
        onClick={() => {
          isShowBooks ? setIsShowBooks(false) : setIsShowBooks(true);
        }}
        className="my-2 flex gap-1 items-center justify-center"
      >
        <p className="font-medium">
          {isShowBooks ? "Hide books" : "Show books"}
        </p>
      </PrimaryButton>
      {/* books  */}
      {isShowBooks && <AuthorListItemBooks books={author.books} />}
    </div>
  );
};

export default AuthorListItem;
