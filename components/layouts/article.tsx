import React, { FC, PropsWithChildren } from "react";

const Article: FC<PropsWithChildren> = ({ children }) => {
  return <article className="mx-auto max-w-[800px]">{children}</article>;
};

export default Article;
