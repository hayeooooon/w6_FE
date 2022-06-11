import React from 'react';
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterWrap>
      <ul>
      <li>MADE BY 항해99 7기</li>
      <li>함형준</li>
      <li>김수진</li>
      <li>김하연B</li>
      <li>이병관</li>
      <li>이준호</li>	
      </ul>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  font-size: 1.2rem;
  color: rgba(0,0,0,.8);
  text-align: center;
  background-color: #f5f2ed;
  height: 60px;
  ul{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
    margin: 0;
    li:first-of-type{
      letter-spacing: 0.03em;
      font-weight: 200;
    }
  }
`

export default Footer;