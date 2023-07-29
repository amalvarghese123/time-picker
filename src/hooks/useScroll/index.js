import { useRef, useEffect, useState } from "react";

const useScroll = (listItemsCount, initialHighlightedIdx) => {
  const listRef = useRef();
  const listItemsRef = useRef([]);
  const [highlightedIdx, setHighlightedIdx] = useState(
    initialHighlightedIdx || 0
  );
  const maxIdx = listItemsCount - 1;
  const minIdx = 0;

  const onArrowDown = () =>
    setHighlightedIdx((prev) => (prev === maxIdx ? minIdx : prev + 1));
  const onArrowUp = () =>
    setHighlightedIdx((prev) => (prev === minIdx ? maxIdx : prev - 1));

  // const listItemRefCallback = (listItem) =>
  //   listItemsRef.current?.push(listItem);

  useEffect(() => {
    const listRect = listRef.current?.getBoundingClientRect();
    const highlightedItemRect =
      listItemsRef.current[highlightedIdx]?.getBoundingClientRect();

    if (listRect && highlightedItemRect) {
      const distToTop = highlightedItemRect.top - listRect.top;
      const distToBottom = listRect.bottom - highlightedItemRect.bottom;

      if (distToTop < 0 && distToBottom > 0) {
        listRef.current.scrollTop -= ~distToTop;
      }
      if (distToTop > 0 && distToBottom < 0) {
        listRef.current.scrollTop += ~distToBottom;
      }
    }
  }, [highlightedIdx, listRef.current, listItemsRef.current /* ie isOpen */]);

  return {
    listRef,
    listItemsRef,
    highlightedIdx,
    onArrowDown,
    onArrowUp,
    setHighlightedIdx,
    // listItemRefCallback,
  };
};
export default useScroll;
