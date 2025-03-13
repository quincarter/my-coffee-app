import { LitElement, PropertyValues, html } from "lit";
import { state } from "lit/decorators.js";
import PokemonWorker from "../../workers/pokemon.worker?worker&inline";
import { CoffeeUsersStyles } from "./coffee-users.styles";
import "@lottiefiles/dotlottie-wc";

const pokemonWorker = new PokemonWorker();
export class CoffeeUsers extends LitElement {
  static styles = [CoffeeUsersStyles];

  @state()
  pokemon: any = [];

  connectedCallback(): void {
    super.connectedCallback();
    pokemonWorker.onmessage = async (message: MessageEvent) => {
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
      : html`<div class="loading">
          <dotlottie-wc
            src="https://lottie.host/d014ac99-9331-4807-98c1-e7a96baa06b9/WCesWSD7SZ.lottie"
            background="transparent"
            speed="1"
            style="width: 300px; height: 300px"
            loop
            autoplay
          ></dotlottie-wc>
          <p>Loading Pokemon...</p>
        </div> `}`;
  }
}
