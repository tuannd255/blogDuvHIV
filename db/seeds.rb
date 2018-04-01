user = User.create email: "duchv2307@gmail.com", password: "123123", password_confirmation: "123123"

post1 = Post.create author_id: user.id, title: "Nested comments rails",
content: "Bình luận là ở khắp mọi nơi. Blog, mạng xã hội, các trang web fan hâm mộ, các nguồn tài nguyên học tập - tất cả đều có một số loại của một hệ thống nhận xét. Thường thì chúng tôi muốn trình bày tùy chọn người dùng của chúng tôi để cả hai để lại nhận xét và trả lời là tốt. Cách tự nhiên nhất để đại diện trả lời là để lồng ghép (giống như Russian doll).

Bài viết dưới đây sẽ cho bạn thấy làm thế nào để thực hiện bình luận lồng nhau trong một ứng dụng Ruby on Rails với sự giúp đỡ của gem closure_tree. Bên cạnh đó, bài viết cũng sẽ cung cấp thêm một số tính năng của gem cung cấp."


post2 = Post.create author_id: user.id, title: "Nested comments rails test 2",
content: "Bình luận là ở khắp mọi nơi. Blog, mạng xã hội, các trang web fan hâm mộ, các nguồn tài nguyên học tập - tất cả đều có một số loại của một hệ thống nhận xét. Thường thì chúng tôi muốn trình bày tùy chọn người dùng của chúng tôi để cả hai để lại nhận xét và trả lời là tốt. Cách tự nhiên nhất để đại diện trả lời là để lồng ghép (giống như Russian doll).

Bài viết dưới đây sẽ cho bạn thấy làm thế nào để thực hiện bình luận lồng nhau trong một ứng dụng Ruby on Rails với sự giúp đỡ của gem closure_tree. Bên cạnh đó, bài viết cũng sẽ cung cấp thêm một số tính năng của gem cung cấp."
