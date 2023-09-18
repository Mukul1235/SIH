const { Confession } = require("../model/confession");

module.exports.confession = async (req, res) => {
  const confession = Confession({
    text: req.body.text,
    confession_no: req.body.confession_no,
    genre: req.body.genre,
    emojis: req.body.emojis,
    confessedOn:req.body.confessedOn,
  });
  await confession.save();
  return res.send(true);
};

module.exports.confessionList = async (req, res) => {
  Confession.find((err, value) => {
    if (err) {
      console.log(err);
    } else {
      res.json(value);
    }
  });
};

module.exports.updateEmojis = async (req, res) => {
  const confession_no = req.body.confess_id;
  // const emojis_no = req.body.emojis_id;
  const totalrec = req.body.totalrec;
  const user = await Confession.findOneAndUpdate(
    { confession_no: confession_no },
    { emojis: totalrec }
  );
  return res.status(200).json(user);
};
