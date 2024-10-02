"use client";

import { Select, SelectItem, SelectProps } from "@nextui-org/select";
import useIndexes from "./useIndexes";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";

interface Props
  extends Omit<
    SelectProps,
    | "children"
    | "items"
    | "isLoading"
    | "selectionMode"
    | "scrollRef"
    | "onOpenChange"
  > {}

export default function IndexSelect({ ...props }: Props) {
  const {
    data: indexes,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useIndexes();

  const [isOpen, setIsOpen] = useState(false);
  const [, scrollRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage,
  });

  return (
    <Select
      isRequired
      selectionMode='single'
      scrollRef={scrollRef}
      isLoading={isFetching}
      placeholder='Select an index'
      items={indexes}
      onOpenChange={setIsOpen}
      {...props}
    >
      {(index) => (
        <SelectItem key={index.id} className='[&>span]:truncate'>
          {index.name}
        </SelectItem>
      )}
    </Select>
  );
}
