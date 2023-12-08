import { LitElement, html } from "lit";
import { CoffeeUsersStyles } from "./coffee-users.styles";

export class CoffeeUsers extends LitElement {
  static styles = [CoffeeUsersStyles];

  render() {
    return html`<p>Users Works!</p>`;
  }
}
