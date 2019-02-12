import React from "react";
import PropTypes from "prop-types";

import { Container, Repository, Actions } from "./styles";

const CompareList = ({ repositories, updateRepository, deleteRepository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repository.last_commit} <small>last commit</small>
          </li>
        </ul>

        <Actions>
          <button
            type="button"
            name="update"
            onClick={() => updateRepository(repository.id)}
          >
            <i className="fa fa-retweet" />
            <strong>Atualizar</strong>
          </button>
          <button
            type="button"
            name="delete"
            onClick={() => deleteRepository(repository.id)}
          >
            <i className="fa fa-trash" />
            <strong>Excluir</strong>
          </button>
        </Actions>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string
    })
  )
};

export default CompareList;
