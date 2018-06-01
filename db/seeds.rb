puts "delete data"
User.all.delete_all
Category.all.delete_all
Post.all.delete_all

puts "create user"
u = User.create name: "xoan", email: "xoan@gmail.com", password: "1"

puts "create category"
c = Category.create name: "IOS", description: "IOS và các kiến thức lập trình mobile"

puts "create Post"
30.times do |n|
  Post.create author_id: u.id, category: c, title: "Post title #{n + 1}",
    content: "Post content #{n + 1}", type_post: 0
end
