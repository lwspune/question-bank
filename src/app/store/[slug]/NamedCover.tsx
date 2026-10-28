"use client";

import type { ComponentProps } from "react";
import BookCover from "../_components/BookCover";
import { useEbookStatus } from "./EbookStatusContext";

/** The book page's cover: once the page knows who is looking, their own name sits on the name line. */
export default function NamedCover(props: Omit<ComponentProps<typeof BookCover>, "name">) {
  const { status } = useEbookStatus();
  return <BookCover {...props} name={status?.coverName ?? null} />;
}
