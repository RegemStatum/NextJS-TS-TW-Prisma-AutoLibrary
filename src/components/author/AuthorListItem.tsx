import AuthorWithBooksT from "@/types/AuthorWithBooksT";
import React, { FC, useEffect, useState } from "react";
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

  useEffect(() => {
    if (window.screen.width >= 1024) {
      setIsMoreDescription(true);
      setIsShowBooks(true);
    }
  }, []);

  return (
    <div
      className="p-2 bg-neutral-100 rounded-md shadow-lg lg:p-8 lg:flex lg:gap-1"
      id={author.id}
    >
      <div className="lg:w-[1/2 - 5px]">
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
            className="lg:hidden"
          >
            {isMoreDescription ? "Read less" : "Read more"}
          </SecondaryButton>
        </div>
      </div>
      {/* author books*/}
      <PrimaryButton
        onClick={() => {
          isShowBooks ? setIsShowBooks(false) : setIsShowBooks(true);
        }}
        className="my-2 flex gap-1 items-center justify-center lg:hidden"
      >
        <p className="font-medium">
          {isShowBooks ? "Hide books" : "Featured books"}
        </p>
      </PrimaryButton>
      <div className="lg:w-1/2 lg:shrink-0 lg:mt-[212px] text-2xl font-bold">
        <h3 className="hidden lg:block lg:mb-4 lg:pl-4">Featured books</h3>
        {isShowBooks && <AuthorListItemBooks books={author.books} />}
      </div>
    </div>
  );
};

export default AuthorListItem;
