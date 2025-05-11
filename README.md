# React Mail Chips

A lightweight, customizable React component for managing email input as chips with keyboard navigation and email validation.

## Features

- 🎯 Email validation with duplicate checking
- ⌨️ Keyboard navigation and paste support
- 📦 Zero dependencies, TypeScript ready

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Demo

Try the interactive demo here: [https://react-mail-chips-js.vercel.app](https://react-mail-chips-js.vercel.app/)

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
      <ReactMailChips 
        emails={emails} 
        setEmails={setEmails}
        placeholder="Enter email addresses..."
      />
    </div>
  );
};

export default App;
```

## Examples

### With Email Suggestions

```tsx
import React, { useState } from "react";
import { ReactMailChips } from "react-mail-chips";

const App = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const suggestedEmails = [
    "john@example.com",
    "jane@example.com",
    "bob@example.com"
  ];

  return (
    <div>
      <ReactMailChips 
        emails={emails} 
        setEmails={setEmails}
        recommendedEmails={suggestedEmails}
        placeholder="Type to see suggestions..."
      />
    </div>
  );
};
```

### With Custom Styling

```tsx
import React, { useState } from "react";
import { ReactMailChips } from "react-mail-chips";
import "./styles.css";

const App = () => {
  const [emails, setEmails] = useState<string[]>([]);

  return (
    <div>
      <ReactMailChips 
        emails={emails} 
        setEmails={setEmails}
        className="custom-container"
        chipClassName="custom-chip"
        inputContainerClassName="custom-input"
      />
    </div>
  );
};
```

## Props

| Property                | Type                        | Description                                            | Default             |
| ----------------------- | --------------------------- | ------------------------------------------------------ | ------------------- |
| emails                  | `string[]`                  | An array of email strings.                             | Required            |
| setEmails               | `(emails:string[]) => void` | A function to update the emails array.                 | Required            |
| className               | `string?`                   | Additional class names for the container.              | `""`                |
| chipClassName           | `string?`                   | Additional class names for each chip.                  | `""`                |
| inputContainerClassName | `string?`                   | Additional class names for the input container.        | `""`                |
| placeholder             | `string?`                   | Placeholder text for the input field.                  | `""`                |
| delimiters              | `string[]?`                 | An array of delimiters to separate emails.             | `["Enter",",",";"]` |
| recommendedEmails       | `string[]?`                 | An array of email suggestions to display while typing. | `[]`                |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](https://github.com/koalalikecode/react-mail-chips/blob/main/LICENSE)
