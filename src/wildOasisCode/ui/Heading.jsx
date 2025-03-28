import styled, { css } from "styled-components";

const test = css`
   text-align: center;
`;

const Heading = styled.h1`
   ${(props) =>
      props.type === "h1" &&
      css`
         font-size: 30px;
         font-weight: 600;
         /* background-color: var(--color-yellow-100); */
         /* ${test} */
      `}
   ${(props) =>
      props.type === "h2" &&
      css`
         font-size: 2rem;
         font-weight: 600;
         /* background-color: var(--color-blue-100); */
         font-style: italic;
         /* ${test} */
      `}
      ${(props) =>
      props.as === "h3" &&
      css`
         font-size: 2rem;
         font-weight: 500;
         /* background-color: var(--color-brand-200); */
         /* font-style: italic; */
         font-variant: all-small-caps;
         /* ${test} */
      `}
      ${(props) =>
      props.as === "h4" &&
      css`
         font-size: 3rem;
         font-weight: 600;
         text-align: center;
         /* background-color: var(--color-brand-200); */
         /* font-style: italic; */
         font-variant: all-small-caps;
         /* ${test} */
      `}
   line-height: 1.4;
`;

export default Heading;
