import { css } from "lit";

export const CoffeeUsersStyles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    justify-items: center;
    align-items: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 5rem;
  }
`;
