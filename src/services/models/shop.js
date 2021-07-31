const shop = {
    _id: String,
    domains: [],
    title:String,
    productTypes: [String],
    vendors: [String],
    suppliers: [{
        id: String,
        name: String,
    }],
    productTagsMap: {['tagName']:String},
}