const order={
    customerId:String,
    customerNote:String,
     orderNum:Number,
    _id:String,
    createdAt:Date,
    total:Number,
    products:[ // mini product
    {
    _id:String,
    imgUrl:String,
    title:String,
    sku:String,
    qty:Number,
    price:Number
    }
    ],
     tracking:String|null,
     isRefund:Boolean,
     isArchived:Boolean,
     tags:[String],
     shippingAddress:{
        fName: String,
            lName: String,
            address1: String,
            address2: String,
            zip: Number,
            city: String,
            state: String,
            country: String
     },
     billingAddress:{
        fName: String,
        lName: String,
        address1: String,
        address2: String,
        zip: Number,
        city: String,
        state: String,
        country: String
     }

}