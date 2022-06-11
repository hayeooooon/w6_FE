import React from "react";
import styled from "styled-components";

import Button from "./Button";
import img_3 from "../images/img_3.jpeg";

const Detail = () => {
	return (
		<div className="content">
			<section>
				<div className="set_inner">
					<ImageArea>
						<div style={{ backgroundImage: `url(${img_3})` }}></div>
					</ImageArea>
					<ContentArea>
						<div className="info_area">
							<p>
								<span className="nickname">Nickname</span>
								<p className="score">
									<em>행복지수</em>
									<strong>
										좋음 <i>😆</i>
									</strong>
								</p>
							</p>
						</div>
						<div class="content_area">
							<p>
								내용 영역입니다. 내용 영역입니다. 내용 영역입니다. 내용
								영역입니다. 내용 영역입니다. 내용 영역입니다. 내용 영역입니다.
								내용 영역입니다. 내용 영역입니다. 내용 영역입니다. 내용
								영역입니다. 내용 영역입니다. 내용 영역입니다. 내용 영역입니다.
								내용 영역입니다. 내용 영역입니다. 내용 영역입니다. 내용
								영역입니다. 내용 영역입니다. 내용 영역입니다. 내용 영역입니다.
								내용 영역입니다. 내용 영역입니다. 내용 영역입니다. 내용
								영역입니다. 내용 영역입니다. 내용 영역입니다. 내용 영역입니다.
								내용 영역입니다. 내용 영역입니다. 내용 영역입니다. 내용
								영역입니다. 내용 영역입니다. 내용 영역입니다. 내용 영역입니다.
								내용 영역입니다. 내용 영역입니다. 내용 영역입니다. 내용
								영역입니다. 내용 영역입니다.
							</p>
						</div>
					</ContentArea>
				</div>
			</section>
			<section>
				<div className="set_inner">
					<SectionTitle>
						<strong>nickname</strong>님과 자유롭게 소통해주세요!
					</SectionTitle>
					<CommentArea>
						<div className="comment_write">
							<InputArea className="input_area textarea comment">
								<InputBox className="input_box">
									<div>
										<textarea
											type="text"
											placeholder="자유롭게 의견을 작성해주세요."
										></textarea>
									</div>
								</InputBox>
                <div className="btn_box">
                  <Button st="primary">작성하기</Button>
                </div> 
							</InputArea>
						</div>
						<div className="comment_view">
              <ul>
              <li>
                  <span>user</span>
                  <p>코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다.</p>
                </li>
                <li>
                  <span>Nickname</span>
                  <p>코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다.</p>
                </li>
                <li>
                  <span>닉네임 닉네임</span>
                  <p>코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다. 코멘트 입니다 코멘트 입니다 코멘트 입니다.</p>
                </li>
              </ul>
            </div>
					</CommentArea>
          <div className="btn_area">
          <Button width="m">취소</Button>
          <Button width="m" st="primary">등록하기</Button>
          </div>
				</div>
			</section>
		</div>
	);
};

const ImageArea = styled.div`
	div {
		height: 0;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding-bottom: 50%;
		border-radius: 10px;
		overflow: hidden;
	}
`;
const ContentArea = styled.div`
	.info_area {
		font-size: 1.8rem;
		padding: 20px 0 15px;
		.nickname {
			display: inline-block;
			vertical-align: middle;
		}
		.score {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			padding-left: 20px;
			margin-left: 20px;
      margin-top: .2em;
			&:before {
				position: absolute;
				left: 0;
				top: 50%;
				height: 16px;
				width: 1px;
				background-color: #ccc;
				content: "";
				margin-top: -8px;
			}
			em {
				font-style: normal;
			}
			strong {
        margin-left: 8px;
				i {
					display: inline-block;
					vertical-align: middle;
					font-size: 2.4rem;
					font-style: normal;
					margin-top: -.25em;
				}
			}
		}
	}
	.content_area {
		padding: 0 0 20px;
		p {
			line-height: 1.8;
		}
	}
`;
const SectionTitle = styled.h3`
	font-size: 2.4rem;
	padding-bottom: 20px;
	margin-bottom: 50px;
	border-bottom: 1px solid #000;
`;
const CommentArea = styled.div`
.input_area{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  &.textarea {
		.input_box {
      flex: 1;
			div {
				padding: 12px 0;
				border: 1px solid #333;
				textarea {
					border: none;
					padding: 0 12px;
          min-height: 50px;
				}
				&.focus {
					background-color: rgba(240, 240, 240, 0.5);
				}
			}
		}
	}
  button{
    height: 76px;
  }
}
	.comment_view {
		margin: 25px 0 15px;
    li{
      
      & + li{
        border-top: 1px solid #ccc;
        padding-top: 20px;
        margin-top: 20px;
      }

      span{
        display: block;
          font-size: 1.4rem;
          margin-bottom: 5px;
          font-weight: 500;
          opacity: .4;
        }
    }
	}
	.comment_write {
		margin: 15px 0;
	}
`;
const InputArea = styled.div``;

const ButtonBox = styled.div``;
const InputBox = styled.div``;

export default Detail;
