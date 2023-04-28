import { Schema } from "mongoose";

const OrderSchema = new Schema({
  userId: {
    //type: Schema.Types.ObjectId,
    type:String,
    ref: "users",
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
    },
  ],
  summaryTitle: {
    type: String,
  },//브랜드, 색상 등 주문요약정보
  totalPrice: {
    type: Number,
    required: true,
    min: [0, "가격은 0원 이상이어야 합니다."],
  },
  address: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "process", "completed", "cancel"],
    default: "pending",
  },
}, { timestamps: true });

export {OrderSchema}
