class CreateTradeLogs < ActiveRecord::Migration[8.0]
  def change
    create_table :trade_logs do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :profit_loss, null:false

      t.timestamps
    end
  end
end
