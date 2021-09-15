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
  user: { name: '', email: '', id: ''},
  list: []
}
export default class UserCrud extends Component {
  state = { ...initialState}

  //exibi a lista de usuários
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

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
  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(u => u.id !== user.id)
    if(add)list.unshift(user)
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

  //carregar usuário quando alterar 
  load(user) {
    this.setState({ user })
  }

  //remover um usuário
  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.getUpdatedList(user, false)
      this.setState({ list})
    })
  }

  //renderizar tabela
  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger mx-2" onClick={() => this.remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>

        </tr>
      )
    })
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}