# React Mail Chips

A React component library for managing email input as chips.

- Easy to configure
- No dependency
- Simple to use

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [License](#license)

## Installation

Install the library using npm:

```sh
npm install react-mail-chips
```

Or using yarn:

```sh
yarn add react-mail-chips
```

## Usage

Here's a basic example of how to use the ReactMailChips component:

```tsx
import React, { useState } from "react";
import { ReactMailChips } from "react-mail-chips";

const App = () => {
  const [emails, setEmails] = useState<string[]>([]);

  return (
    <div>
      <ReactMailChips emails={emails} setEmails={setEmails} />
    </div>
  );
};

export default App;
```

## Props

| Property                | Type                        | Description                                     |
| ----------------------- | --------------------------- | ----------------------------------------------- |
| emails                  | `string[]`                  | An array of email strings.                      |
| setEmails               | `(emails:string[]) => void` | A function to update the emails array.          |
| className               | `string?`                   | Additional class names for the container.       |
| chipClassName           | `string?`                   | Additional class names for each chip.           |
| inputContainerClassName | `string?`                   | Additional class names for the input container. |

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)
