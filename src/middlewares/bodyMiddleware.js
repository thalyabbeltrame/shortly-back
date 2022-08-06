const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).json({
      error: error.details.map(({ message }) => message),
    });
  }
  return next();
};

export { validateBody };
