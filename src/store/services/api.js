export default class Api {
    static API_KEY = 'd481ce7b-61d7-483c-a836-7e3a05511a1a';

    static async get(word, ctx) {
        const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.API_KEY}`);
        if (response.ok) {
            const list = await response.json();
            ctx.commit('fillList', list);
        } else {
            console.log(response);
        }
    }
}
