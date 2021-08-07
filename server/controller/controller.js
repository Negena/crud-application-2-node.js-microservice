let userdb  = require('../model/model.js');

exports.create = (req,res) => {
  if(!req.body){
    res.status(400).status({message: "Cannot be empty"});
    return;
  }
  //new user
  const user = new userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  });
  //save user
  user
  .save(user)
  .then(data => {
    res.redirect("/add-user")
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "some error occured"
    });
  });
};

exports.find = (req,res) => {

  if (req.query.id){
    const id = req.query.id;
    userdb.findById(id)
    .then(data => {
      if (!data){
        res.status(404).send({message: "not found", id});
      }else {
        res.send(data)
      }
    }).catch(err => {
      res.status(500).send({message: "error in finding"});
    })
  }else{
  userdb.find()
  .then(user=> {
    res.send(user)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "error with retriving data"
  });
 });
};
}

exports.update = (req,res) => {
  if (!req.body){
    return res.status(400).send({message: "cannot be updated"})
  }
  const id = req.params.id;
  userdb.findByIdAndUpdate(id, req.body,{ useFindAndModify: false})
  .then(data => {
    if (!data){
      res.status(400).send({message:`cannot update the use with id ${id}, maybe ot found`});
    }else {
      res.send(data);
    };
  })
  .catch(err=> {
    res.status(500).send({message: "error updating the information"});
  });
};

exports.delete = (req,res) => {
const id = req.params.id;
  userdb.findByIdAndDelete(id)
  .then(data => {
    if (!data){
      res.status(404).send({message: `cannot update the use with id ${id}, maybe ot found`});
    }else{
      res.send({
        message: "user was deleted successfully"
      });
    }
  })
  .catch(err => {
    res.status(500).send({message: "couldn't delete"+id})
  });
};
