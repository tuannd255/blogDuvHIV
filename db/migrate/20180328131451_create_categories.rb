class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
    	t.integer :user_id
      t.string :image_category
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
