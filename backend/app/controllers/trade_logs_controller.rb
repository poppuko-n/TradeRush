class TradeLogsController < ApplicationController
  before_action :authenticate_user, {only: [:create]}

  def create
    profit = params[:profitLoss]
    TradeLogs.create!(
      user: @current_user,
      profit_loss: profit
    )

    render json:{ message: "トレードログを保存しました。", profit_loss: profit}, status: :created
  end
end
