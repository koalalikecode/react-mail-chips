import { useState } from "react";
import { ReactMailChips } from "../index";

const ReactMailChipsClient = () => {
  const [emails, setEmails] = useState<string[]>([
    "johndoe@gmail.com",
    "janedoe@gmail.com",
  ]);
  return (
    <body style={{ width: "600px" }}>
      <ReactMailChips
        emails={emails}
        setEmails={setEmails}
        placeholder="Type some emails"
        delimiters={["Enter", " "]}
        recommendedEmails={[
          "test1@gmail.com",
          "test2@gmail.com",
          // "duynguyentrong123456789@cloudnutsales.co",
        ]}
      />
    </body>
  );
};

export default ReactMailChipsClient;
