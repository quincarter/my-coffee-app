import { Route, Router } from "@vaadin/router";
import { LitElement, PropertyValueMap, html } from "lit";
import { query, state } from "lit/decorators.js";
import MyCoffeeAppStyles from "./my-coffee-app.styles";
import { navigationItems, routerContext } from "./navigation/navigation";

import { provide } from "@lit/context";
import "./components/navigation/flexible-nav";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyCoffeeApp extends LitElement {
  @provide({ context: routerContext })
  @state()
  router: Router | undefined;
  
  @query("#outlet")
  outlet: HTMLElement | undefined;

  static styles = [MyCoffeeAppStyles];

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.router = new Router(this.outlet);
    this.router.setRoutes(navigationItems as Route[]);
  }

  render() {
    return html`
      <flexible-nav .navItems="${navigationItems}">
        <div id="outlet"></div>
      </flexible-nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyCoffeeApp;
  }
}
