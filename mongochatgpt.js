const mongoose = require('mongoose');

// Create a schema for the blog post
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: {
    type: [String],
    validate: {
      validator: function (tags) {
        // Check if at least one tag contains the keyword "javascript"
        return tags.some(tag => tag.toLowerCase().includes('javascript'));
      },
      message: 'At least one tag must contain the keyword "javascript".',
    },
  },
});

// Create a model based on the schema
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// Example usage
const newBlogPost = new BlogPost({
  title: 'Using JavaScript in Node.js',
  content: 'This is a blog post about JavaScript in Node.js',
  tags: ['node.js', 'mongodb', 'express'], // Change the tags as needed
});

newBlogPost.save()
  .then(() => {
    console.log('Blog post saved successfully.');
  })
  .catch((error) => {
    console.error('Error saving blog post:', error.message);
  });
