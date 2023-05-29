const User = require("../../models/User");

class UserBuilder {

  constructor() {
    this.entity = new User();
  }

  setidusuario(idusuario) {
    this.entity.idusuario = idusuario;
    return this;
  } 

  setMail(mail) {
    this.entity.mail = mail;
    return this;
  }

  setNickname(nickname) {
    this.entity.nickname = nickname;
    return this;
  } 

  setPassword(password) {
    this.entity.password = password;
    return this;
  } 

  
  setNombre(nombre) {
    this.entity.nombre = nombre;
    return this;
  }

  setAvatar(avatar) {
    this.entity.avatar = avatar;
    return this;
  }

  setTipoUsuario(tipo_usuario) {
    this.entity.tipo_usuario = tipo_usuario;
    return this;
  }

  setHabilitado(habilitado) {
    this.entity.habilitado = habilitado;
    return this;
  }

  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return new UserBuilder()
			.setidusuario(record.idusuario)
			.setMail(record.mail)
      .setPassword(record.password)
			.setNickname(record.nickname)
			.setHabilitado(false)
			.build();

  }
}

module.exports = UserBuilder;
