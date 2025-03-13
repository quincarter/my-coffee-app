const getPokemon = async (url: string, name: string) => {
  const response = await fetch(url);
  postMessage(await response.json());
};

onmessage = (message: MessageEvent) => {
  const { url, name } = message.data;
  getPokemon(url, name);
};
