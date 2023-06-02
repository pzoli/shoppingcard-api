import { Schema, model, Types } from "mongoose";
import Joi from "joi";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    amounttype_id: {
        type: Types.ObjectId,
        required: true,
        ref: "amounttype",
    },
    category_id: {
        type: Types.ObjectId,
        required: true,
        ref: "category",
    },
});

const Item = model("item", itemSchema);

const validate = (item: object): Joi.ValidationResult => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        amounttype_id: Joi.string().required(),
        category_id: Joi.string().required(),
    });
    return schema.validate(item);
}

export default { Item, validate };
