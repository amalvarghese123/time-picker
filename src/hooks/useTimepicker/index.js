import { useState, useRef, useEffect, useMemo } from "react";
import prependZeroTo from "../../utils/prependZeroTo";

const useTimepicker = ({ onSelectTime, value }) => {
  const hrRef = useRef();
  const minRef = useRef();
  const hrListRef = useRef();
  const minListRef = useRef();
  const timePickerRef = useRef();
  const inputRef = useRef();

  const hours = useMemo(
    () => [...Array(24)].map((_, idx) => prependZeroTo(idx)),
    []
  );
  const mins = useMemo(
    () => [...Array(12)].map((_, idx) => prependZeroTo(idx * 5)),
    []
  );
  const initialValue = useMemo(() => {
    if (!value || typeof value === "object") {
      value = "00:00";
    }
    const timeParts = value.split(":").map((el) => prependZeroTo(el));
    const idx = hours.indexOf(timeParts[0]);
    return { hourIdx: idx, min: timeParts[1] };
  }, [value]);

  useEffect(() => {
    setHrIndex(initialValue.hourIdx);
    setMin(initialValue.min);
  }, [initialValue]);

  const [hrIndex, setHrIndex] = useState(initialValue.hourIdx || 0);
  const [minIndex, setMinIndex] = useState(0);
  const [min, setMin] = useState(initialValue.min || "00");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState("hr");

  const handleHour = (e) => {
    e.preventDefault();
    const minLimit = 0;
    const maxLimit = 23;
    switch (e.key) {
      case "ArrowDown":
        setHrIndex((prev) => {
          return prev < maxLimit ? prev + 1 : minLimit;
        });
        if (hrIndex > 8 && hrListRef.current) {
          if (hrIndex < maxLimit) hrListRef.current.scrollTop += 20;
          else hrListRef.current.scrollTop = 0;
        }
        break;
      case "ArrowUp":
        setHrIndex((prev) => {
          return prev > minLimit ? prev - 1 : maxLimit;
        });
        if (hrIndex < 15 && hrListRef.current) {
          if (hrIndex > minLimit) hrListRef.current.scrollTop -= 20;
          else hrListRef.current.scrollTop = 2000;
        }
        break;
      case "ArrowRight":
      case "Tab":
        minRef.current?.focus();
        setIsFocused("min");
        break;
      default:
        break;
    }
  };
  const handleMin = (e) => {
    e.preventDefault();
    const minLimit = 0;
    const maxLimit = 11;
    switch (e.key) {
      case "ArrowDown":
        setMinIndex((prev) => {
          const idx = prev < maxLimit ? prev + 1 : minLimit;
          setMin(mins[idx]);
          return idx;
        });
        if (minIndex > 8 && minListRef.current) {
          if (minIndex < maxLimit) minListRef.current.scrollTop += 20;
          else minListRef.current.scrollTop = 0;
        }
        break;
      case "ArrowUp":
        setMinIndex((prev) => {
          const idx = prev > minLimit ? prev - 1 : maxLimit;
          setMin(mins[idx]);
          return idx;
        });
        if (minIndex < 3 && minListRef.current) {
          if (minIndex > minLimit) minListRef.current.scrollTop -= 20;
          else minListRef.current.scrollTop = 2000;
        }
        break;
      case "ArrowLeft":
        hrRef.current?.focus();
        setIsFocused("hr");
        break;
      case "Tab":
        if (e.shiftKey) {
          hrRef.current?.focus();
          setIsFocused("hr");
        }
        break;
      //   case "Enter":
      //     setMin(mins[minIndex]);
      //     break;
      default:
        break;
    }
  };

  const setHr = (e) => {
    e.stopPropagation();
    setHrIndex(e.target.value);
    hrRef.current?.focus();
    setIsFocused("hr");
  };
  const setMinValue = (e, idx) => {
    e.stopPropagation();
    setMin(e.target.dataset.value);
    setMinIndex(idx);
    minRef.current?.focus();
    setIsFocused("min");
  };

  const handleOpen = (e) => {
    setIsOpen(true);
    if (!isOpen) {
      hrRef.current?.focus();
      setIsFocused("hr");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      timePickerRef.current?.focus();
    }
    if (e.key === "Enter")
      setIsOpen((prev) => {
        if (prev) timePickerRef.current?.focus();
        else {
          hrRef.current?.focus();
          setIsFocused("hr");
        }
        return !prev;
      });
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      hrRef.current?.focus();
      setIsFocused("hr");
    }
  };
  useEffect(() => {
    const hrString = prependZeroTo(hrIndex);
    onSelectTime(`${hrString}:${min}`);
  }, [hrIndex, min]);

  useEffect(() => {
    const handleClick = (e) => {
      const isClickOutside = !timePickerRef.current?.contains(e.target);
      if (isClickOutside) setIsOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return {
    hrRef,
    minRef,
    hrListRef,
    minListRef,
    timePickerRef,
    inputRef,
    handleClose,
    handleHour,
    handleKeyDown,
    handleMin,
    handleOpen,
    isOpen,
    hours,
    mins,
    minIndex,
    hrIndex,
    min,
    setHr,
    setMinValue,
    isFocused,
    setIsFocused,
  };
};
export default useTimepicker;
