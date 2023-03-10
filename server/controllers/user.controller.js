const user = require('../models/user.model');
const argon2 = require('argon2');
// const playlists = require('../models/playList.model')

module.exports = {

  //UPDATE
  update: async (req, res) => {
    const { _id } = req.user;
    const {password, displayName} = req.body;
    if(!req.body.password){
      delete req.body.password;
    }
    // if (req.body.userId === _id) {
      if(password===""){
        const updateUser = await user.findByIdAndUpdate(
          _id,
          { 
            // password: hashedPass,
            displayName
          },
          { new: true }
        );
        res.status(200).json({
          success: 'true',
          message: 'Cap nhat thanh cong!',
          updateUser,
        });
      } else{
        try {
          const hashedPass = await argon2.hash(password);
          const updateUser = await user.findByIdAndUpdate(
            _id,
            { 
              password: hashedPass,
              displayName
            },
            { new: true }
          );
  
          res.status(200).json({
            success: 'true',
            message: 'Cap nhat thanh cong!',
            updateUser,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Loi Server!' });
        }
      }
    // } else {
    //   res
    //     .status(400)
    //     .json({
    //       success: false,
    //       message: 'Chi update duoc Tai khoan cua ban!',
    //     });
    // }
  },

  //GET USER
  getById: async (req, res) => {
    const {id} = req.params;

    try {
      const User = await user.findById(id);
      const {password, ...others} = User._doc;
      res.status(200).json(others)
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
    
  },
  // GET ME
  getMe: async(req, res) => {
    const {_id} = req.user;
    try{
      const User = await user.findById(_id);
      if(User){
        res.status(200).json({success: true, User})
      } else {
        res
        .status(404)
        .json({ success: false, message: 'User khong ton tai!' });
      }
    }catch (error) {
      // console.log(error);
      res.status(500).json(error)
    }
  },
  getImages: async(req,res)=>{
    const {_id} = req.user;
    try{
      const User = await user.findById(_id);
      if(User){
        res.status(200).json({success: true, images: User.images})
      }
      else{
        res
        .status(404)
        .json({ success: false, message: 'User khong ton tai!' });
      }

    }catch(error){
      console.log(error);
      res.status(500).json(error)
    }
  },
  addImage: async(req,res)=>{
    const {_id} = req.user;
    const {image} = req.body;
    try{
      const user = await user.findById(_id);
      if(user){
        user.images.push(image);
        await user.save();
        res.status(200).json({success: true, image: image})
      }else{
        res
        .status(404)
        .json({ success: false, message: 'User khong ton tai!' });
      }

    }catch(error){
      res.status(200).json(error)
    }
  },

  // get username
  getUsername: async (req, res) =>{
    
    try {  
      const {username} = req.params;
      const name = await user.find({username})
      res.status(200).json(name)
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
