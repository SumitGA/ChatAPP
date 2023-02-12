exports.login = async(req, res) => {
  const {email, password} = req.body
  return res.send([email, password])

}

exports.register = async(req, res) => {

}