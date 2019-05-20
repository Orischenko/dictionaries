import {  createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
    }
    
    h1, h2 {
        font-size: 2em;
        line-height: 1em;
        font-weight: 400;
        text-transform: capitalize;
        padding: 0;
        color: ${({ theme }) => theme.colors.mainDark};
        margin-bottom: 3rem;
    }
    
    h2 {
        margin-bottom: 5px;
    }
    
    h3 {
        font-size: 1.75rem;
        line-height: 1em;
        font-weight: 400;
        margin-bottom: 5px;
        text-transform: capitalize;
    }
    
    h4 {
        font-size: 1.3rem;
        line-height: 1.3em;
        font-weight: 400;
        margin-bottom: 6px;
        color: ${({ theme }) => theme.colors.main};
    }
    
    h5 {
        font-size: 1.3rem;
        line-height: 1em;
        font-weight: 300;
        margin-bottom: 10px;
    }
    
    p {
        margin-bottom: 5px 
    }
    
    *:focus {
        outline: 0;
        outline: none;
    }
    
    html {
        font-size: 62.5%;
        box-sizing: border-box;
        --color-main: ${({ theme }) => theme.colors.main}
        --color-mainDark: ${({ theme }) => theme.colors.mainDark};
        --color-primary: ${({ theme }) => theme.colors.primary};
        --color-accent1: ${({ theme }) => theme.colors.accent1};
        --color-accent2: ${({ theme }) => theme.colors.accent2};
        --color-accent3: ${({ theme }) => theme.colors.accent3};
        --color-accent4: ${({ theme }) => theme.colors.accent4};
        --color-mainLight: ${({ theme }) => theme.colors.mainLight};
        --color-text: ${({ theme }) => theme.colors.textColor};
        --color-white: ${({ theme }) => theme.colors.white};
        --color-error: ${({ theme }) => theme.colors.error};
        --color-active: ${({ theme }) => theme.colors.active};
        --shadow: ${({ theme }) => theme.colors.shadow};
        --color-borderColor: ${({ theme }) => theme.colors.borderColor};
        
        @media ${({ theme }) => theme.mediaQueries.small} {
          font-size: 60%;
        }
        @media ${({ theme }) => theme.mediaQueries.smallest} {
          font-size: 55%;
        }
    }
  
    body {
        font-family: 'Open Sans', sans-serif;
        font-size: 10px;
        font-weight: 400;
        line-height: 1.6;
    }
    
    a {
        cursor: pointer;
        color: #fff;
    }
    
    button {
        cursor: pointer;
        
        &.primary {
            border: none;
            box-shadow: none;
            margin: 0;
            padding: 1.5rem 4rem;
            font-size: 1.7rem;
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.accent3};
            transition: all .25s ease-out;
            
            &:hover {
              box-shadow: 0px 1px 3rem rgba(0,0,0,0.13);
              padding-left: 4.3rem;
              padding-right: 4.3rem;
            }
        }
    }
    
    a, input, textarea, button {
        outline: none;
        text-decoration: none;
        font-family: inherit;
    }
    
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
`;