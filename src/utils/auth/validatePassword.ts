function validatePassword(password: string) {
  const responseObj = {
    ok: true,
    errorMsg: "",
  };

  if (password.length < 8 || password.length > 16) {
    responseObj.ok = false;
    responseObj.errorMsg = "Password must contain between 8 and 16 characters";
    return responseObj;
  }

  if (!/\d/.test(password)) {
    responseObj.ok = false;
    responseObj.errorMsg = "Password must contain at least one number";
    return responseObj;
  }

  if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
    responseObj.ok = false;
    responseObj.errorMsg =
      "Password must contain at least one special character";
    return responseObj;
  }

  return responseObj;
}

export default validatePassword;
