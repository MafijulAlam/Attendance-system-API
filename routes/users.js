const {
  getUsers,
  getUserById,
  postUsers,
  deleteUserById,
  patchUserById,
  putUserById,
} = require('../controller/users');

const router = require('express').Router();
//find user by id
router.get('/:userId', getUserById);
//update user by id
router.patch('/:userId', patchUserById);
//update user by id
router.put('/:userId', putUserById);
//delete user by id
router.delete('/:userId', deleteUserById);
//find all users
router.get('/', getUsers);
// create users
router.post('/', postUsers);

module.exports = router;
