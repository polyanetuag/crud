/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import Main from '../Main/Main'
import axios from 'axios'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
  user: { name: '', email: ''},
  list: []
}
export default class UserCrud extends Component {
  state = { ...initialState}

  //limpa o usuário
  clear() {
    this.setState({ user: initialState.user})
  }

  //inserir ou atualizar um usuário
  save() {
    const user = this.state.user
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    axios[method](url, user)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({ user: initialState.user, list })
      })
  }

  //atualizar os campos nome e email
  updateField(event) {
    const user = { ...this.state.user}
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  //atualizar o usuário
  getUpdatedList(user) {
    const list = this.state.list.filter(u => u.id !== user.id)
    list.unshift(user)
    return list
  }

  //renderizando formulário
  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input 
                type="text" 
                className="form-control" 
                name="name"
                value={this.state.user.name}
                onChange={e=> this.updateField(e)}
                placeholder="Digite o nome..."
                />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-control" 
                name="email"
                value={this.state.email}
                onChange={e=> this.updateField(e)}
                placeholder="Digite o email..."
                />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button 
              className="btn btn-primary" 
              onClick={e => this.save(e)}>
                Salvar
            </button>

            <button 
              className="btn btn-secondary mx-2"
              onClick={e => this.clear(e)}>
                Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
      </Main>
    )
  }
}