const {
  isLabelWithInternallyDisabledControl,
} = require("@testing-library/user-event/dist/utils");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoURI =
  "mongodb+srv://Foodapp23:Patowary4323@cluster0.zlqfgvh.mongodb.net/food?retryWrites=true&w=majority";
const mdb = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("...", err);
      else {
        console.log("connected ");
        const fetch_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetch_data.find({}).toArray(async function (err, data) {
          const food_category = await mongoose.connection.db.collection(
            "food_category"
          );
          food_category.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.food_category = catData;
            }
          });
        });
      }
    }
  );
};
module.exports = mdb;
