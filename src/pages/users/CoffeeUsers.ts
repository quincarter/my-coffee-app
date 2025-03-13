import { LitElement, PropertyValues, html } from "lit";
import { state } from "lit/decorators.js";
import PokemonWorker from "../../workers/pokemon.worker?worker&inline";
import { CoffeeUsersStyles } from "./coffee-users.styles";

const pokemonWorker = new PokemonWorker();
export class CoffeeUsers extends LitElement {
  static styles = [CoffeeUsersStyles];

  @state()
  pokemon: any = [];

  connectedCallback(): void {
    super.connectedCallback();
    pokemonWorker.onmessage = async (message: MessageEvent) => {
      console.log("message on main thread", message.data);
      this.pokemon = [...message.data];
    };
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    pokemonWorker.postMessage("pokemon");
  }

  render() {
    return html`${this.pokemon.length
      ? html`${this.pokemon.map(
          (pokemon: any) =>
            html`<div class="card">
              <div class="top-section">
                <h3>#${pokemon.id}: ${pokemon.name}</h3>
              </div>
              <div class="image-section">
                <img
                  src="${pokemon.sprites.other.dream_world.front_default}"
                  loading="lazy"
                  alt="${pokemon.name}"
                />
              </div>
              <div class="body"></div>
            </div>`
        )}`
      : html`<p>Loading Pokemon...</p>`}`;
  }
}
