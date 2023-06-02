import { Schema, model, Types } from "mongoose";
import Joi from "joi";

const amountTypeSchema = new Schema({ 
            name: {
                type: String,
                required:true,
            },
});

const AmountType = model("amounttype", amountTypeSchema);

const validate = (amounttype: object): Joi.ValidationResult => {
    const schema = Joi.object().keys({ 
        name: Joi.string().required(),
    });
    return schema.validate(amounttype);
}

export default { AmountType, validate };