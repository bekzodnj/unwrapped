const mongoose = require('mongoose');

const { Schema } = mongoose;

const rewardSchema = new Schema(
  {},
  {
    collection: 'Reward',
  }
);

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;
