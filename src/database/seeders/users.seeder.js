const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models')
const Role = Model.Role
const User = Model.User
const Branch = Model.Branch

const data = []
data.push({
  lastName: 'Medina',
  givenName: 'Jeimson',
  middleName: 'Dela Cruz',
  role: 'Administrator',
  email: 'admin@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
})

data.push({
  lastName: 'Angeles',
  givenName: 'Mark Lester',
  middleName: 'Dizon',
  role: 'SchoolHead',
  email: 'mark.lester@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
})

data.push({
  lastName: 'Pablo',
  givenName: 'Don',
  middleName: '',
  role: 'Registrar',
  email: 'pablo.don@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
})

data.push({
  branch: 'KVB0001',
  lastName: 'Villarica',
  givenName: 'Vanessa',
  middleName: 'Dolor',
  role: 'Cashier',
  email: 'cashier@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
})

class UserSeeder extends Seeder {
  async beforeRun () {
    const branches = await Branch.find({}).exec()
    const roles = await Role.find({}).exec()
    this.postData = this._generateData(roles, branches)
  }

  async shouldRun () {
    return User.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return User.create(this.postData)
  }

  _generateData (roles, branches) {
    var res = []
    data.forEach(async (user) => {
      var role = roles.find(r => r.name === user.role)
      user.role = role._id
      res.push(user)
    })

    return res
  }
}

module.exports = UserSeeder
