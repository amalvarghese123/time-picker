import React from "react";
import styled, { css } from "styled-components";

export const sharedStyle = css`
  width: 100%;
  height: 52px;
  border-radius: 0.4rem;
  border: 1px solid #ced4dc;
  font-size: 0.94rem;
  transition: all ease-in 350ms;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-weight: 300;

  padding-left: ${({ icon }) => (icon ? "3em" : "0.9em")};
  ${({ filled, outlined }) => {
    if (outlined)
      return "border-radius:0px;border-radius:5px;border:1px solid #ccc;";
    if (filled)
      return `border-radius:5px; background-color:#fff;border:1px solid #ccc`;
  }}
  ${({ borderd }) =>
    borderd &&
    `border-radius:0px; background-color:white;border:0;border-bottom:2px solid #ddd`};
  ${({ error }) => error && `border-color:#d32f2f;`}
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    outline: 0;
    border: 0px;
    border-style: solid;
    border-color: #161e54;
    border-width: 2.5px;
    color: #161e54;
    ${({ filled }) => filled && `border:1px solid #ddd`};
    ${({ error }) => error && `border-color:#d32f2f;`}
  }
  & + label {
    position: absolute;
    left: 16px;
    top: 12.5px;
    transition: all ease-in 350ms;
    pointer-events: none;
    font-size: 0.94rem;
    font-weight: 300;
    background-color: white;
    width: 65%;
  }
  &:focus + label {
    width: initial;
    top: -10px;
    background-color: ${({ filled, outlined }) =>
      filled ? "#fff" : outlined ? "white" : "#fff"};
    padding: 2px 0.8em;
    color: #161e54;
    font-size: 0.8em;
    ${({ error }) => error && `color:#d32f2f;`}
  }

  &:focus + label .required {
    opacity: 1 !important;
  }
  & + label {
    top: ${({ value }) => (value ? "-10px" : "15px")};
    width: ${({ value }) => (value ? "initial" : "65%")};
    background-color: ${({ value, outlined }) =>
      outlined ? "white" : "white"};
    padding: 2px 0.8em;
    font-size: ${({ value }) => (value ? "0.8em" : "0.8em")};
    left: ${({ icon }) => (icon ? "3em" : "15px")};
    white-space: pre;
    overflow: hidden;
  }
  & + label + i,
  & + label + svg {
    pointer-events: none;
    position: absolute;
    left: 15px;
    font-size: 20px;
    top: 15px;
    ${({ error }) => error && `color:#7f8eaa`}
  }
`;

export const StyledInputContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const InputWithSubmit = styled.input`
  ${sharedStyle}
`;

export const Error = styled.span`
  display: inline-block;
  color: #d32f2f;
  text-align: left;
  font-weight: 400;
  pointer-events: "none";
  font-size: 12px;
`;
export const Hint = styled.div`
  display: block;
  color: #908143;
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  pointer-events: "none";
`;
export const StyledButton = styled.button`
  position: absolute;
  right: 14px;
  top: 9px;
  border: 0;
  padding: 10px 18px;
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 1px 2px 7px #ccc;
  background: #4a90e2;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const InputSubmit = ({ value, onChange, placeholder, icon }) => {
  return (
    <StyledInputContainer>
      <InputWithSubmit
        placeholder=""
        icon={icon}
        value={value}
        onChange={onChange}
      />
      {placeholder && <label>{placeholder}</label>}
      {icon && icon}
      <StyledButton>Reset Password</StyledButton>
    </StyledInputContainer>
  );
};

export const ArrowIcon = () => {
  return (
    <svg
      className="form-select-arrow"
      style={{
        pointerEvents: "none",
        position: "absolute",
        right: "18px",
        top: "16px",
        left: "auto",
      }}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </svg>
  );
};
const Block = styled.div`
  margin-bottom: 1em;
`;
const SimpleInput = styled.input`
  height: 50px;
  width: 100%;
  padding-left: 50px;
  border: 1px solid #ced4dc;
  & + i {
    position: absolute;
    left: 16px;
    top: 12px;
  }
`;

const ListSearchInput = ({ value, onSearch }) => {
  return (
    <StyledInputContainer>
      <SimpleInput
        onChange={onSearch}
        value={value}
        placeholder="Search Job-Id or Profile"
        style={{ borderRadius: "25px" }}
      />
      <i className="bi bi-search"></i>
    </StyledInputContainer>
  );
};

// const DataList = ({
//   filled,
//   borderd,
//   outlined,
//   error,
//   options = [],
//   getLabel,
//   getValue,
//   value,
//   label,
//   onChange,
//   icon,
//   label: placeholder,
//   name,
//   id,
// }) => {
//   return (
//     <Fragment>
//       <StyledInputContainer>
//         <StyledInput
//           autoComplete="off"
//           name={name}
//           icon={icon}
//           value={value}
//           onChange={onChange}
//           outlined={outlined || undefined}
//           filled={filled || undefined}
//           borderd={borderd || undefined}
//           error={error}
//           list={id}
//         />
//         {placeholder && <label>{placeholder}</label>}

//         <datalist id={id}>
//           {options?.map((option, idx) => {
//             let labelText = isString(option) ? option : getLabel(option);
//             let dataValue = isString(option)
//               ? option
//               : option?.hasOwnProperty("_id")
//               ? getValue(option)
//               : idx;
//             return (
//               <option key={idx} data-id={dataValue} value={labelText}></option>
//             );
//           })}
//         </datalist>
//         <ArrowIcon />
//       </StyledInputContainer>
//     </Fragment>
//   );
// };
// const isString = (str) => typeof str === "string";
const Styled = () => {};
Styled.InputSubmit = InputSubmit;
Styled.ListSearchInput = ListSearchInput;
Styled.IBlock = Block;
// Styled.DataList = DataList;
Styled.Hint = Hint;

export default Styled;
