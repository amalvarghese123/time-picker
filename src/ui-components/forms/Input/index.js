import styled from "styled-components";
import {
  StyledInputContainer,
  Hint,
  Error,
  sharedStyle,
} from "../Shared-input";
import { forwardRef } from "react";
const StyledInput = styled.input`
  ${sharedStyle}
`;

const Input = forwardRef(
  (
    {
      onPaste,
      value,
      onChange,
      label: placeholder,
      icon,
      filled,
      borderd,
      outlined,
      error,
      hint,
      onBlur,
      type,
      must,
      onKeyUp,
      disabled,
      ...rest
    },
    ref
  ) => {
    // const handlePasswordVisibility = (e) => {
    //   const inputEl = document.getElementsByClassName("input-el");
    //   for (let i = 0; i < inputEl.length; i++) {
    //     if (inputEl[i].dataset.type === "input-password") {
    //       inputEl[i].type =
    //         inputEl[i].type === "password" ? "text" : "password";
    //     }
    //   }
    // };

    return (
      <StyledInputContainer>
        <StyledInput
          onKeyUp={onKeyUp}
          type={type || "text"}
          ref={ref}
          placeholder=""
          icon={icon}
          value={value}
          onChange={onChange}
          outlined={outlined || undefined}
          filled={filled || undefined}
          borderd={borderd || undefined}
          error={error}
          onBlur={onBlur}
          onPaste={onPaste}
          data-type={`input-${type}`}
          disabled={disabled}
          className="input-el"
          {...rest}
        />
        {placeholder && (
          <label>
            {placeholder}
            {must && (
              <span className="required text-danger" style={{ opacity: 0 }}>
                *
              </span>
            )}
          </label>
        )}
        {icon && icon}
        {/* {type === "password" && (
          <button
            type="button"
            className="password-eye"
            onClick={handlePasswordVisibility}>
            <i className="bi bi-eye"></i>
          </button>
        )} */}
        {/* {error && (
          <div style={{ textAlign: "left" }}>
            {" "}
            <Error>{error}</Error>
          </div>
        )} */}
        {error && <span className="text-danger fs-12">{error}</span>}

        {hint && <Hint>Note: {hint}</Hint>}
      </StyledInputContainer>
    );
  }
);
export default Input;
