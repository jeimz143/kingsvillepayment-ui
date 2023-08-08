'use strict'

const models = require('../../models')

const Level = models.Level

Level.deleteMany([])

var levels = [
  new Level({
    code: 'KG0000',
    name: 'Kindergarten',
    description: 'Elementary School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0001',
    name: 'Grade 1',
    description: 'Elementary School',
    unitPrice: 12000
  }),
  new Level({
    code: 'GRLVL0002',
    name: 'Grade 2',
    description: 'Elementary School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0003',
    name: 'Grade 3',
    description: 'Elementary School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0004',
    name: 'Grade 4',
    description: 'Elementary School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0005',
    name: 'Grade 5',
    description: 'Elementary School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0006',
    name: 'Grade 6',
    description: 'Elementary School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0007',
    name: 'Grade 7',
    description: 'Junior High School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0008',
    name: 'Grade 8',
    description: 'Junior High School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0009',
    name: 'Grade 9',
    description: 'Junior High School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0010',
    name: 'Grade 10',
    description: 'Junior High School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0011',
    name: 'Grade 11',
    description: 'Senior High School',
    unitPrice: 21338
  }),
  new Level({
    code: 'GRLVL0012',
    name: 'Grade 12',
    description: 'Senior High School',
    unitPrice: 21338
  })
]

module.exports = levels
