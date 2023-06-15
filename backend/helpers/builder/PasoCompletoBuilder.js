const PasoCompletoVO = require("../../models/vo/PasoCompletoVO");
class PasoCompletoBuilder {

  constructor() {
    this.entity = new PasoCompletoVO();
  }

  paso(paso) {
    this.entity.idPaso = paso.getIdPaso();
    this.entity.idReceta = paso.getIdReceta();
    this.entity.nroPaso = paso.getNroPaso();
    this.entity.texto = paso.getTexto();
    this.entity.estado = paso.getEstado();
    return this;
  }

  multimedia(multimedia) {
    this.entity.multimedia = multimedia;
    return this;
  }

  build() {
    return this.entity;
  }

}

module.exports = PasoCompletoBuilder;
