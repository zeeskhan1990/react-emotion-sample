# Emotion has two ways of functioning - 

## 1 - General Use

### `import { css, insertGlobal, keyframes, cx } from 'emotion'`

_css_ is used as the function that takes in a style rule, and returns the "className" that is to be used in the place of "class names"

_injectGlobal_ function takes in the global styles and injects those into the global scope

_keyframes_ work like css animation keyframes

_cx_ is emotion’s version of the popular classnames library. The key advantage of _cx_ is that it detects emotion generated class names ensuring styles are overwritten in the correct order. 

```jsx
import { css } from 'emotion'

const color = 'darkgreen'

render(
  <div
    className={css({
      backgroundColor: 'hotpink',
      '&:hover': {
        color
      }
    })}
  >
    This has a hotpink background.
  </div>
)

```

## 2 - To be used mostly with react

### `import {jsx, css} from '@emotion/core'`

```jsx
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const color = 'white'

render(
  <div
    css={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
```
_@jsx jsx_ - This is a babel specific thing and only understandable by it. The _@jsx_, referred to as the "jsx pragma", is meant to specify what is to be used in place of _React.createElement_ as the function to which all the jsx in the documents are to be converted to. Here it is specifying that a function by name `jsx` is to be used in place of _React.createElement_

_jsx_ imported is the function "jsx" which is to be used by Babel for conversion of all jsx elements

|           |             **Input**               |                 **Output**                        |
|-----------|----------------------------|---------------------------------------------------|
| Before    | \<img src="avatar.png" /\> | React.createElement('img', { src: 'avatar.png' }) |
| After     | \<img src="avatar.png" /\> | jsx('img', { src: 'avatar.png' })                 |

_css_ imported is the function which converts a set of style rules to be consumed by the **css prop**. The definition of what a `css` prop is supposed to do is mentioned in the _jsx_ function and thus _css_, and _jsx_ are to be used in conjunction.

In cases where the babel config can be directly accessed, there one can use the babel preset `@emotion/babel-preset-css-prop` instead of the Jsx pragma.

_css from @emotion/core_ **does not** return the computed class name string. The function returns an object containing the computed name and flattened styles. The returned object is understood by emotion at a low level and can be composed with other emotion based styles inside of the _css prop_, other css calls, or the styled API.

-   Class names containing emotion styles from the `className` prop
    override `css` prop styles.

-   Class names from sources other than emotion are ignored and appended to the
    computed emotion class name.

### `import styled from '@emotion/styled'`

_styled_ is a way to create components that have styles attached to them

```jsx
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`

render(<Button>This is a hotpink button.</Button>)
```

### Optimizations
Emotion has an optional Babel plugin that optimizes styles by compressing and hoisting them and creates a better developer experience with source maps and labels. This has to be defined in the `.babelrc`
```json
{
  "plugins": ["emotion"]
}
```

In cases of apps created through where one cannot manually edit the babel config, they can use babel macros. Babel macros is a way of defining config in the source files itself to which the babel conversions should apply. Most of Emotion’s Babel Macros are available by adding /macro to the end of the import you’d normally use. For example, to use the macro for styled, use _@emotion/styled/macro_. The one exception to this is _@emotion/core_, _@emotion/core_ doesn’t have a Babel Macro because Babel Macros doesn’t support macros for custom JSX pragmas. There is a Babel macro available for css from @emotion/core if you import it from _@emotion/css/macro_ though.

```javascript
import styled from '@emotion/styled/macro'
import css from '@emotion/css/macro'
//Macros for non-react emotion
import { css, keyframes, injectGlobal } from 'emotion/macro'
```

### Theming
Theming is provided by the library emotion-theming. Add _ThemeProvider_ to the top level of your app and access the theme with `props.theme` **1) in a styled component or 2) provide a function that accepts the theme as the css prop**

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'

const theme = {
  colors: {
    primary: 'hotpink'
  }
}

const SomeText = styled.div`
  color: ${props => props.theme.colors.primary};
`

render(
  <ThemeProvider theme={theme}>
    <SomeText>some text</SomeText>
    <div css={theme => ({ color: theme.colors.primary })}>
      some other text
    </div>
  </ThemeProvider>
)
```
