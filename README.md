#ES6 React Boilerplate (WIP)

##Building

Install the dependencies  
`npm install`

Run webpack and start a dev server  
`npm start`

Create a build  
`npm run build`

## Tools

* Development tools
    * Webpack
    * Babel
    * SASS Compiler
    * Autoprefixer
    * Browser-sync
* App tools
    * React


## Styles

Nested properties should only be used for pseudo selectors/classes,
otherwise you should use css modules compose to import the common styles
and overwrite when necessary.

Modifiers should be passed into the component as a prop, after that they can be defined in the
css with an underscore and append the modifier in the render method, or create different theme
files in the component.



```
/* button.css */

.default {
    padding: 10px;
    border: 1px solid grey;
    composes: serif bold blue from "./typography.css";
    &:hover {
        cursor: pointer;
    }
}

.selected {
    composes: default;
    border-color: black;
    &:hover {
        pointer-events: none;
    }
}

.disabled {
    composes: default;
    &:hover {
        pointer-events: none;
    }
}

.default__profile {
    composes: default;
    border: 4px solid grey;
    composes: serif bold orange from "./typography.css";
}

.selected__profile {
    composes: default__profile;
    composes: selected;
}

```

```
/* login screen */

.default {
    composes: default from "./button.css";
    border-color: orange;
}

.selected {
    composes: selected from "./button.css";
    border-color: orange;
}

.disabled {
    composes: disabled from "./button.css";
    opacity: 0.5;
    }

```

Then in your component

```
import React, { Component, PropTypes } from 'react';
import defaultStyles from './button.css';
import loginStyles from './loginButton.css';

const themes = {
    default: defaultStyles,
    login: loginStyles
}

...

    render() {

        const styles = (this.props.theme) ? themes[this.props.theme] : themes.default;

        let buttonClass = styles.default;

        if(this.props.selected) buttonClass = styles.selected;
        if(this.props.disabled) buttonClass = styles.disabled;

        return(
            <button className={ buttonClass } />
        );
    }

...

```