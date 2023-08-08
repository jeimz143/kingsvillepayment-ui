
console.log('Seeding')

var seeders = [
  // {
  //   name: 'LevelCollectionSeeder',
  //   source: require('./LevelCollectionSeeder')
  // },
  // {
  //   name: 'FeeCollectionSeeder',
  //   source: require('./FeeCollectionSeeder')
  // },
  // {
  //   name: 'StudentCollectionSeeder',
  //   source: require('./StudentCollectionSeeder')
  // },
  // {
  //   name: 'SchoolYearCollectionSeeder',
  //   source: require('./SchoolYearCollectionSeeder')
  // },
  // {
  //   name: 'EnrollmentCollectionSeeder',
  //   source: require('./EnrollmentCollectionSeeder')
  // },
  // {
  //   name: 'EnrollmentFeeCollectionSeeder',
  //   source: require('./EnrollmentFeeCollectionSeeder')
  // },
  // {
  //   name: 'PaymentCollectionSeeder',
  //   source: require('./PaymentCollectionSeeder')
  // },
  // {
  //   name: 'ReceiptCollectionSeeder',
  //   source: require('./ReceiptCollectionSeeder')
  // },
  {
    name: 'PermissionCollectionSeeder',
    source: require('./PermissionCollectionSeeder')
  },
  {
    name: 'RoleCollectionSeeder',
    source: require('./RoleCollectionSeeder')
  },
  {
    name: 'UserCollectionSeeder',
    source: require('./UserCollectionSeeder')
  }
]

function loadSeeder (item, index) {
  setTimeout(async () => {
    console.log(item.name)
    await item.source.run()
    if (index === (seeders.length - 1)) {
      console.log('Done')
    }
  }, index * 1500)
}

seeders.forEach(async (seederItem, seederIndex) => {
  loadSeeder(seederItem, seederIndex)
})
