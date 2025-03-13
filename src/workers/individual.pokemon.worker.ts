const getPokemon = async (url: string) => {
  const response = await fetch(url);
  postMessage(await response.json());
};

onmessage = (message: MessageEvent) => {
  const { url } = message.data;
  getPokemon(url);
};
