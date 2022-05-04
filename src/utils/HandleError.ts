export function setErrorForm(err: any) {
  const validationErrors: any = {};

  err.inner.forEach((error: any) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
