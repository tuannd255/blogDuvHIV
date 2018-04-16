class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.integer :author_id
      t.integer :category_id
      t.string :image_post
      t.text :title
      t.text :content
      t.integer :status
      t.integer :type_post, default: 0

      t.timestamps
    end
  end
end
