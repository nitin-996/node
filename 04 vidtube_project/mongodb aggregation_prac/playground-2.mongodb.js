// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("vidtube");

// Find a document in a collection.
db.getCollection("users").aggregate([
  { $unwind: "$tags" },
  {
    $group: {
      _id: "$_id",
      tag_count_per_user: {
        $count: {},
      },
    },
  },
]);

db.getCollection("users").aggregate([
  {
    $addFields: {
      numberofTags: {
        // You're using $ifNull to check if the field $tags is null or missing.
        // If $tags exists and is not null, it will be passed to $size.
        // If $tags is null or doesn't exist, it will use an empty array [] instead.

        $size: { $ifNull: ["$tags", []] },
      },
    },
  },
  {
    $group: {
      _id: null,
      average: {
        $avg: "$numberofTags",
      },
    },
  },
]);

db.getCollection("users").aggregate([
  {
    $match: {
      isActive: false,
    },
  },
  { $unwind: "$tags" },
  {
    $match: {
      tags: "enim",
    },
  },{
    $group: {
      _id: ["$_id","$name","$age"],
     
    }
  }
]);

// category users with their favourite fruites.
db.getCollection('users').aggregate([
    {
        $group: {
          _id: "$favoriteFruit",  // this groups by favoritefruit
          filter_user: {

            // still we do have access of other properties of document so we pushed names
            $push : "$name"
          }
        }
    }
])