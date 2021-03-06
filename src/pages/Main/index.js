import React, { Component } from "react";
import api from "../../services/api";
import moment from "moment";
import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";
import logo from "../../assets/logo.png";

class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: []
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({
      loading: false,
      repositories: await this.getLocalRepositories()
    });
  }

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: "",
        repositories: [...repositories, repository]
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem(
        "@GitCompare:repositories",
        JSON.stringify([...localRepositories, repository])
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  getLocalRepositories = async () =>
    JSON.parse(await localStorage.getItem("@GitCompare:repositories")) || [];

  updateRepository = async id => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.last_commit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: "",
        repositories: repositories.map(repo =>
          repo.id === data.id ? data : repo
        )
      });

      await localStorage.setItem(
        "@GitCompare:repositories",
        JSON.stringify(repositories)
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  deleteRepository = async id => {
    const { repositories } = this.state;
    const updatedRepositories = repositories.filter(
      repository => repository.id !== id
    );

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem(
      "@GitCompare:repositories",
      JSON.stringify(updatedRepositories)
    );
  };

  render() {
    const {
      loading,
      repositories,
      repositoryInput,
      repositoryError
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuario/repositorio"
            value={repositoryInput}
            onChange={e =>
              this.setState({
                repositoryInput: e.target.value,
                repositoryError: false
              })
            }
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse " /> : "OK"}
          </button>
        </Form>
        <CompareList
          repositories={repositories}
          deleteRepository={this.deleteRepository}
          updateRepository={this.updateRepository}
        />
      </Container>
    );
  }
}

export default Main;
