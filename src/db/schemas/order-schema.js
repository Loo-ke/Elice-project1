import { Schema } from "mongoose";

const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "수량은 최소 1개 이상이어야 합니다."],
      },
      price: {
        type: Number,
        required: true,
        min: [0, "가격은 0원 이상이어야 합니다."],
      },
    },
  ],

  // products: [
  //   {
  //     product: new Schema( {
  //       product: String,
  //       quantity:Number,
  //       price: Number
  //     })
  //      ,
       
  //   },
  // ],

  totalPrice: {
    type: Number,
    required: true,
    min: [0, "가격은 0원 이상이어야 합니다."],
  },
  address: {
    type: new Schema(
      {
        postalCode: String, //우편번호
        address1: String, //주소
        address2: String, //상세주소
      },
    ),
    required: true,
  },
  request: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    required: false,
    enum: [ "pending", "process", "completed", "cancel"],
    default: "pending",
  },
}, { timestamps: true });

export { OrderSchema }
