import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }
    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;

  button {
    width: 90px;
    height: 40px;
    background: #f95f62;
    border-radius: 5px;
    border: 1px solid #ddd;
    cursor: pointer;
    color: #fff;
    strong {
      margin-left: 3px;
    }
  }
  button[name="update"] {
    background: #4285f4;
  }
`;
