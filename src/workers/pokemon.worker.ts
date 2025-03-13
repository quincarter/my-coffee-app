import IndividualPokemonWorker from "./individual.pokemon.worker?worker&inline";

const getOG = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);

  const pokemon = await response.json();
  const collectThemAll: any = [];

  pokemon?.results?.map((poke: { name: any; url: any }) => {
    const pokemonWorker = new IndividualPokemonWorker();

    pokemonWorker.onmessage = async (msg: MessageEvent) => {
      collectThemAll.push({ ...msg.data });
      if (collectThemAll.length === pokemon.results.length) {
        postMessage(
          collectThemAll.sort((a: any, b: any) => (a.order > b.order ? 0 : 1))
        );
      }
      pokemonWorker.terminate();
    };

    pokemonWorker.postMessage(poke);
  });
};

onmessage = (message: MessageEvent) => {
  getOG();
};
