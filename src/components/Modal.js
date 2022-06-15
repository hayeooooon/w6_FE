import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { deleteHappyAxios } from "../modules/redux/haedal";

const Modal = ({ toggle, item, clearToggle, clearItem }) => {
	const dispatch = useDispatch();
	console.log(toggle);
	return (
		<ModalWrap show={toggle ? true : false}>
			<ModalBox>
				<h4>스토리를 삭제하시겠습니까?</h4>
				<div className="btn_area">
					<div><Button
						outline
						type="button"
						onClick={() => {
							clearToggle(false);
							clearItem(null);
						}}
					>
						취소
					</Button></div>
					<div><Button
						primary
						type="button"
						onClick={() => {
							dispatch(deleteHappyAxios(item));
							clearToggle(false);
							clearItem(null);
						}}
					>
						삭제
					</Button></div>
				</div>
			</ModalBox>
		</ModalWrap>
	);
};

const ModalWrap = styled.div`
	display: ${(props) => (props.show ? "flex" : "none")};
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 2;
`;
const ModalBox = styled.div`
	position: relative;
	max-width: 420px;
	width: 90%;
	padding: 30px;
	background-color: #fff;
	margin: 60px auto;
	box-sizing: border-box;
	text-align: center;
	h4 {
		font-size: 16px;
		padding: 30px 0 55px;
	}
  .btn_area{
    margin: 0 -8px;
    font-size: 0;
    border-top: none;
    padding-top: 0;
    & > div {
      display: inline-block;
      padding: 0 8px;
      width: 50%;
      box-sizing: border-box;
    }
  }
`;
const Button = styled.button`
  display: block;
  width: 100%;
	height: 44px;
	line-height: 42px;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0 30px;
	border: 1px solid #ddd;
	font-size: 1.5rem;
	background-color: ${(props) => (props.primary ? "#000" : "transparent")};
	color: ${(props) => (props.primary ? "#fff" : "#000")};
	border-color: #000;
	font-weight: 500;
	vertical-align: middle;
`;
export default Modal;
