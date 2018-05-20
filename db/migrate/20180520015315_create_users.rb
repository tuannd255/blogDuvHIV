class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :auth_token
      t.string :name
      t.date :birth_day
      t.integer :gender

      t.timestamps
    end
  end
end
