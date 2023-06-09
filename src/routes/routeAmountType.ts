import { Router } from "express";
import amountTypeSchema from "../../../shoppingcard-models/src/models/AmountType";
import { Condition, ObjectId, UpdateWriteOpResult, model } from "mongoose";
import Joi from "joi";
const router = Router();

const AmountType = model("amounttype", amountTypeSchema.amountTypeSchema);

router.get("/", async (req, res) => {
    if (req.query.first && req.query.rowcount) {
        let result = await AmountType.find({}).skip(parseInt(req.query.first as string)).limit(parseInt(req.query.rowcount as string));
        res.send(result);
    } else {
        let result = await AmountType.find({});
        res.send(result);
    }
});

router.get("/count", async (req, res) => {
    let result = await AmountType.find({});
    res.send({ count: result.length });
});

router.get("/:id", async (req, res) => {
    let result = await AmountType.find({ _id: req.params.id });
    res.send(result);
});

router.delete("/:id", async (req, res) => {
    let result = await AmountType.deleteOne({ _id: req.params.id });
    res.send(result);
});

router.put("/:id", async (req, res) => {
    let valid: Joi.ValidationResult = amountTypeSchema.validate(req.body);
    if (!valid.error) {
        const filter: Condition<ObjectId> = { _id: req.params.id };
        const updateDoc = {
            $set: req.body
        };
        AmountType.updateOne(filter, updateDoc).then((result) =>
            res.send(result)
        ).catch((err) =>
            res.status(400).send({ message: err })
        );
    } else {
        res.status(400).send({ message: valid.error });
    }
});

router.post("/", async (req, res) => {
    let valid: Joi.ValidationResult = amountTypeSchema.validate(req.body);
    if (!valid.error) {
        let amountType = new AmountType(req.body);
        amountType.save().then(() =>
            res.send(amountType)
        ).catch((err) =>
            res.status(400).send({ message: err })
        );
    } else {
        res.status(400).send({ message: valid.error });
    }
});

export default router;
