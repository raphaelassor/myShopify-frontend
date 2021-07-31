const customer = {
    fName: String,
    lName: String,
    email: String,
    phone: String,
    orderIds: [
        String
    ],
    createdAt: Number | null,
    addresses: [
        //Billing or Shipping 
        {
            fName: String,
            lName: String,
            address1: String,
            address2: String,
            zip: Number,
            city: String,
            state: String,
            country: String
        }
    ]

}