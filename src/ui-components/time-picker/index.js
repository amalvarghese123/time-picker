import React, { useMemo, useState, useRef, useEffect } from "react";
import prependZeroTo from "../../utils/prependZeroTo";
import "./index.css";
import useScroll from "../../hooks/useScroll";

const TimePickerLatest = ({
  customInput: CustomInput,
  listItemHeight = "24px",
  visibleItemsLimit = 10,
  minutesInterval = 15,
  startHr = 0,
  endHr = 23,
  onChange: onChangeTime,
  value,
  ...rest
}) => {
  const timePickerRef = useRef();
  const inputRef = useRef();

  const listHeight = useMemo(
    () =>
      parseInt(listItemHeight) *
        Math.min(visibleItemsLimit, endHr - startHr + 1) +
      "px",
    [listItemHeight, visibleItemsLimit]
  );
  const hours = useMemo(
    () =>
      [...Array(endHr - startHr + 1)].map((_, idx) =>
        prependZeroTo(startHr + idx)
      ),
    []
  );
  const mins = useMemo(
    () =>
      [...Array(Math.round(60 / minutesInterval))].map((_, idx) =>
        prependZeroTo(idx * minutesInterval)
      ),
    [minutesInterval]
  );

  const {
    listRef: hrListRef,
    listItemsRef: hrListItemsRef,
    highlightedIdx: highlightedHrIdx,
    onArrowDown: onArrowDownHr,
    onArrowUp: onArrowUpHr,
    setHighlightedIdx: setHighlightedHrIdx,
    // listItemRefCallback: hrListItemRefCallback,
  } = useScroll(hours.length, hours.indexOf(value.split(":")[0]));

  const {
    listRef: minListRef,
    listItemsRef: minListItemsRef,
    highlightedIdx: highlightedMinIdx,
    onArrowDown: onArrowDownMin,
    onArrowUp: onArrowUpMin,
    setHighlightedIdx: setHighlightedMinIdx,
    // listItemRefCallback: minListItemRefCallback,
  } = useScroll(mins.length, mins.indexOf(value.split(":")[1]));

  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState("hr");

  const handleTime = (e) => {
    if (e.key === "Tab") {
      if (isOpen) setIsOpen(false);
    } else e.preventDefault();

    if (isFocused === "hr") {
      switch (e.key) {
        case "ArrowDown":
          onArrowDownHr();
          break;
        case "ArrowUp":
          onArrowUpHr();
          break;
        case "ArrowRight":
          // case "Tab":
          setIsFocused("min");
          break;
        default:
          break;
      }
    } else if (isFocused === "min") {
      switch (e.key) {
        case "ArrowDown":
          onArrowDownMin();
          break;
        case "ArrowUp":
          onArrowUpMin();
          break;
        case "ArrowLeft":
          setIsFocused("hr");
          break;
        // case "Tab":
        //   if (e.shiftKey) {
        //     setIsFocused("hr");
        //   }
        //   break;
        default:
          break;
      }
    }

    if (e.key === "Enter") {
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      if (isOpen) setIsOpen(false);
    }
  };

  const handleClose = (e) => {
    setIsOpen((prev) => !prev);
    inputRef.current?.focus();
  };

  const focusOnInput = (e) => inputRef.current?.focus();

  useEffect(() => {
    const handleClick = (e) => {
      const isClickOutside = !timePickerRef.current?.contains(e.target);
      if (isClickOutside) setIsOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const hr = hours[highlightedHrIdx];
    const min = mins[highlightedMinIdx];
    onChangeTime(`${hr}:${min}`);
  }, [highlightedHrIdx, highlightedMinIdx]);

  return (
    <div className="time-pckr-wpr" ref={timePickerRef}>
      {CustomInput ? (
        <CustomInput
          {...rest}
          value={value}
          onKeyDown={handleTime}
          onChange={() => {}}
          ref={inputRef}
        />
      ) : (
        <input
          {...rest}
          value={value}
          onKeyDown={handleTime}
          onChange={() => {}}
          ref={inputRef}
        />
      )}
      {isOpen && (
        <div className="list-cntr" onClick={focusOnInput}>
          <div
            ref={hrListRef}
            style={{ overflowY: "scroll", height: listHeight }}
          >
            <ul className={`${isFocused === "hr" ? "focused" : ""}`}>
              {hours.map((hr, idx) => {
                return (
                  <li
                    key={hr}
                    data-value={hr}
                    className={`${highlightedHrIdx === idx ? "active" : ""}`}
                    style={{ height: listItemHeight }}
                    onClick={() => setHighlightedHrIdx(idx)}
                    ref={(el) => (hrListItemsRef.current[idx] = el)}
                    // ref={(el) => hrListItemsRef.current.push(el)}
                    // ref={hrListItemRefCallback}
                  >
                    {hr}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            ref={minListRef}
            style={{ overflowY: "scroll", height: listHeight }}
          >
            <ul className={`${isFocused === "min" ? "focused" : ""}`}>
              {mins.map((min, idx) => {
                return (
                  <li
                    key={min}
                    data-value={min}
                    className={`${idx === highlightedMinIdx ? "active" : ""}`}
                    onClick={() => setHighlightedMinIdx(idx)}
                    style={{ height: listItemHeight }}
                    ref={(el) => (minListItemsRef.current[idx] = el)}
                    // ref={(el) => minListItemsRef.current.push(el)}
                    // ref={minListItemRefCallback}
                  >
                    {min}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <ClockIcon handleClose={handleClose} />
    </div>
  );
};
export default TimePickerLatest;

const ClockIcon = ({ handleClose = () => {} }) => (
  <span className="clock" onClick={handleClose}>
    <i className="far fa-clock"></i>
  </span>
);
