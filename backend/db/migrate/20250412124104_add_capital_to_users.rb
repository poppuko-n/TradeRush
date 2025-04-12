class AddCapitalToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :capital, :integer
  end
end
