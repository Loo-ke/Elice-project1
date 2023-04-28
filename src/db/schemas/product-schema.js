import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    product: {
      // 상품명
      type: String,
      required: true,
    },
    price: {
      // 가격
      type: Number,
      required: true,
    },
    sellerId: {
      // 판매자 아이디
      type: Schema.Types.ObjectId,
      // type:String,
      ref: "users",
      required: true,
    },
    category: {
      // 카테고리
      type: Schema.Types.ObjectId,
      // type:String,
      ref: "categories",
      required: true,
    },
    nation:{
      type: Schema.Types.ObjectId,
      // type:String,
      required:true,
      ref:"nations",
    },
    detailDescription: {
      // 상세 설명
      type: String,
      required: true,
    },
    imgUrl: {
      // 이미지
      type: String,
      required: true,
    },
    inventory: {
      // 재고량
      type: Number,
      min: 0,
      default: 10,
      required: true,
    },
    
  },
  {
    collection: "product",
    timestamps: true,
  }
);
async function getProductById(id) {
  const product = await Product.findById(id).populate("sellerId");
  return product;
}

export { ProductSchema, getProductById };
