const fs = require("fs");
const path = require("path");
const router = require("koa-router")();

const isArray = Array.isArray;

function storage(file) {
  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(
    path.join(__dirname, "../public/upload/", file.name)
  );
  reader.pipe(writer);
  return "/upload/" + file.name;
}

router.post("/api/file", async (ctx, next) => {
  try {
    let files = ctx.request.files.file;
    let path;

    if (isArray(files)) {
      path = [];
      for (const file of files) {
        path.push(storage(file));
      }
    } else {
      path = storage(files);
    }

    ctx.body = {
      code: 1,
      data: path,
      message: "success"
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      code: 0,
      data: {},
      message: `error [${err}]`
    };
  }
});

module.exports = router;
