import { consume } from "@lit/context";
import { Route, Router } from "@vaadin/router";
import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { routerContext } from "../../navigation/navigation";
import { FlexibleNavStyles } from "./flexible-nav.styles";

export class FlexibleNav extends LitElement {
  static styles = [FlexibleNavStyles];

  @consume({ context: routerContext, subscribe: true })
  @state()
  router?: any;

  @property({ type: Array, attribute: "nav-items" })
  navItems: Route[] = [];

  render() {
    return html`
      <nav>
        <div id="top-nav">
          <i id="logo" class="material-icons">face</i>
          <i id="navToggle" class="material-icons">menu</i>
          <ul id="top-nav-items">
            ${this.navItems?.map(
              (item: Route) =>
                html`<li
                  @click="${() => FlexibleNav._onClick(item)}"
                  @keyup="${() => FlexibleNav._onClick(item)}"
                >
                  ${item.name}
                </li>`
            )}
          </ul>
        </div>
        <div id="bottom-nav">
          <div id="bottom-nav-items">
            ${this.navItems?.map(
              (item: Route) =>
                html`<div
                  @click="${() => FlexibleNav._onClick(item)}"
                  @keyup="${() => FlexibleNav._onClick(item)}"
                >
                  <span><i class="material-icons">face</i></span>
                  <span>${item.name}</span>
                </div>`
            )}
          </div>
        </div>
      </nav>

      <slot></slot>
    `;
  }

  private static _onClick(item: Route): void {
    Router.go(item.path);
  }
}
