const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const checkEmailExist = (email: string, emails: string[]) => {
  return emails.includes(email);
};

export { validateEmail, checkEmailExist };
