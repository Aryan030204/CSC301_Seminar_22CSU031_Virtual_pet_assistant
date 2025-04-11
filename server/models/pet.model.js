const mongoose = require("mongoose");

const dogBreeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Poodle",
  "Bulldog",
  "Beagle"
];

const catBreeds = [
  "Persian",
  "Maine Coon",
  "Siamese",
  "Bengal",
  "Ragdoll",
  "Sphynx"
];

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["dog", "cat"],
    },
    breed: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.type === "dog") {
            return dogBreeds.includes(value);
          } else if (this.type === "cat") {
            return catBreeds.includes(value);
          }
          return false;
        },
        message: (props) =>
          `${props.value} is not a valid breed for ${props.instance.type}`,
      },
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    color: {
        type: String,
        enum: ["black", "white", "brown", "red", "yellow", "other"],
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
