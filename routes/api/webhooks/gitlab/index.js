const express = require("express");
const router = express.Router();

const pipelineHook = require("./pipeline")

router.post("/", (req, res) => {
    if (req.body.object_kind === "pipeline") {
        pipelineHook(req, res);
        console.log(req.body)
    }
});


module.exports = router;