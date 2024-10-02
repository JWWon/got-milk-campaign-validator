"use client";

import { Select, SelectItem, SelectProps } from "@nextui-org/select";
import useIndexes from "./hooks/useIndexes";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useEffect, useMemo, useState } from "react";
import { useIndexID } from "@/app/utils/selectedVideoStore";

export default function IndexSelect({
  ...props
}: Omit<
  SelectProps,
  | "children"
  | "items"
  | "isLoading"
  | "selectionMode"
  | "scrollRef"
  | "onOpenChange"
>) {
  const {
    data: indexes,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useIndexes();

  const { indexID, setIndexID } = useIndexID();
  const indexIDs = useMemo(() => new Set(indexID ? [indexID] : []), [indexID]);

  useEffect(() => {
    setIndexID(indexes[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      aria-label='Select an index'
      selectionMode='single'
      scrollRef={scrollRef}
      isLoading={isFetching}
      placeholder='Select an index'
      items={indexes}
      onOpenChange={setIsOpen}
      selectedKeys={indexIDs}
      isInvalid={!indexID}
      errorMessage={!indexID ? "Please select an index" : null}
      onChange={(e) => setIndexID(e.target.value)}
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
