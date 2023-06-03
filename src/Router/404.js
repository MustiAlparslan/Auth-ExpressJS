import express from 'express';

const router  = express.Router()


router.use((req, res, next) => {
    res.status(404).send({ code: 404, message: "Not Found !" });
})



export default router