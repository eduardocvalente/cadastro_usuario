class ValidaSequenciaColchetes {
    constructor(sequencia) {
        this.sequencia = sequencia;
        this.pilha = [];
        this.colchetesAbertos = { '(': ')', '{': '}', '[': ']' };
        this.errors = [];
    }

    isValid() {
        for (let i = 0; i < this.sequencia.length; i++) {
            let char = this.sequencia[i];

            if (this.colchetesAbertos[char]) {
                this.pilha.push(char);
            } else {
                let colcheteAbertoMaisRecente = this.pilha.pop();

                if (!colcheteAbertoMaisRecente) {
                    this.errors.push('Sequência inválida: colchete de fechamento sem colchete de abertura correspondente.');
                    return false;
                }
            if (this.colchetesAbertos[colcheteAbertoMaisRecente] !== char) {
                    this.errors.push('Sequência inválida: colchete de fechamento sem colchete de abertura correspondente.');
                    return false;
                }
            }
        }

        if (this.pilha.length !== 0) {
            this.errors.push('Sequência inválida: colchete de abertura sem colchete de fechamento correspondente.');
            return false;
        }

        return true;
    }

    getErrors() {
        return this.errors;
    }
}

module.exports = ValidaSequenciaColchetes;
