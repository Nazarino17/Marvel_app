

class MarvelService {
    _apiBase = 'http://gateway.marvel.com/v1/public/';
    _apiKey = 'apikey=374608f95f4695205b601e0403e56118';
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9?offset=210?ts=1&${this._apiKey}`);
        return  res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?ts=1&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }
    //ТРАНСФОРМАЦИЯ И ОПТИМИЗАЦИЯ
    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;