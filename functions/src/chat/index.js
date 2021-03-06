const { respondWithResult } = require('../helpers/response');
const { getMessage } = require('../message/index');

// If id or not id
const getChat = (req, res) => {
  const { limit, dni } = req.query;
  // getMessage(limit, dni, respondWithResult(res, 200));
  getMessage(limit, dni, (sol) => {
    const list = [];
    const solution = sol.val();
    if (solution) {
      Object.keys(solution).forEach((id) => {
        const newObj = Object.assign({}, { id }, solution[id]);
        list.push(newObj);
      });
    }
    respondWithResult(res, 200)(list);
  });
};

module.exports = {
  getChat,
};

