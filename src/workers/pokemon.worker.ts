import IndividualPokemonWorker from "./individual.pokemon.worker?worker&inline";
import { set } from "idb-keyval";

const getOG = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);

  const pokemon = await response.json();
  const collectThemAll: any = [];
  console.log("pokemon in the worker", pokemon.results);

  pokemon?.results?.map((poke: { name: any; url: any }) => {
    const pokemonWorker = new IndividualPokemonWorker();

    pokemonWorker.onmessage = async (msg: MessageEvent) => {
      collectThemAll.push({ ...msg.data });
      if (collectThemAll.length === pokemon.results.length) {
        postMessage(collectThemAll);
      }
      pokemonWorker.terminate();
    };

    pokemonWorker.postMessage(poke);
  });
};

onmessage = (message: MessageEvent) => {
  console.log("pokemon worker message", message.data);
  getOG();
};
