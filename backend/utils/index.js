import mongoose from "mongoose";

const isValidObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "object ıd is not valid" });
  }
};
const findDocumentById = async (model, id, res) => {
  try {
    const document = await model.findById(id);
    if (!document) {
      res.status(404).json({ error: ` the ${model.modelName} does not exist` });
      return null;
    }
    return document;
  } catch (error) {
    console.error(`error while finding ${model.modelName}`);
    return res.status(500).json({ error: "internal server error" });
  }
};
const checkValidationErrors = (error, res) => {
  const validationErrors = {};
  for (let field in error.errors) {
    validationErrors[field] = error.errors[field].message;
  }
  return res.status(400).json({ error: "Validation error", validationErrors });
};
export { isValidObjectId, findDocumentById, checkValidationErrors };
