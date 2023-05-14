import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";
import React, { FC, useEffect, useState } from "react";
import SecondaryButton from "../ui/buttons/SecondaryButton";
import AuthorListItemInfo from "./AuthorListItemInfo";
import AuthorListItemDescription from "./AuthorListItemDescription";
import AuthorListItemBooks from "./AuthorListItemBooksList";
import AuthorListItemShowBooksButton from "./AuthorListItemShowBooksButton";

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

  const toggleShowBooks = () =>
    isShowBooks ? setIsShowBooks(false) : setIsShowBooks(true);

  return (
    <div
      className="px-4 py-3 bg-neutral-100 rounded-md shadow-lg md:px-6 md:py-6 lg:p-8 lg:flex lg:gap-1"
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
      <AuthorListItemShowBooksButton
        isShowBooks={isShowBooks}
        booksLength={author.books.length}
        toggleShowBooks={toggleShowBooks}
      />
      <div className="lg:w-1/2 lg:shrink-0 lg:mt-[212px] text-xl font-medium">
        <h3 className="hidden lg:block lg:pl-4">Featured books</h3>
        {isShowBooks && <AuthorListItemBooks books={author.books} />}
      </div>
    </div>
  );
};

export default AuthorListItem;
