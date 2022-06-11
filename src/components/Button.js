//Button.js
import React from "react";
import styled, { css } from "styled-components";

//size 제어
const styleVariation = css`
	${(props) =>
		props.st === "primary" &&
		css`
			color: #fff;
			border-color: #000;
			background-color: #000;
		`}
	${(props) =>
		props.st === "point" &&
		css`
			color: #f2b43f;
			border-color: #f2b43f;
			background-color: transparent;
		`}
		${(props) =>
		props.st === "text" &&
		css`
			height: auto;
			border: none;
			line-height: 1.2;
			padding: 0;
			font-weight: 700;
		`}
`;

const buttonHeight = css`
	${(props) =>
		props.height === "s" &&
		css`
			height: 32px;
			line-height: 30px;
			font-size: 14px;
		`}
`;

const buttonWidth = css`
	${(props) =>
		props.width === "m" &&
		css`
			min-width: 140px;
			padding: 0;
			text-align: center;
		`}
`;

const ButtonStyle = styled.button`
	/* 공통 스타일 */
	display: inline-block;
	height: 44px;
	line-height: 42px;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0 15px;
	border: 1px solid #ddd;
	font-size: 1.5rem;
	background-color: transparent;
	color: #000;
	border-color: #000;
	font-weight: 500;
	vertical-align: middle;
	${styleVariation}
	${buttonHeight}
	${buttonWidth}
  & + button {
		margin-left: 12px;
	}
`;

function Button({ children, style, height, width, ...rest }) {
	return (
		<ButtonStyle st={style} height={height} width={width} {...rest}>
			{children}
		</ButtonStyle>
	);
}

export default Button;
