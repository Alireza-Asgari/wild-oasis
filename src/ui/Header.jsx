import styled from "styled-components";

const HeaderStyled = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
`;

function Header() {
  return <HeaderStyled>header</HeaderStyled>;
}

export default Header;
