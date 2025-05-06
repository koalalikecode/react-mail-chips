import { useEffect, useState } from "react";
import { ReactMailChips } from "react-mail-chips";
import "./App.css";

const App = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <div className="demo-bg">
      <div className="demo-container">
        <button
          className="demo-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === "light" ? (
            <>
              <span role="img" aria-label="moon">🌙</span> Dark
            </>
          ) : (
            <>
              <span role="img" aria-label="sun">☀️</span> Light
            </>
          )}
        </button>
        <h2 className="demo-title">React Mail Chips</h2>
        <div className="demo-mailchips-wrapper">
          <ReactMailChips
            emails={emails}
            setEmails={setEmails}
            placeholder="Enter email"
            recommendedEmails={[
              "johndoe@example.com",
              "janedoe@example.com",
              "test@example.com",
            ]}
            inputContainerClassName={theme === "dark" ? "mailchips-input-dark" : ""}
          />
        </div>
        <div className="demo-emails">
          <b>Emails:</b> {emails.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default App;
