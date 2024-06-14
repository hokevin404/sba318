// The "reviews" data will include information about
// ratings from the user's customers.

const reviews = [
    {
        id: 1,
        toUserID: 1,
        fromUserID: 2,
        rating: 4,
        review: "Fast shipper. Great communication."
    },
    {
        id: 2,
        toUserID: 2,
        fromUserID: 1,
        rating: 5,
        review: "Fast shipper. Packaging was great with a lot of protection."
    },
    {
        id: 3,
        toUserID: 2,
        fromUserID: 3,
        rating: 4,
        review: "Cute packaging, could have been better as small damage to item."
    },
    {
        id: 4,
        toUserID: 1,
        fromUserID: 3,
        rating: 5,
        review: "Photo cards came as descriped in great condition and was very communicative."
    }
];

module.exports = reviews;