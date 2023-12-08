import { LitElement, html } from "lit";
import { CoffeeHomeStyles } from "./coffee-home.styles";

export class CoffeeHome extends LitElement {
  static styles = [CoffeeHomeStyles];

  render() {
    return html`<p>Home Works!</p>`;
  }
}
