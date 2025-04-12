class TradeLog < ApplicationRecord
  belongs_to :user

  validates :profit_loss, presence: true
end
