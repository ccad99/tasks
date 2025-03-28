import styled, { css } from "styled-components";

const Form = styled.form`
   ${(props) =>
      props.type === "regular" &&
      css`
         padding: 1.8rem 3rem;

         /* Box */
         background-color: var(--color-grey-0);
         border: 1px solid var(--color-grey-100);
         border-radius: var(--border-radius-md);
      `}

   ${(props) =>
      props.type === "modal" &&
      css`
         width: 52rem;
         font-size: 1.2rem;
      `}
    
  overflow: hidden;
   font-size: 1.4rem;
`;

Form.defaultProps = {
   type: "regular",
};

export default Form;
