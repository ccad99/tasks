import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
   color: var(--color-grey-800);
   background-color: var(--color-grey-50);
   padding: 3rem 0.5rem;
   border-right: 1px solid var(--color-grey-100);
   grid-row: 1 / -1;
   display: flex;
   flex-direction: column;
   gap: 1.5rem;
`;

function Sidebar() {
   return (
      <StyledSidebar>
         <Logo />
         <MainNav />
         <Uploader />
      </StyledSidebar>
   );
}

export default Sidebar;
