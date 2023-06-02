import { Router } from "express";
import Item from "../models/Item";
import { Condition, ObjectId, UpdateWriteOpResult } from "mongoose";
import Joi from "joi";
const router = Router();

router.get("/", async (req, res) => {
    if (req.query.first && req.query.rowcount) {
        let result = await Item.Item.find({}).skip(parseInt(req.query.first as string)).limit(parseInt(req.query.rowcount as string)).populate("amounttype_id").populate("category_id");
        res.send(result);
    } else {
        let result = await Item.Item.find({}).populate("amounttype_id").populate("category_id");
        res.send(result);
    }
});

router.get("/count", async (req, res) => {
    let result = await Item.Item.find({});
    res.send({ count: result.length });
});

router.get("/:id", async (req, res) => {
    let result = await Item.Item.find({ _id: req.params.id });
    res.send(result);
});

router.delete("/:id", async (req, res) => {
    let result = await Item.Item.deleteOne({ _id: req.params.id });
    res.send(result);
});

router.put("/:id", async (req, res) => {
    let valid: Joi.ValidationResult = Item.validate(req.body);
    if (!valid.error) {
        const filter: Condition<ObjectId> = { _id: req.params.id };
        const updateDoc = {
            $set: req.body
        };
        Item.Item.updateOne(filter, updateDoc).then((result) =>
            res.send(result)
        ).catch((err) =>
            res.status(400).send({ message: err })
        );
    } else {
        res.status(400).send({ message: valid.error });
    }
});

router.post("/", async (req, res) => {
    let valid: Joi.ValidationResult = Item.validate(req.body);
    if (!valid.error) {
        let item = new Item.Item(req.body);
        item.save().then(() =>
            res.send(item)
        ).catch((err) =>
            res.status(400).send({ message: err })
        );
    } else {
        res.status(400).send({ message: valid.error });
    }
});

export default router;
