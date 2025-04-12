class TradeLogsController < ApplicationController
  before_action :authenticate_user, {only: [:create]}

  def create
    profit = params[:profitLoss].to_f
    TradeLog.create!(
      user: @current_user,
      profit_loss: profit
    )
    @current_user.update_columns(
      capital: (@current_user.capital + profit).to_i
    )

    render json:{ message: "トレードログと資産を更新しました。"}, status: :created
  end
end
