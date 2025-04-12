class User < ApplicationRecord
  has_secure_password

  has_many :trade_logs

  validates :name, presence: true, uniqueness: true
  validates :password, presence: true
  validates :capital, presence:true 
end
