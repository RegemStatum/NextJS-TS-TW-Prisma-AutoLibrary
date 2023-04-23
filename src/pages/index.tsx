import React, { FC } from "react";
import Link from "next/link";

const index: FC = () => {
  return (
    <div>
      <Link href="/books">Books</Link>
    </div>
  );
};

export default index;
