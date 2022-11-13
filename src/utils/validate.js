export default class Validate {
    static message = '';

    static isEmpty(word) {
        return !word;
    }

    static errorMessage() {
        if (this.isEmpty()) {
            this.message = 'Please, text something!';
        }
        return this.message;
    }
}
