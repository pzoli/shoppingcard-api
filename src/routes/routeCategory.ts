import { Router } from "express";
import Category from "../../../shoppingcard-models/src/models/Category";
import { Condition, ObjectId, UpdateWriteOpResult } from "mongoose";
import Joi from "joi";
const router = Router();

router.get("/", async (req, res) => {
    if (req.query.first && req.query.rowcount) {
        let result = await Category.Category.find({}).skip(parseInt(req.query.first as string)).limit(parseInt(req.query.rowcount as string));
        res.send(result);
    } else {
        let result = await Category.Category.find({});
        res.send(result);
    }
});

router.get("/count", async (req, res) => {
    let result = await Category.Category.find({});
    res.send({ count: result.length });
});

router.get("/:id", async (req, res) => {
    let result = await Category.Category.find({ _id: req.params.id });
    res.send(result);
});

router.delete("/:id", async (req, res) => {
    let result = await Category.Category.deleteOne({ _id: req.params.id });
    res.send(result);
});

router.put("/:id", async (req, res) => {
    let valid: Joi.ValidationResult = Category.validate(req.body);
    if (!valid.error) {
        const filter: Condition<ObjectId> = { _id: req.params.id };
        const updateDoc = {
            $set: req.body
        };
        Category.Category.updateOne(filter, updateDoc).then((result) =>
            res.send(result)
        ).catch((err) =>
            res.status(400).send({ message: err })
        );
    } else {
        res.status(400).send({ message: valid.error });
    }
});

router.post("/", async (req, res) => {
    let valid: Joi.ValidationResult = Category.validate(req.body);
    if (!valid.error) {
        let category = new Category.Category(req.body);
        category.save().then(() =>
            res.send(category)
        ).catch((err) =>
            res.status(400).send({ message: err })
        );
    } else {
        res.status(400).send({ message: valid.error });
    }
});

export default router;
