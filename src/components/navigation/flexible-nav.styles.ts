import { css } from "lit";

export const FlexibleNavStyles = css`
  body {
    background-color: #80cf7c;
    font-family: Lato, sans-serif;
    margin: 0;
    padding: 0;
  }

  nav {
    background-color: #fff;
  }

  nav i {
    margin: 22px 0 0 30px;
    transform: scale(2);
    transition: all 0.2s linear;
  }

  nav ul {
    display: inline;
    list-style: none;
  }

  nav li {
    cursor: pointer;
    display: inline;
  }

  #logo {
    position: fixed;
    left: 0vw;
  }

  #navToggle {
    cursor: pointer;
    display: none;
    height: 30px;
    position: fixed;
    right: 30px;
  }

  #top-nav {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    height: 75px;
    transition: all 0.2s linear;
  }

  #top-nav ul {
    float: right;
    margin: 22px 30px 0 0;
  }

  #top-nav li {
    font-size: 1.2em;
    padding-right: 20px;
  }

  #bottom-nav {
    background-color: #fff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.12),
      5px 1px 10px rgba(0, 0, 0, 0.24);
    position: fixed;
    text-align: center;
    bottom: 0px;
    width: 100%;
    height: 0px;
    opacity: 0;
    transition: all 0.2s linear;
  }

  #bottom-nav-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100vw;
  }

  #bottom-nav-items span:nth-child(even) {
    color: #a0a0a0;
    cursor: pointer;
  }

  #bottom-nav i {
    display: block;
    margin-bottom: 8px;
    font-size: 1.5em;
    cursor: pointer;
  }

  .main-content-area {
    background-color: #fff;
    border-radius: 4px;
    height: 200px;
    max-width: 300px;
    margin: 100px auto;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .main-content-area h1 {
    padding-top: 80px;
  }

  /*==========  Media Queries  ==========*/

  /* Extra Small Devices, Phones */
  @media only screen and (max-width: 480px) {
    nav i {
      transform: scale(1.2);
      margin: 11px 0 0 0;
      transition: all 0.2s linear;
    }

    #logo {
      left: 46vw;
    }

    #navToggle {
      display: block;
    }

    #top-nav {
      height: 45px;
    }

    #top-nav ul {
      display: none;
    }

    #bottom-nav {
      height: 75px;
      opacity: 100;
      transition: all 0.2s linear;
    }
  }
`;
